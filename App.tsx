import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { Layout } from './components/Layout';
import { Toaster } from './components/ui/sonner';
import { Dashboard } from './components/pages/Dashboard';
import { TickerIntelligence } from './components/pages/TickerIntelligence';
import { FactorExplorer } from './components/pages/FactorExplorer';
import { ModelLab } from './components/pages/ModelLab';
import { ExperimentManager } from './components/pages/ExperimentManager';
import { SignalDiagnostics } from './components/pages/SignalDiagnostics';
import { StrategyBacktest } from './components/pages/StrategyBacktest';
import { PortfolioLab } from './components/pages/PortfolioLab';
import { RiskPerformance } from './components/pages/RiskPerformance';
import { SentimentAnalyzer } from './components/pages/SentimentAnalyzer';
import { Settings } from './components/pages/Settings';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ticker-intelligence" element={<TickerIntelligence />} />
            <Route path="/factor-explorer" element={<FactorExplorer />} />
            <Route path="/model-lab" element={<ModelLab />} />
            <Route path="/experiments" element={<ExperimentManager />} />
            <Route path="/signal-diagnostics" element={<SignalDiagnostics />} />
            <Route path="/strategy-backtest" element={<StrategyBacktest />} />
            <Route path="/portfolio-lab" element={<PortfolioLab />} />
            <Route path="/risk-performance" element={<RiskPerformance />} />
            <Route path="/sentiment" element={<SentimentAnalyzer />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </Router>
    </ThemeProvider>
  );
}