// import { TrendingUp, BarChart3 } from 'lucide-react';
import { SignalDecayChart } from '../charts/SignalDecayChart';
import { QuantileReturnsChart } from '../charts/QuantileReturnsChart';
import { LongShortEquityChart } from '../charts/LongShortEquityChart';

export function SignalDiagnostics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Signal Diagnostics</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze signal decay and quantile-based forward returns
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg IC (Pearson)</div>
          <div className="text-2xl text-gray-900 dark:text-white">0.142</div>
          <div className="text-sm text-teal-600 dark:text-teal-400 mt-1">5-day horizon</div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg IC (Spearman)</div>
          <div className="text-2xl text-gray-900 dark:text-white">0.158</div>
          <div className="text-sm text-teal-600 dark:text-teal-400 mt-1">5-day horizon</div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Long/Short Spread</div>
          <div className="text-2xl text-gray-900 dark:text-white">+8.3%</div>
          <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">Q5 vs Q1</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-gray-900 dark:text-white mb-1">Signal Decay IC</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Information Coefficient vs forward return horizons
          </p>
        </div>
        <SignalDecayChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-gray-900 dark:text-white mb-1">Quantile Forward Returns</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mean returns by signal strength quintile
            </p>
          </div>
          <QuantileReturnsChart />
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-gray-900 dark:text-white mb-1">Long/Short Equity Curve</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Q5 (top quintile) vs Q1 (bottom quintile)
            </p>
          </div>
          <LongShortEquityChart />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-gray-900 dark:text-white mb-4">Quantile Statistics</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Quantile</th>
                <th className="text-right py-3 px-4 text-gray-600 dark:text-gray-400">Mean Return (1d)</th>
                <th className="text-right py-3 px-4 text-gray-600 dark:text-gray-400">Mean Return (5d)</th>
                <th className="text-right py-3 px-4 text-gray-600 dark:text-gray-400">Mean Return (20d)</th>
                <th className="text-right py-3 px-4 text-gray-600 dark:text-gray-400">Hit Rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                { q: 'Q5 (Top)', ret1d: 0.082, ret5d: 0.41, ret20d: 1.85, hit: 0.58 },
                { q: 'Q4', ret1d: 0.045, ret5d: 0.23, ret20d: 1.12, hit: 0.54 },
                { q: 'Q3', ret1d: 0.018, ret5d: 0.09, ret20d: 0.45, hit: 0.51 },
                { q: 'Q2', ret1d: -0.012, ret5d: -0.05, ret20d: -0.28, hit: 0.48 },
                { q: 'Q1 (Bottom)', ret1d: -0.065, ret5d: -0.32, ret20d: -1.42, hit: 0.42 },
              ].map((row) => (
                <tr key={row.q} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{row.q}</td>
                  <td className={`text-right py-3 px-4 ${row.ret1d >= 0 ? 'text-teal-600 dark:text-teal-400' : 'text-orange-600 dark:text-orange-400'}`}>
                    {(row.ret1d * 100).toFixed(2)}%
                  </td>
                  <td className={`text-right py-3 px-4 ${row.ret5d >= 0 ? 'text-teal-600 dark:text-teal-400' : 'text-orange-600 dark:text-orange-400'}`}>
                    {(row.ret5d * 100).toFixed(2)}%
                  </td>
                  <td className={`text-right py-3 px-4 ${row.ret20d >= 0 ? 'text-teal-600 dark:text-teal-400' : 'text-orange-600 dark:text-orange-400'}`}>
                    {(row.ret20d * 100).toFixed(2)}%
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">
                    {(row.hit * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
