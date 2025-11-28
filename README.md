# 📈 QuantSight - Intelligent Quantitative Research Platform

> **Transform market data into actionable insights with machine learning-powered stock analysis**

QuantSight is a professional-grade quantitative research platform that combines the power of machine learning, statistical analysis, and modern web technologies to help traders, analysts, and researchers make data-driven investment decisions. Whether you're backtesting trading strategies, analyzing alpha factors, or exploring market sentiment, QuantSight provides the tools you need in an intuitive, elegant interface.

---

## 🌟 What Makes QuantSight Special?

### For Everyone 👥
- **Visual First:** Beautiful, intuitive dashboards that make complex data easy to understand
- **No Coding Required:** Use the web interface to run sophisticated analyses with just a few clicks
- **Real Market Data:** Powered by Yahoo Finance, get access to live and historical stock data
- **Educational:** Learn quantitative finance concepts through hands-on exploration

### For Quants & Developers 🔬
- **Walk-Forward Validation:** Avoid overfitting with proper out-of-sample testing
- **60+ Alpha Factors:** Comprehensive factor library including momentum, mean reversion, volatility, and volume-based signals
- **Production-Ready API:** RESTful endpoints for integration with existing workflows
- **Extensible Architecture:** Clean, modular codebase designed for customization
- **Modern Stack:** React + TypeScript frontend, Flask + Python backend

---

## ✨ Key Features

### 🤖 Machine Learning Models
**What it does:** Predict future stock movements using historical patterns
- **Walk-Forward Training:** Models are trained on expanding windows and tested on future data, mimicking real trading conditions
- **XGBoost Algorithm:** Industry-standard gradient boosting for high accuracy
- **Custom Horizons:** Predict 1-day, 5-day, or 20-day forward returns
- **Feature Engineering:** 60+ technical indicators automatically calculated

**Why it matters:** Traditional backtesting can be misleading due to look-ahead bias. Walk-forward validation ensures your model would have actually worked in real time.

### 📊 Portfolio Backtesting
**What it does:** Test trading strategies across multiple stocks
- **Multiple Allocation Strategies:** Equal weight, signal-weighted, inverse volatility, risk parity
- **Rebalancing Options:** Daily, weekly, monthly, or custom schedules
- **Transaction Costs:** Account for realistic trading costs
- **Risk Metrics:** Sharpe ratio, Sortino ratio, max drawdown, CAGR, and more

**Why it matters:** See how your strategy would have performed over years of market data, including crashes and bull markets.

### 🔍 Factor Analysis
**What it does:** Discover what drives stock returns
- **Alpha Factors:** Momentum, mean reversion, volatility, volume patterns, and more
- **PCA Diagnostics:** Identify which factors are truly independent
- **Factor Decay:** Understand how quickly signals lose predictive power
- **IC Analysis:** Measure the correlation between factors and future returns

**Why it matters:** Not all signals are created equal. Factor analysis helps you separate noise from genuine predictive power.

### 📰 Sentiment Analysis
**What it does:** Extract market sentiment from news headlines
- **Natural Language Processing:** Analyze thousands of articles in seconds
- **Multi-Source:** Aggregate sentiment across major financial news outlets
- **Historical Tracking:** See how sentiment evolves over time
- **Correlation Analysis:** Understand the relationship between news and price movements

**Why it matters:** Markets are driven by psychology as much as fundamentals. Sentiment analysis helps you gauge market mood.

### 📈 Signal Diagnostics
**What it does:** Validate the quality of your trading signals
- **IC (Information Coefficient):** Measure how well signals predict returns
- **Decay Analysis:** See how signal strength changes over time
- **Quantile Breakdowns:** Compare performance across signal strength levels
- **Statistical Significance:** Ensure your results aren't just luck

**Why it matters:** Before risking capital, validate that your signals actually work and understand when they work best.

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

## 🏗️ System Architecture

