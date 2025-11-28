# 📈 QuantSight - Intelligent Quantitative Research Platform

> **Transform market data into actionable insights with machine learning-powered stock analysis**

QuantSight is a professional-grade quantitative research platform that combines the power of machine learning, statistical analysis, and modern web technologies to help traders, analysts, and researchers make data-driven investment decisions. Whether you're backtesting trading strategies, analyzing alpha factors, or exploring market sentiment, QuantSight provides the tools you need in an intuitive, elegant interface.

## ✨ Key Features

- **🤖 Walk-Forward ML Models** - XGBoost predictions with proper out-of-sample validation
- **📊 Portfolio Backtesting** - Multi-asset strategies with various allocation methods
- **🔍 Factor Analysis** - 60+ alpha factors with PCA diagnostics and IC analysis
- **📰 Sentiment Analysis** - NLP-powered news sentiment extraction
- **📈 Signal Diagnostics** - Validate signal quality with decay analysis
- **⚡ Modern UI** - React + TypeScript frontend with dark mode
- **🔧 RESTful API** - Production-ready endpoints for automation

---

## 🚀 Quick Start

### Backend (Flask + Python)

1. **Install Python dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```

2. **Set up environment variables:**
   ```powershell
   cp .env.example .env
   # Edit .env and add your NEWS_API_KEY
   ```

3. **Run the Flask backend:**
   ```powershell
   python main.py
   ```
   Server will start at `http://localhost:5000`

### Frontend (React + TypeScript)

**Option 1: Development Mode (with Hot Reload)**
```powershell
# Install Node dependencies
npm install

# Run Vite dev server
npm run dev
```
React dev server will start at `http://localhost:5173` with API proxy to Flask backend.

**Option 2: Production Build (served by Flask)**
```powershell
# Build React app
npm install
npm run build

# Restart Flask - it will automatically detect dist/ and serve React app
python main.py
```
Visit `http://localhost:5000` to see the React frontend.

## 🏗️ Tech Stack

**Frontend:** React 18 • TypeScript • Vite • TailwindCSS • Recharts • Radix UI  
**Backend:** Flask 3 • Python 3.9+ • XGBoost • pandas • numpy  
**Data:** yfinance (market data) • NewsAPI (sentiment) • local file cache

## 📁 Project Structure

```
QuantSight/
├── main.py                    # Flask app entry point
├── core/                      # Python backend logic
│   ├── adapter_api.py        # REST API endpoints
│   ├── model.py              # XGBoost ML models
│   ├── backtest.py           # Backtesting engine
│   └── research/             # Factor analysis, portfolios, experiments
├── components/               # React frontend
│   ├── pages/                # 11 main pages (Dashboard, ModelLab, etc.)
│   ├── ui/                   # Reusable UI components
│   └── charts/               # Data visualizations
├── data/                     # Cached market data
├── models/                   # Trained ML models
└── dist/                     # Production build
```

## 🔧 API Endpoints

### Main Endpoints
- `POST /api/models/train` - Train walk-forward XGBoost model
- `POST /api/portfolio/backtest` - Multi-asset portfolio backtest
- `POST /api/factors/compute` - Calculate 60+ alpha factors
- `POST /api/experiments/run` - Hyperparameter grid search
- `POST /api/signals/decay` - Signal decay analysis
- `POST /api/sentiment/analyze` - News sentiment extraction
- `GET /api/dashboard/overview` - Portfolio metrics
- `GET /api/tickers/:ticker` - Single-stock analysis
- `GET /api/risk/metrics` - Risk analytics

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/models/train \
  -H "Content-Type: application/json" \
  -d '{"tickers": ["AAPL"], "startDate": "2015-01-01", "horizon": "1d"}'
```

## 💡 Usage Example

**Train a model and backtest a strategy:**

```bash
# 1. Train XGBoost model
curl -X POST http://localhost:5000/api/models/train \
  -H "Content-Type: application/json" \
  -d '{"tickers": ["AAPL"], "startDate": "2015-01-01", "horizon": "1d"}'

# 2. Run portfolio backtest
curl -X POST http://localhost:5000/api/portfolio/backtest \
  -H "Content-Type: application/json" \
  -d '{
    "tickers": ["AAPL", "MSFT", "GOOGL"],
    "start": "2015-01-01",
    "signal": "prob_up_1d",
    "allocator": "equal_weight",
    "rebalance": "weekly"
  }'
```

**Or use the web interface** - navigate to Model Lab or Portfolio Backtest pages.

## ⚙️ Configuration

Create a `.env` file for API keys:
```bash
NEWS_API_KEY=your_news_api_key_here  # Get free key at newsapi.org
VITE_API_BASE_URL=http://localhost:5000
```

**Customize factors** in `core/research/factors.py` or **model parameters** in `core/model.py`.

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `ModuleNotFoundError` | Run `pip install -r requirements.txt` |
| `Cannot find module 'react'` | Run `npm install` |
| Port 5000 in use | Change port in `main.py` or kill process |
| "Failed to fetch" errors | Ensure Flask backend is running |
| Slow model training | Reduce date range or use fewer tickers |

---

## 🚀 Deployment

**Production build:**
```bash
npm run build
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 main:app
```

**Security:** Enable HTTPS, set `FLASK_DEBUG=False`, implement rate limiting and authentication.

---

## 🤝 Contributing

Contributions welcome! Fork the repo, create a feature branch, and submit a PR.  
Follow PEP 8 for Python and ESLint rules for TypeScript.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for quantitative researchers**

*QuantSight - See the market through a quantitative lens*