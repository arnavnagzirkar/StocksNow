import { useState } from 'react';
import { Play, Download, FlaskConical } from 'lucide-react';
import { FactorTable } from '../FactorTable';
import { PCAChart } from '../charts/PCAChart';
import { CorrelationHeatmap } from '../charts/CorrelationHeatmap';

export function FactorExplorer() {
  const [showPCA, setShowPCA] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleComputeFactors = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white mb-2">Factor Explorer</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Preview and analyze alpha factors with PCA diagnostics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input 
              type="checkbox" 
              checked={showPCA}
              onChange={(e) => setShowPCA(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            Show PCA Diagnostics
          </label>
          <button
            onClick={handleComputeFactors}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Computing...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Compute Factors</span>
              </>
            )}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {showPCA && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-gray-900 dark:text-white mb-4">PCA Explained Variance</h3>
            <PCAChart />
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-gray-900 dark:text-white mb-4">Factor Correlation Heatmap</h3>
            <CorrelationHeatmap />
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900 dark:text-white">Factor Matrix</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">252 rows</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">•</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">24 columns</span>
          </div>
        </div>
        <FactorTable data={[
          { factor: 'Momentum', value: 0.65, zscore: 1.2 },
          { factor: 'Value', value: -0.32, zscore: -0.8 },
          { factor: 'Quality', value: 0.45, zscore: 0.9 }
        ]} />
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h3 className="text-gray-900 dark:text-white mb-4">Factor Definitions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FactorDefinition 
            name="momentum_5d"
            formula="(close - close.shift(5)) / close.shift(5)"
            description="5-day price momentum"
          />
          <FactorDefinition 
            name="volatility_20d"
            formula="returns.rolling(20).std() * sqrt(252)"
            description="20-day annualized volatility"
          />
          <FactorDefinition 
            name="rsi_14"
            formula="100 - (100 / (1 + RS))"
            description="14-period Relative Strength Index"
          />
          <FactorDefinition 
            name="bb_width"
            formula="(upper_band - lower_band) / middle_band"
            description="Bollinger Band width ratio"
          />
        </div>
      </div>
    </div>
  );
}

function FactorDefinition({ name, formula, description }: { name: string; formula: string; description: string }) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-teal-100 dark:bg-teal-950 rounded-lg">
          <FlaskConical className="w-4 h-4 text-teal-600 dark:text-teal-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-gray-900 dark:text-white mb-1">{name}</div>
          <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mb-2 break-all">{formula}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{description}</div>
        </div>
      </div>
    </div>
  );
}