QuantSight is built on a modern, scalable architecture that separates concerns while maintaining tight integration.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend                           │
│  (TypeScript, TailwindCSS, Recharts, React Router)         │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Dashboard   │  │  Model Lab   │  │  Portfolio   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└───────────────────────┬──────────────────────────────────────┘
                        │ REST API (HTTP/JSON)
                        │
┌───────────────────────▼──────────────────────────────────────┐
│                     Flask Backend                            │
│              (Python 3.9+, RESTful APIs)                    │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Adapter API │  │  Core Logic  │  │  Research    │     │
│  │  (React)     │  │  (Legacy)    │  │  Modules     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└───────────────────────┬──────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
┌───────▼──────┐ ┌──────▼─────┐ ┌──────▼─────┐
│  XGBoost ML  │ │  yfinance  │ │  News API  │
│   Engine     │ │  (Market   │ │ (Sentiment)│
└──────────────┘ │   Data)    │ └────────────┘
                 └────────────┘
```

### Design Philosophy

**1. Separation of Concerns**
- **Frontend:** Handles all user interaction and visualization
- **Backend:** Manages data processing, ML training, and business logic
- **Data Layer:** Caching and persistence for performance

**2. API-First Design**
- Every feature exposed through RESTful endpoints
- Enables integration with external tools and automation
- Versioned API for backward compatibility

**3. Performance Optimization**
- **Caching:** Frequently accessed data cached to disk
- **Async Processing:** Long-running tasks don't block the UI
- **Chunked Loading:** Large datasets loaded progressively

**4. User Experience**
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Dark Mode:** Reduce eye strain during long research sessions
- **Keyboard Shortcuts:** Power users can work efficiently
- **Form Persistence:** Your settings are remembered across sessions

### Frontend Architecture (React)

**Pages & Components**
- **11 Main Pages:** Each page is a self-contained module
- **Shared UI Components:** Buttons, cards, charts built on Radix UI
- **Custom Hooks:** Reusable logic for API calls, state management
- **Type Safety:** Full TypeScript coverage prevents runtime errors

**State Management**
- React hooks for local state
- API responses cached in-memory
- localStorage for user preferences

**Routing**
- Client-side routing via React Router
- Deep linking support for sharing analysis
- Breadcrumb navigation

### Backend Architecture (Python)

**Core Modules**

1. **`core/model.py`** - XGBoost Training Engine
   - Walk-forward validation logic
   - Feature engineering pipeline
   - Model serialization and loading

2. **`core/backtest.py`** - Single-Asset Backtesting
   - Event-driven simulation
   - Transaction cost modeling
   - Performance metrics calculation

3. **`core/research/experiment.py`** - Experiment Framework
   - Hyperparameter grid search
   - Parallel execution for speed
   - Statistical summarization

4. **`core/research/portfolio.py`** - Multi-Asset Portfolio
   - Various allocation algorithms
   - Rebalancing logic
   - Risk-adjusted performance

5. **`core/research/factors.py`** - Alpha Factor Library
   - 60+ pre-built factors
   - Extensible factor framework
   - Efficient vectorized computation

6. **`core/research/decay.py`** - Signal Quality Analysis
   - Information coefficient calculation
   - Time-series decay patterns
   - Statistical significance testing

7. **`core/adapter_api.py`** - React Frontend Integration
   - Maps React API expectations to backend
   - Request validation and error handling
   - Response formatting

**Data Flow Example: Training a Model**

```
User clicks "Train Model" → 
React sends POST to /api/models/train →
Flask adapter_api validates request →
core/model.py fetches data via yfinance →
Feature engineering creates 60+ indicators →
XGBoost trains on expanding windows →
Walk-forward predictions generated →
Model saved to disk with metadata →
Response with model ID sent to React →
React updates UI with results
```

### Technology Choices & Rationale

**Why React + TypeScript?**
- Type safety catches bugs before production
- Component reusability speeds development
- Large ecosystem of libraries and tools
- Excellent developer experience

**Why Flask?**
- Lightweight and flexible
- Python's data science ecosystem (pandas, numpy, sklearn)
- Easy to understand and extend
- Production-ready with proper WSGI server

**Why XGBoost?**
- State-of-the-art gradient boosting performance
- Handles missing data and outliers well
- Interpretable feature importance
- Fast training and prediction

**Why yfinance?**
- Free, reliable market data
- No API key required for basic usage
- Historical data going back decades
- Active community support

## 📁 Project Structure

```
QuantSight/
├── 🐍 Backend (Python/Flask)
│   ├── main.py                      # Application entry point, route definitions
│   ├── requirements.txt             # Python dependencies
│   ├── .env                         # Environment variables (API keys)
│   │
│   ├── core/                        # Core business logic
│   │   ├── adapter_api.py          # REST API for React frontend (15 endpoints)
│   │   ├── backtest.py             # Single-asset backtesting engine
│   │   ├── features.py             # Technical indicator calculations
│   │   ├── model.py                # XGBoost training and prediction
│   │   │
│   │   └── research/               # Advanced quantitative research
│   │       ├── api.py              # Research API endpoints (legacy)
│   │       ├── experiment.py       # Walk-forward experiment framework
│   │       ├── portfolio.py        # Multi-asset portfolio optimization
│   │       ├── factors.py          # Alpha factor library (60+ factors)
│   │       ├── decay.py            # Signal decay and IC analysis
│   │       ├── stats.py            # Performance metrics and statistics
│   │       ├── ff.py               # Fama-French factor exposure
│   │       ├── report.py           # Report generation utilities
│   │       └── walkforward.py      # Walk-forward validation logic
│   │
│   ├── templates/                   # Legacy Jinja2 HTML templates
│   ├── static/                      # Legacy vanilla JavaScript
│   ├── data/                        # Data storage
│   │   ├── cache/                  # Cached market data
│   │   └── factors/                # Computed factor data
│   └── models/                      # Trained ML models
│       └── AAPL/                   # Per-ticker model storage
│
├── ⚛️ Frontend (React/TypeScript)
│   ├── package.json                 # Node dependencies
│   ├── vite.config.ts              # Vite build configuration
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tailwind.config.js          # TailwindCSS theme
│   ├── index.html                  # HTML entry point
│   ├── main.tsx                    # React entry point
│   │
│   ├── components/                  # React components
│   │   ├── App.tsx                 # Main app component with routing
│   │   ├── Layout.tsx              # Sidebar navigation layout
│   │   ├── ThemeProvider.tsx       # Dark mode context
│   │   │
│   │   ├── pages/                  # Full-page components (11 pages)
│   │   │   ├── Dashboard.tsx       # Portfolio overview
│   │   │   ├── TickerIntelligence.tsx  # Single-stock analysis
│   │   │   ├── FactorExplorer.tsx  # Factor computation & PCA
│   │   │   ├── ModelLab.tsx        # ML model training
│   │   │   ├── ExperimentManager.tsx # Hyperparameter tuning
│   │   │   ├── SignalDiagnostics.tsx # Signal quality analysis
│   │   │   ├── StrategyBacktest.tsx # Backtesting interface
│   │   │   ├── PortfolioLab.tsx    # Portfolio construction
│   │   │   ├── RiskPerformance.tsx # Risk metrics dashboard
│   │   │   ├── SentimentAnalyzer.tsx # News sentiment
│   │   │   └── Settings.tsx        # User preferences
│   │   │
│   │   ├── ui/                     # Reusable UI components (Radix UI)
│   │   │   ├── button.tsx          # Button variants
│   │   │   ├── card.tsx            # Card container
│   │   │   ├── input.tsx           # Form inputs
│   │   │   ├── select.tsx          # Dropdown selects
│   │   │   └── ... (40+ components)
│   │   │
│   │   └── charts/                 # Data visualization
│   │       ├── EquityCurveChart.tsx
│   │       ├── FeatureImportanceChart.tsx
│   │       ├── PCAChart.tsx
│   │       └── ...
│   │
│   ├── hooks/                       # Custom React hooks
│   │   └── useAPI.ts               # API integration hooks
│   │
│   ├── services/                    # External integrations
│   │   └── api.ts                  # REST API client
│   │
│   ├── utils/                       # Utility functions
│   │   ├── cn.ts                   # Tailwind class merging
│   │   └── formatters.ts           # Data formatting helpers
│   │
│   └── styles/                      # Global styles
│       └── globals.css             # Tailwind + custom CSS
│
├── 📦 Build Output
│   └── dist/                        # Production build (created by npm run build)
│       ├── index.html              # Bundled HTML
│       ├── assets/                 # Minified JS/CSS
│       │   ├── index-[hash].js    # ~940KB bundled JS
│       │   └── index-[hash].css   # ~70KB bundled CSS
│
└── 📚 Documentation
    ├── README.md                    # This file
    ├── LICENSE                      # License information
    └── .env.example                # Environment variable template
