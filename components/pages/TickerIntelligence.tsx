import { TrendingUp, DollarSign, Activity, BarChart3 } from 'lucide-react';
import { EquityCurveChart } from '../charts/EquityCurveChart';
import { FactorTable } from '../FactorTable';

export function TickerIntelligence() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Ticker Intelligence</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Deep dive into ticker price action, sentiment, and factor snapshot
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Price</div>
          <div className="text-2xl text-gray-900 dark:text-white">$178.42</div>
          <div className="text-sm text-teal-600 dark:text-teal-400 mt-1">+2.4%</div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Model Signal</div>
          <div className="text-2xl text-gray-900 dark:text-white">LONG</div>
          <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">78% confidence</div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">20D Volatility</div>
          <div className="text-2xl text-gray-900 dark:text-white">24.3%</div>
          <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">Annualized</div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sentiment</div>
          <div className="text-2xl text-gray-900 dark:text-white">Positive</div>
          <div className="text-sm text-teal-600 dark:text-teal-400 mt-1">42 headlines</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-gray-900 dark:text-white mb-4">Price Chart (1Y)</h2>
        <EquityCurveChart />
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-gray-900 dark:text-white mb-4">Factor Snapshot (Last 20 Days)</h2>
        <FactorTable />
      </div>
    </div>
  );
}
