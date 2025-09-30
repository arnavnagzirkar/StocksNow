# main.py
import os
from datetime import datetime

import numpy as np
import pandas as pd
import requests
import yfinance as yf
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv

from core.features import ta_features
from core.backtest import run_backtest

load_dotenv()

app = Flask(__name__, static_folder="static", template_folder="templates")
# Accept routes with or without trailing slashes (prevents 308 redirects)
app.url_map.strict_slashes = False

# ---------------- Sentiment (transformers -> VADER fallback) ----------------
USE_VADER = False
try:
    from transformers import pipeline
    sentiment_pipe = pipeline("sentiment-analysis")
except Exception:
    from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
    vader = SentimentIntensityAnalyzer()
    USE_VADER = True


def analyze_sentiment(headlines):
    results = []
    if not headlines:
        return results
    if not USE_VADER:
        for h in headlines:
            out = sentiment_pipe(h)[0]
            results.append(
                {
                    "headline": h,
                    "sentiment": out["label"],
                    "confidence": f"{out['score'] * 100:.2f}%",
                }
            )
    else:
        for h in headlines:
            s = vader.polarity_scores(h)
            comp = s["compound"]
            label = "POSITIVE" if comp >= 0.05 else ("NEGATIVE" if comp <= -0.05 else "NEUTRAL")
            results.append(
                {
                    "headline": h,
                    "sentiment": label,
                    "confidence": f"{abs(comp) * 100:.2f}%",
                }
            )
    return results


# ---------------- News API ----------------
NEWS_API_KEY = os.getenv("NEWS_API_KEY")


def fetch_news(ticker: str):
    if not NEWS_API_KEY:
        raise RuntimeError("Missing NEWS_API_KEY environment variable.")
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": ticker,
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": 5,
        "apiKey": NEWS_API_KEY,
    }
    r = requests.get(url, params=params, timeout=15)
    r.raise_for_status()
    data = r.json()
    articles = data.get("articles", [])
    return [a.get("title", "").strip() for a in articles if a.get("title")]


# ---------------- yfinance helpers ----------------
def normalize_close(df: pd.DataFrame, ticker: str) -> pd.Series:
    """
    Return a 1D Close-price Series with a DatetimeIndex,
    no MultiIndex columns, and tz-naive index.
    """
    if df is None or df.empty:
        return pd.Series(dtype="float64")

    # make index tz-naive
    if getattr(df.index, "tz", None) is not None:
        df = df.tz_convert(None)

    # collapse MultiIndex if present
    if isinstance(df.columns, pd.MultiIndex):
        # try selecting by ticker on any level
        for level in range(df.columns.nlevels):
            vals = df.columns.get_level_values(level)
            if ticker in vals:
                try:
                    df = df.xs(ticker, axis=1, level=level, drop_level=True)
                    break
                except Exception:
                    pass
        # if still multi, try first level 'Close'
        if isinstance(df.columns, pd.MultiIndex) and "Close" in df.columns.get_level_values(0):
            df = df.xs("Close", axis=1, level=0, drop_level=True).to_frame(name="Close")

    df = df.rename(columns=lambda c: str(c).title())

    close_col = "Close" if "Close" in df.columns else ("Adj Close" if "Adj Close" in df.columns else None)
    if close_col is None:
        return pd.Series(dtype="float64")

    s = pd.to_numeric(df[close_col], errors="coerce").dropna()
    s.index = pd.to_datetime(s.index).tz_localize(None)
    s.name = "Close"
    return s


def get_price_history(ticker: str, period: str = "2y") -> pd.DataFrame:
    """
    Returns a DataFrame with a single 'Close' column (normalized).
    """
    try:
        raw = yf.download(
            tickers=ticker,
            period=period,
            interval="1d",
            auto_adjust=True,
            progress=False,
            group_by="column",
            threads=False,
        )
    except Exception:
        raw = pd.DataFrame()

    s = normalize_close(raw, ticker)
    if s.empty:
        return pd.DataFrame()
    return pd.DataFrame({"Close": s})


def fetch_stock_price(ticker: str) -> str:
    px = get_price_history(ticker, period="5d")
    if px.empty:
        return "N/A"
    last = float(px["Close"].iloc[-1])
    return f"${round(last, 2)}"