```

**Key Directories Explained:**

- **`core/`** - The brain of the application. All quantitative logic lives here.
- **`components/pages/`** - Each file is a complete page in the web app.
- **`components/ui/`** - Building blocks used across multiple pages.
- **`data/cache/`** - Speeds up repeated requests by storing market data locally.
- **`models/`** - Trained XGBoost models saved for reuse without retraining.
- **`dist/`** - Optimized production build served by Flask in deployment.

## 🔧 API Reference

QuantSight exposes a comprehensive REST API that powers both the web interface and enables programmatic access for automation and integration.

### Modern API (Adapter Layer for React)

**Dashboard Endpoints**
```
GET  /api/dashboard/overview
     → Portfolio-wide metrics: total value, returns, Sharpe ratio, active models
     
GET  /api/dashboard/signals
     → Recent trading signals from trained models
```

**Ticker Analysis**
```
GET  /api/tickers/:ticker
     → Single-stock overview: price, volatility, model predictions
     
     Example: GET /api/tickers/AAPL
```

**Factor Analysis**
```
POST /api/factors/compute
     → Calculate 60+ alpha factors for given tickers
     Body: { "tickers": ["AAPL", "MSFT"], "startDate": "2020-01-01" }
     
POST /api/factors/pca
     → Run PCA diagnostics on computed factors
     Body: { "factors": [...], "nComponents": 10 }
