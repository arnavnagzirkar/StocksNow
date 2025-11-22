import { useState } from 'react';
import { Play, Settings } from 'lucide-react';
import { PortfolioWeightsChart } from '../charts/PortfolioWeightsChart';
import { AttributionChart } from '../charts/AttributionChart';

const ALLOCATION_METHODS = [
  { value: 'equal_weight', label: 'Equal Weight' },
  { value: 'risk_parity', label: 'Risk Parity' },
  { value: 'mean_variance', label: 'Mean-Variance' },
  { value: 'signal_weighted', label: 'Signal Weighted' },
  { value: 'quantile', label: 'Quantile Based' },
];

const REBALANCE_FREQ = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

export function PortfolioLab() {
  const [allocMethod, setAllocMethod] = useState('signal_weighted');
  const [rebalanceFreq, setRebalanceFreq] = useState('weekly');
  const [turnoverCost, setTurnoverCost] = useState(0.001);
  const [running, setRunning] = useState(false);

  const handleRun = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white mb-2">Portfolio Lab</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Multi-ticker portfolio construction with cross-sectional allocation engines
          </p>
        </div>
        <button
          onClick={handleRun}
          disabled={running}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {running ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Run Backtest</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Portfolio Sharpe</div>
          <div className="text-2xl text-gray-900 dark:text-white">1.92</div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Portfolio CAGR</div>
          <div className="text-2xl text-gray-900 dark:text-white">16.8%</div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Turnover</div>
          <div className="text-2xl text-gray-900 dark:text-white">12.3%</div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Turnover Cost</div>
          <div className="text-2xl text-gray-900 dark:text-white">-0.8%</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h2 className="text-gray-900 dark:text-white">Portfolio Configuration</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Allocation Method
            </label>
            <select
              value={allocMethod}
              onChange={(e) => setAllocMethod(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            >
              {ALLOCATION_METHODS.map(method => (
                <option key={method.value} value={method.value}>{method.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Rebalance Frequency
            </label>
            <select
              value={rebalanceFreq}
              onChange={(e) => setRebalanceFreq(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            >
              {REBALANCE_FREQ.map(freq => (
                <option key={freq.value} value={freq.value}>{freq.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Turnover Cost (bps)
            </label>
            <input
              type="number"
              value={turnoverCost * 10000}
              onChange={(e) => setTurnoverCost(parseFloat(e.target.value) / 10000)}
              step="0.1"
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-900 dark:text-white mb-1">Portfolio Weights Evolution</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Stacked area showing weight allocation over time</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 rounded">
              Area
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              Heatmap
            </button>
          </div>
        </div>
        <PortfolioWeightsChart />
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-900 dark:text-white mb-1">6-Month Attribution</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Contribution to portfolio returns by ticker</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 rounded">
              Absolute
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              Percentage
            </button>
          </div>
        </div>
        <AttributionChart />
      </div>
    </div>
  );
}
