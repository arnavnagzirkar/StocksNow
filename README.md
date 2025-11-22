# StocksNow - Quantitative Research Platform

A comprehensive quantitative research platform for stock analysis, featuring walk-forward machine learning models, portfolio backtesting, factor analysis, and sentiment analysis.

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

## 🏗️ Architecture

### Backend Features
- **Walk-Forward XGBoost:** Train ML models on expanding windows with out-of-sample predictions
- **Portfolio Backtesting:** Multi-asset portfolio simulation with various allocation strategies
- **Factor Analysis:** 60+ alpha factors including momentum, mean reversion, volatility, volume
- **Signal Decay:** IC analysis over multiple horizons
- **Risk Analytics:** Sharpe, Sortino, max drawdown, CAGR, Fama-French exposure
- **Sentiment Analysis:** News-based sentiment using VADER or transformers
- **Experiment Manager:** Grid search across hyperparameter space with summary statistics

### Frontend Features (React)
- **Dashboard:** Aggregated portfolio metrics and recent signals
- **Ticker Intelligence:** Single-stock analysis with predictions and risk metrics
- **Factor Explorer:** Compute and visualize 60+ alpha factors with PCA diagnostics
- **Model Lab:** Train walk-forward XGBoost models with custom parameters
- **Experiment Manager:** Run parameter sweeps and compare model configurations
- **Signal Diagnostics:** Decay analysis and IC quantile breakdowns
- **Strategy Backtest:** Single-ticker strategy backtesting with equity curves
- **Portfolio Lab:** Multi-asset portfolio optimization and backtesting
- **Risk & Performance:** Portfolio attribution and risk metrics
- **Sentiment Analyzer:** Multi-ticker news sentiment analysis
- **Settings:** Configure default universe and preferences

## 📁 Project Structure

```
StocksNow/
├── main.py                    # Flask app with route definitions
├── core/
│   ├── adapter_api.py         # Adapter routes for React frontend
│   ├── backtest.py            # Single-ticker backtest engine
│   ├── features.py            # Feature engineering utilities
│   ├── model.py               # XGBoost model training
│   └── research/              # Advanced research modules
│       ├── api.py             # Research API endpoints
│       ├── experiment.py      # Walk-forward XGBoost experiments
│       ├── portfolio.py       # Multi-asset portfolio backtest
│       ├── factors.py         # Alpha factor computation
│       ├── decay.py           # Signal decay analysis
│       ├── stats.py           # Performance metrics
│       ├── ff.py              # Fama-French factor exposure
│       └── report.py          # Report generation
├── templates/                 # Legacy Jinja2 templates
├── static/                    # Legacy vanilla JS
├── src/                       # React source code
│   ├── App.tsx               # React Router setup
│   ├── components/           # React components
│   │   ├── pages/            # Page components
│   │   ├── ui/               # Reusable UI components
│   │   └── charts/           # Chart components
│   ├── hooks/                # Custom React hooks
│   ├── services/             # API client
│   ├── utils/                # Utility functions
│   └── styles/               # Global styles
├── data/                     # Data cache and factors
└── models/                   # Trained model artifacts

```

## 🔧 API Endpoints

### Adapter API (for React frontend)
- `GET /api/dashboard/overview` - Dashboard metrics
- `GET /api/dashboard/signals` - Recent model signals
- `GET /api/tickers/:ticker` - Ticker overview
- `POST /api/factors/compute` - Compute alpha factors
- `POST /api/factors/pca` - PCA diagnostics
- `POST /api/models/train` - Train walk-forward model
- `POST /api/experiments/run` - Run hyperparameter experiment
- `POST /api/signals/decay` - Signal decay analysis
- `POST /api/portfolio/backtest` - Portfolio backtest
- `GET /api/risk/metrics` - Risk metrics
- `POST /api/sentiment/analyze` - Sentiment analysis
- `GET|PUT /api/settings` - User settings

### Legacy API (for Jinja2 templates)
- `POST /api/research/predict` - Walk-forward XGB prediction
- `POST /api/experiment/run` - Experiment grid search
- `POST /api/portfolio/backtest` - Portfolio backtest (legacy)
- `GET /api/factors` - Factor computation
- `GET /api/decay` - Decay analysis
- `GET /api/quantiles` - IC quantile analysis
- `GET /api/risk` - Risk metrics
- `GET /api/report` - Portfolio report
- `GET /api/ff_exposure` - Fama-French exposure
- `POST /analyze` - Sentiment analysis

## 🎨 Frontend Tech Stack

- **React 18.2** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Styling framework
- **Recharts** - Charting library
- **Radix UI** - Accessible UI primitives

## 🐍 Backend Tech Stack

- **Flask 3.x** - Web framework
- **XGBoost** - Gradient boosting ML
- **yfinance** - Market data
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **Plotly** - Interactive charts (legacy templates)
- **transformers/VADER** - Sentiment analysis

## 📊 Usage Examples

### Train a Walk-Forward Model
```bash
curl -X POST http://localhost:5000/api/models/train \
  -H "Content-Type: application/json" \
  -d '{"tickers": ["AAPL"], "startDate": "2015-01-01", "horizon": "1d"}'
```

### Run Portfolio Backtest
```bash
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

### Compute Alpha Factors
```bash
curl -X POST http://localhost:5000/api/factors/compute \
  -H "Content-Type: application/json" \
  -d '{"tickers": ["AAPL"], "startDate": "2015-01-01"}'
```

## 🧪 Development Testing

### Test Backend Only
```powershell
# Start Flask
python main.py

# Test API endpoints
Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard/overview" -Method GET
```

### Test React + Flask Integration
```powershell
# Terminal 1: Start Flask backend
python main.py

# Terminal 2: Start React dev server
npm run dev

# Open http://localhost:5173 in browser
```

### Test Production Build
```powershell
# Build React app
npm run build

# Start Flask (will serve React build from dist/)
python main.py

# Open http://localhost:5000 in browser
```

## 📝 Configuration

### Python Environment
- Python 3.9+
- Virtual environment recommended

### Node Environment
- Node.js 18+
- npm or yarn

### Environment Variables
- `NEWS_API_KEY` - NewsAPI key for sentiment analysis
- `VITE_API_BASE_URL` - React API base URL (default: http://localhost:5000)

## 🤝 Contributing

Contributions welcome! Please follow the existing code structure and add tests for new features.

## 📄 License

See LICENSE file for details.