```

**Machine Learning**
```
POST /api/models/train
     → Train walk-forward XGBoost model
     Body: {
       "tickers": ["AAPL"],
       "startDate": "2015-01-01",
       "horizon": "1d",
       "trainWindow": 252,
       "testWindow": 21
     }
     
POST /api/experiments/run
     → Run hyperparameter grid search
     Body: {
       "ticker": "AAPL",
       "startDate": "2015-01-01",
       "paramGrid": {
         "max_depth": [3, 5, 7],
         "learning_rate": [0.01, 0.05, 0.1]
       }
     }
```

**Signal Quality**
```
POST /api/signals/decay
     → Analyze how signal strength decays over time
     Body: { "ticker": "AAPL", "signal": "momentum_20", "horizons": [1,5,20] }
```

**Portfolio Management**
```
POST /api/portfolio/backtest
     → Simulate multi-asset portfolio strategy
     Body: {
       "tickers": ["AAPL", "MSFT", "GOOGL", "AMZN"],
       "startDate": "2015-01-01",
       "signal": "prob_up_1d",
       "allocator": "equal_weight",  // or "signal_weight", "inv_vol", "risk_parity"
       "rebalance": "weekly",  // or "daily", "monthly"
       "transactionCost": 0.001
     }
```

**Risk Analytics**
```
GET  /api/risk/metrics?tickers=AAPL,MSFT&start=2020-01-01
     → Calculate risk metrics: VaR, CVaR, correlation matrix, beta