# ---------------- Lightweight probability from momentum ----------------
def prob_up_from_momentum(features_df: pd.DataFrame) -> pd.Series:
    df = features_df.copy()
    mean = df["mom20"].rolling(252, min_periods=60).mean()
    std = df["mom20"].rolling(252, min_periods=60).std().replace(0, np.nan)
    z = (df["mom20"] - mean) / (std + 1e-12)
    prob = 1.0 / (1.0 + np.exp(-z.clip(-6, 6)))
    return prob.fillna(0.5)


# ===================== PAGES =====================
@app.route("/")
def landing():
    return render_template("home.html")


@app.route("/sentiment")
def sentiment_page():
    return render_template("sentiment.html")


@app.route("/predictor")
def predictor_page():
    return render_template("predictor.html")


@app.route("/backtest")
def backtest_page():
    return render_template("backtest.html")


# ===================== JSON APIs =====================
@app.route("/analyze", methods=["GET", "POST"])
def analyze():
    ticker = (request.args.get("ticker") if request.method == "GET" else request.form.get("ticker"))
    if not ticker:
        return jsonify({"error": "Please provide a stock ticker symbol!"}), 400
    ticker = ticker.upper().strip()
    try:
        headlines = fetch_news(ticker)
        sentiments = analyze_sentiment(headlines)
        stock_price = fetch_stock_price(ticker)
        payload = {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "stock_info": {"ticker": ticker, "current_price": stock_price},
            "sentiment_analysis": {
                "engine": "VADER" if USE_VADER else "transformers",
                "total_headlines_analyzed": len(sentiments),
                "details": sentiments,
            },
        }
        return jsonify(payload)
    except requests.HTTPError as e:
        return jsonify({"error": f"NewsAPI HTTP error: {e}"}), 502
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/v1/predict")
def api_predict():
    ticker = request.args.get("ticker", "").upper().strip()
    if not ticker:
        return jsonify({"error": "ticker is required, e.g. /api/v1/predict?ticker=TSLA"}), 400

    px = get_price_history(ticker, period="2y")  # -> DataFrame with 'Close'
    if px.empty:
        return jsonify({"error": "No price data."}), 400

    feats = ta_features(px)
    prob_up = prob_up_from_momentum(feats)

    latest = feats.iloc[-1]
    return jsonify(
        {
            "ticker": ticker,
            "as_of": feats.index[-1].strftime("%Y-%m-%d"),
            "prob_up": float(prob_up.iloc[-1]),
            "features": {
                "ret1": float(latest.get("ret1", 0.0)),
                "vol20": float(latest.get("vol20", 0.0)),
                "mom20": float(latest.get("mom20", 0.0)),
                "rsi14": float(latest.get("rsi14", 0.0)),
                "bb_width": float(latest.get("bb_width", 0.0)),
            },
        }
    )


# Register BOTH with and without trailing slash, no blank line between decorators and def.
@app.route("/api/v1/backtest", methods=["GET"])
@app.route("/api/backtest/", methods=["GET"])
@app.route("/api/backtest", methods=["GET"])
def api_backtest():
    ticker = (request.args.get("ticker") or "").upper().strip()
    period = request.args.get("period", "2y")

    if not ticker:
        return jsonify({"error": "Missing ticker"}), 400

    print(f"[BACKTEST] ticker={ticker} period={period}", flush=True)

    # 1) prices
    px_df = get_price_history(ticker, period=period)  # normalized
    if px_df.empty:
        print("[BACKTEST] No price data", flush=True)
        return jsonify({"error": "No price data."}), 400

    price = px_df["Close"]
    print(f"[BACKTEST] price len={len(price)}, head:\n{price.head()}", flush=True)

    # 2) demo probability from 20d momentum (sigmoid)
    mom20 = price.pct_change(20)
    prob_up = (1.0 / (1.0 + np.exp(-10.0 * mom20))).clip(0.01, 0.99)
    print(f"[BACKTEST] prob_up len={len(prob_up)}, head:\n{prob_up.head()}", flush=True)

    # 3) backtest
    bt = run_backtest(price, prob_up)
    print(f"[BACKTEST] metrics={bt['metrics']}", flush=True)

    # 4) response in the shape your JS expects
    dates = [d.strftime("%Y-%m-%d") for d in price.index]
    series = {
        "dates": dates,
        "equity": [float(x) for x in bt["equity"]],
        "buy_hold": [float(x) for x in bt["buy_hold"]],
    }
    return jsonify({"metrics": bt["metrics"], "series": series})


if __name__ == "__main__":
    app.run(debug=True)
