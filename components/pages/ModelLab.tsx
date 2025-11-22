import { useState } from 'react';
import { Play, Save, Settings } from 'lucide-react';
import { ParamGridEditor } from '../ParamGridEditor';
import { FeatureImportanceChart } from '../charts/FeatureImportanceChart';

export function ModelLab() {
  const [trainWindow, setTrainWindow] = useState(252);
  const [testWindow, setTestWindow] = useState(21);
  const [maxFolds, setMaxFolds] = useState(10);
  const [running, setRunning] = useState(false);
  const [params, setParams] = useState({
    max_depth: 6,
    learning_rate: 0.1,
    n_estimators: 100,
    subsample: 0.8,
    colsample_bytree: 0.8,
  });

  const handleRun = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white mb-2">Model Lab</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure and train walk-forward XGBoost models with parameter sweeps
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Save className="w-4 h-4" />
            <span>Save Config</span>
          </button>
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
                <span>Run Model</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-gray-900 dark:text-white">Walk-Forward Config</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                Train Window (days)
              </label>
              <input
                type="number"
                value={trainWindow}
                onChange={(e) => setTrainWindow(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                Test Window (days)
              </label>
              <input
                type="number"
                value={testWindow}
                onChange={(e) => setTestWindow(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                Max Folds
              </label>
              <input
                type="number"
                value={maxFolds}
                onChange={(e) => setMaxFolds(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
              />
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-3">
                <input type="checkbox" id="persist" className="rounded" />
                <label htmlFor="persist" className="text-sm text-gray-700 dark:text-gray-300">
                  Persist final model
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="pca" className="rounded" defaultChecked />
                <label htmlFor="pca" className="text-sm text-gray-700 dark:text-gray-300">
                  Include PCA diagnostics
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-gray-900 dark:text-white mb-4">Hyperparameter Grid</h2>
            <ParamGridEditor params={params} onChange={setParams} />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-gray-900 dark:text-white mb-4">Feature Importance (Aggregated)</h2>
        <FeatureImportanceChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Best Sharpe Ratio</div>
          <div className="text-2xl text-gray-900 dark:text-white">1.85</div>
          <div className="text-sm text-teal-600 dark:text-teal-400 mt-1">Fold 7/10</div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Accuracy</div>
          <div className="text-2xl text-gray-900 dark:text-white">62.3%</div>
          <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">All folds</div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Best Params</div>
          <div className="text-sm text-gray-900 dark:text-white mt-2">
            <div>max_depth: 5</div>
            <div>learning_rate: 0.05</div>
          </div>
        </div>
      </div>
    </div>
  );
}