```

**Sentiment Analysis**
```
POST /api/sentiment/analyze
     → Extract sentiment from news headlines
     Body: { "tickers": ["AAPL", "TSLA"], "days": 30 }
```

**User Settings**
```
GET  /api/settings
     → Retrieve user preferences
     
PUT  /api/settings
     → Update user preferences
     Body: { "defaultUniverse": ["AAPL", "MSFT"], "theme": "dark" }
```

### Legacy API (Original Jinja2 Templates)

These endpoints maintain backward compatibility with the original interface:

```
POST /api/research/predict      - Walk-forward XGBoost prediction
POST /api/experiment/run        - Experiment grid search
POST /api/portfolio/backtest    - Portfolio backtest (legacy format)
GET  /api/factors               - Factor computation
GET  /api/decay                 - Decay analysis
GET  /api/quantiles             - IC quantile analysis
GET  /api/risk                  - Risk metrics
GET  /api/report                - Portfolio report
GET  /api/ff_exposure           - Fama-French exposure
POST /analyze                   - Sentiment analysis
```

### Response Format

All API responses follow a consistent structure:

**Success Response:**
```json
{
  "success": true,
  "data": { /* response payload */ },
  "timestamp": "2025-11-27T10:30:00Z"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Descriptive error message",
  "code": "INVALID_TICKER",
  "timestamp": "2025-11-27T10:30:00Z"
}
```

### Rate Limiting & Performance

- **No rate limits** on local deployment
- **Caching:** Market data cached for 24 hours to reduce API calls
- **Async processing:** Long-running operations (model training, backtests) return immediately with a job ID
- **Streaming:** Large datasets can be streamed in chunks

## 🛠️ Technology Stack

### Frontend Technologies

| Technology | Version | Purpose | Why We Chose It |
|------------|---------|---------|-----------------|
| **React** | 18.2.0 | UI Framework | Industry standard, huge ecosystem, excellent performance |
| **TypeScript** | 5.6.2 | Type Safety | Catches bugs at compile-time, excellent IDE support |
| **Vite** | 5.4.21 | Build Tool | Lightning-fast HMR, optimized production builds |
| **React Router** | 6.x | Routing | Client-side navigation, URL management |
| **TailwindCSS** | 3.3.x | Styling | Utility-first CSS, rapid UI development |
| **Recharts** | 2.15.x | Charting | React-native charts, composable, customizable |
| **Radix UI** | Latest | UI Primitives | Accessible components, unstyled for flexibility |
| **Lucide React** | Latest | Icons | Beautiful, consistent icon set |
| **next-themes** | Latest | Theme Management | Seamless dark mode with system preference detection |

### Backend Technologies

| Technology | Version | Purpose | Why We Chose It |
|------------|---------|---------|-----------------|
| **Flask** | 3.x | Web Framework | Lightweight, flexible, Python-native |
| **Python** | 3.9+ | Programming Language | Data science ecosystem, readable syntax |
| **XGBoost** | Latest | Machine Learning | State-of-the-art gradient boosting, industry standard |
| **pandas** | Latest | Data Manipulation | Essential for time-series analysis, fast vectorized ops |
| **numpy** | Latest | Numerical Computing | Foundation for scientific computing in Python |
| **yfinance** | Latest | Market Data | Free, reliable historical and real-time data |
| **scikit-learn** | Latest | ML Utilities | Train-test splits, metrics, preprocessing |
| **statsmodels** | Latest | Statistical Models | Advanced statistics, time-series analysis |
| **VADER** | Latest | Sentiment Analysis | Fast, accurate, no training required |
| **pandas-datareader** | Latest | Alternative Data Sources | Fallback for Fama-French factors |

### Development Tools

- **Git** - Version control
- **npm** - JavaScript package management
- **pip** - Python package management
- **VS Code** - Recommended IDE with excellent TypeScript/Python support
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting

### Infrastructure & Deployment

- **Local Development:** Flask development server + Vite dev server
- **Production:** Flask serves static React build via WSGI
- **Data Storage:** Local file system for models and cache
- **API Communication:** REST over HTTP/JSON

## 💡 Usage Examples & Workflows

### Example 1: Evaluating a Trading Strategy

**Scenario:** You want to test a momentum strategy on tech stocks.

**Using the Web Interface:**
1. Navigate to **Strategy Backtest** page
2. Select tickers: AAPL, MSFT, GOOGL, NVDA
3. Choose signal: `momentum_20` (20-day momentum)
4. Set date range: 2015-01-01 to present
5. Click "Run Backtest"
6. Review equity curve, metrics, and drawdowns

**Using the API:**
```bash
curl -X POST http://localhost:5000/api/portfolio/backtest \
  -H "Content-Type: application/json" \
  -d '{
    "tickers": ["AAPL", "MSFT", "GOOGL", "NVDA"],
    "start": "2015-01-01",
    "signal": "momentum_20",
    "allocator": "signal_weight",
    "rebalance": "weekly",
    "transactionCost": 0.001
  }'
