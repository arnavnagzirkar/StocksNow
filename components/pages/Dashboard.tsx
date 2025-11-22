import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Zap } from 'lucide-react';
import { MetricCard } from '../MetricCard';
import { EquityCurveChart } from '../charts/EquityCurveChart';
import { PerformanceTable } from '../PerformanceTable';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Overview of your quantitative research and portfolio performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Portfolio Value"
          value="$1,245,678"
          change="+12.4%"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Sharpe Ratio"
          value="1.82"
          subtitle="Annual"
          icon={TrendingUp}
        />
        <MetricCard
          title="Max Drawdown"
          value="-8.3%"
          changeType="negative"
          icon={TrendingDown}
        />
        <MetricCard
          title="Active Models"
          value="3"
          subtitle="Running"
          icon={Activity}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900 dark:text-white mb-1">Portfolio Equity Curve</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Strategy vs Buy & Hold Benchmark</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
                  <span className="text-gray-700 dark:text-gray-300">Strategy</span>
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                  <span className="text-gray-700 dark:text-gray-300">Benchmark</span>
                </span>
              </div>
            </div>
            <EquityCurveChart />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-gray-900 dark:text-white mb-4">Key Metrics</h3>
            <div className="space-y-4">
              <MetricRow label="CAGR" value="18.5%" />
              <MetricRow label="Annual Vol" value="14.2%" />
              <MetricRow label="Sortino" value="2.41" />
              <MetricRow label="Alpha" value="4.8%" />
              <MetricRow label="Beta" value="0.78" />
              <MetricRow label="Information Ratio" value="1.23" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-gray-900 dark:text-white mb-4">Recent Signals</h3>
            <div className="space-y-3">
              <SignalItem ticker="AAPL" signal="LONG" confidence={0.78} />
              <SignalItem ticker="MSFT" signal="LONG" confidence={0.65} />
              <SignalItem ticker="GOOGL" signal="SHORT" confidence={0.52} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-gray-900 dark:text-white mb-4">Top Holdings Performance</h2>
        <PerformanceTable />
      </div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <span className="text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}

function SignalItem({ ticker, signal, confidence }: { ticker: string; signal: string; confidence: number }) {
  const isLong = signal === 'LONG';
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-gray-900 dark:text-white">{ticker}</span>
        <span className={`px-2 py-0.5 rounded text-xs ${
          isLong 
            ? 'bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400' 
            : 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400'
        }`}>
          {signal}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-teal-500"
            style={{ width: `${confidence * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
          {(confidence * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );
}