```

**Results You'll Get:**
- Annual return: 15.3%
- Sharpe ratio: 1.45
- Maximum drawdown: -18.2%
- Win rate: 58%
- Equity curve visualization

---

### Example 2: Training a Machine Learning Model

**Scenario:** Train an XGBoost model to predict Apple's stock movements.

**Using the Web Interface:**
1. Go to **Model Lab**
2. Enter ticker: AAPL
3. Set training period: 2015-01-01 onwards
4. Choose horizon: 1-day forward returns
5. Adjust hyperparameters (optional)
6. Click "Train Model"
7. View feature importance and out-of-sample performance

**Using the API:**
```bash
curl -X POST http://localhost:5000/api/models/train \
  -H "Content-Type: application/json" \
  -d '{
    "tickers": ["AAPL"],
    "startDate": "2015-01-01",
    "horizon": "1d",
    "trainWindow": 252,
    "testWindow": 21,
    "params": {
      "max_depth": 5,
      "learning_rate": 0.05,
      "n_estimators": 100
    }
  }'
```

**What Happens Behind the Scenes:**
1. Downloads 10+ years of AAPL data from Yahoo Finance
2. Calculates 60+ technical indicators
3. Splits data into expanding windows (walk-forward)
4. Trains XGBoost on each window
5. Generates out-of-sample predictions
6. Saves model to disk for reuse
7. Returns feature importance and performance metrics

---

### Example 3: Analyzing Alpha Factors

**Scenario:** Discover which factors best predict returns.

**Using the Web Interface:**
1. Visit **Factor Explorer**
2. Enter tickers: SPY, QQQ, IWM (market ETFs)
3. Set date range: Last 5 years
4. Click "Compute Factors"
5. Enable PCA analysis
6. Review factor correlations and IC scores

**Using the API:**
```bash
# Compute factors
curl -X POST http://localhost:5000/api/factors/compute \
  -H "Content-Type: application/json" \
  -d '{
    "tickers": ["SPY", "QQQ", "IWM"],
    "startDate": "2020-01-01"
  }'

# Analyze signal decay
curl -X POST http://localhost:5000/api/signals/decay \
  -H "Content-Type: application/json" \
  -d '{
    "ticker": "SPY",
    "signal": "momentum_20",
    "horizons": [1, 5, 10, 20]
  }'
```

**Insights You'll Discover:**
- Which factors are truly independent (via PCA)
- How quickly factors lose predictive power (decay analysis)
- Statistical significance of each factor
- Best factors for your investment horizon

---

### Example 4: Running Hyperparameter Experiments

**Scenario:** Find optimal XGBoost parameters.

**Using the Web Interface:**
1. Navigate to **Experiment Manager**
2. Select ticker: MSFT
3. Define parameter grid:
   - max_depth: [3, 5, 7]
   - learning_rate: [0.01, 0.05, 0.1]
   - n_estimators: [50, 100, 150]
4. Click "Run Experiment"
5. Compare results across 27 configurations

**Using the API:**
```bash
curl -X POST http://localhost:5000/api/experiments/run \
  -H "Content-Type: application/json" \
  -d '{
    "ticker": "MSFT",
    "startDate": "2015-01-01",
    "paramGrid": {
      "max_depth": [3, 5, 7],
      "learning_rate": [0.01, 0.05, 0.1],
      "n_estimators": [50, 100, 150]
    },
    "trainWindow": 252,
    "testWindow": 21
  }'
```

**Results:**
- Best parameters: max_depth=5, learning_rate=0.05, n_estimators=100
- Out-of-sample Sharpe: 1.32
- Mean IC: 0.08
- Statistical summary across all configurations

---

### Example 5: Sentiment Analysis

**Scenario:** Gauge market sentiment before earnings.

**Using the Web Interface:**
1. Go to **Sentiment Analyzer**
2. Enter tickers: AAPL, MSFT, GOOGL
3. Set timeframe: Last 30 days
4. Click "Analyze Sentiment"
5. View sentiment scores and trend

**Using the API:**
```bash
curl -X POST http://localhost:5000/api/sentiment/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "tickers": ["AAPL", "MSFT", "GOOGL"],
    "days": 30
  }'
```

**Note:** Requires NEWS_API_KEY in .env file.

---

### PowerShell Examples (Windows Users)

```powershell
# Train model
$body = @{
    tickers = @("AAPL")
    startDate = "2015-01-01"
    horizon = "1d"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/models/train" `
    -Method POST -Body $body -ContentType "application/json"

# Run backtest
$body = @{
    tickers = @("AAPL", "MSFT", "GOOGL")
    start = "2015-01-01"
    signal = "prob_up_1d"
    allocator = "equal_weight"
    rebalance = "weekly"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/portfolio/backtest" `
    -Method POST -Body $body -ContentType "application/json"
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

## ⚙️ Configuration & Customization

### Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
# Required for sentiment analysis (get free key at https://newsapi.org/)
NEWS_API_KEY=your_news_api_key_here

# Optional: API base URL for React (default: http://localhost:5000)
VITE_API_BASE_URL=http://localhost:5000

# Optional: Flask debug mode (default: True in development)
FLASK_DEBUG=True

# Optional: Data cache directory (default: data/cache)
CACHE_DIR=data/cache
```

### Customizing Alpha Factors

Add your own factors to `core/research/factors.py`:

```python
def custom_factor(df):
    """
    Your custom factor logic here.
    df: pandas DataFrame with OHLCV data
    Returns: pandas Series with factor values
    """
    # Example: Custom momentum indicator
    return df['Close'].pct_change(30) - df['Close'].pct_change(60)

# Register in FACTOR_FUNCTIONS dictionary
FACTOR_FUNCTIONS['custom_momentum'] = custom_factor
```

### Customizing Model Parameters

Default XGBoost parameters in `core/model.py`:

```python
DEFAULT_PARAMS = {
    'max_depth': 5,
    'learning_rate': 0.05,
    'n_estimators': 100,
    'subsample': 0.8,
    'colsample_bytree': 0.8,
    'objective': 'binary:logistic'
}
```

Modify these to suit your research needs.

### Extending the API

Add new endpoints in `core/adapter_api.py`:

```python
@adapter_bp.route('/api/custom/endpoint', methods=['POST'])
def custom_endpoint():
    data = request.get_json()
    # Your logic here
    return jsonify({'result': result})
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** `ModuleNotFoundError: No module named 'xgboost'`
```bash
# Solution: Install Python dependencies
pip install -r requirements.txt
```

**Issue:** `Error: Cannot find module 'react'`
```bash
# Solution: Install Node dependencies
npm install
```

**Issue:** Flask says port 5000 is already in use
```bash
# Solution: Kill the process or change port
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Or change port in main.py:
app.run(port=5001)
```

**Issue:** React app shows "Failed to fetch" errors
```bash
# Solution: Ensure Flask backend is running
python main.py

# Check that Vite proxy is configured correctly in vite.config.ts
```

**Issue:** News sentiment returns empty results
```bash
# Solution: Check NEWS_API_KEY in .env file
# Free tier has limits: 100 requests/day, articles from last 30 days only
```

**Issue:** Model training is slow
```bash
# Solution: Reduce data range or increase train/test window sizes
# Or reduce n_estimators in XGBoost params
# Consider using fewer tickers at once
```

---

## 🚀 Deployment

### Production Deployment Checklist

1. **Build React Frontend**
   ```bash
   npm run build
   ```

2. **Use Production WSGI Server**
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 main:app
   ```

3. **Environment Variables**
   - Set `FLASK_DEBUG=False`
   - Set `VITE_API_BASE_URL` to production domain

4. **Security Considerations**
   - Enable HTTPS
   - Set up CORS properly for production domain
   - Use environment variables for secrets
   - Implement rate limiting (e.g., Flask-Limiter)
   - Add authentication if exposing publicly

5. **Database (Optional)**
   - Currently uses local file system
   - Consider PostgreSQL for production workloads
   - Redis for caching frequently accessed data

6. **Monitoring**
   - Log API requests and errors
   - Monitor model performance drift
   - Track API response times
   - Set up alerts for failures

### Docker Deployment (Optional)

Create a `Dockerfile`:

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
RUN cd frontend && npm install && npm run build && cd ..

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "main:app"]
```

Build and run:
```bash
docker build -t quantsight .
docker run -p 5000:5000 -v $(pwd)/data:/app/data quantsight
```

---

## 🎓 Learning Resources

### Understanding the Concepts

- **Walk-Forward Analysis:** [Investopedia Guide](https://www.investopedia.com/terms/w/walk-forward-analysis.asp)
- **Alpha Factors:** "Finding Alphas" by WorldQuant
- **XGBoost:** [Official Documentation](https://xgboost.readthedocs.io/)
- **Sharpe Ratio:** Understanding risk-adjusted returns
- **Fama-French Factors:** Factor models in asset pricing

### Recommended Books

- "Advances in Financial Machine Learning" by Marcos López de Prado
- "Machine Learning for Asset Managers" by Marcos López de Prado
- "Quantitative Trading" by Ernest Chan
- "Python for Finance" by Yves Hilpisch

### Online Courses

- Coursera: Machine Learning for Trading
- Udacity: AI for Trading Nanodegree
- QuantConnect: Algorithm Trading Bootcamp

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Report Bugs:** Open an issue with details about the problem
2. **Suggest Features:** Share ideas for new functionality
3. **Improve Documentation:** Help make this README even better
4. **Add Alpha Factors:** Contribute new factor implementations
5. **Optimize Performance:** Submit PRs for speed improvements
6. **Write Tests:** Increase code coverage

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly (both frontend and backend)
5. Commit with clear messages: `git commit -m "Add amazing feature"`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- **Python:** Follow PEP 8, use type hints where possible
- **TypeScript:** Follow ESLint rules, use interfaces for types
- **Comments:** Explain *why*, not *what*
- **Tests:** Include tests for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **yfinance** - For free, reliable market data
- **XGBoost Community** - For an incredible ML library
- **Radix UI** - For accessible UI components
- **TailwindCSS** - For making styling enjoyable
- **Open Source Community** - For inspiration and tools

---

## 📞 Contact & Support

- **Issues:** [GitHub Issues](https://github.com/arnavnagzirkar/QuantSight/issues)
- **Discussions:** [GitHub Discussions](https://github.com/arnavnagzirkar/QuantSight/discussions)
- **Email:** arnav@quantsight.com (for serious inquiries)

---

## 🌟 Star History

If QuantSight helps your research, please consider starring the repository! ⭐

---

**Built with ❤️ by quantitative researchers, for quantitative researchers.**

*QuantSight - See the market through a quantitative lens.*