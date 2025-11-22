import { useState } from 'react';
import { MessageSquare, TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';
import { SentimentTrendChart } from '../charts/SentimentTrendChart';

const mockHeadlines = [
  { 
    title: "Apple announces record quarterly earnings, beats expectations",
    source: "Bloomberg",
    date: "2024-11-20",
    sentiment: "positive",
    confidence: 0.89,
  },
  { 
    title: "Tech stocks rally as market sentiment improves",
    source: "Reuters",
    date: "2024-11-20",
    sentiment: "positive",
    confidence: 0.76,
  },
  { 
    title: "Federal Reserve signals potential rate changes ahead",
    source: "WSJ",
    date: "2024-11-19",
    sentiment: "neutral",
    confidence: 0.62,
  },
  { 
    title: "Market volatility increases amid economic uncertainty",
    source: "CNBC",
    date: "2024-11-19",
    sentiment: "negative",
    confidence: 0.81,
  },
  { 
    title: "Microsoft cloud services see strong growth in Q3",
    source: "TechCrunch",
    date: "2024-11-18",
    sentiment: "positive",
    confidence: 0.84,
  },
  { 
    title: "Analysts raise concerns over tech sector valuations",
    source: "Financial Times",
    date: "2024-11-18",
    sentiment: "negative",
    confidence: 0.73,
  },
];

export function SentimentAnalyzer() {
  const [usingFallback, setUsingFallback] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white mb-2">Sentiment Analyzer</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Headlines sentiment classification and trend analysis
          </p>
        </div>
        {usingFallback && (
          <div className="flex items-center gap-2 px-3 py-2 bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 rounded-lg text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Using VADER fallback</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Positive</span>
            <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-2xl text-gray-900 dark:text-white">42</div>
          <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">Last 7 days</div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Neutral</span>
            <Minus className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-2xl text-gray-900 dark:text-white">28</div>
          <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">Last 7 days</div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Negative</span>
            <TrendingDown className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="text-2xl text-gray-900 dark:text-white">15</div>
          <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">Last 7 days</div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Avg Confidence</span>
            <MessageSquare className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-2xl text-gray-900 dark:text-white">78%</div>
          <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">All headlines</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-gray-900 dark:text-white mb-4">Sentiment Trend</h2>
        <SentimentTrendChart />
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-gray-900 dark:text-white mb-4">Recent Headlines</h2>
        <div className="space-y-3">
          {mockHeadlines.map((headline, idx) => (
            <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 dark:text-white mb-2">{headline.title}</div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span>{headline.source}</span>
                    <span>•</span>
                    <span>{headline.date}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    headline.sentiment === 'positive' 
                      ? 'bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400'
                      : headline.sentiment === 'negative'
                      ? 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {headline.sentiment.charAt(0).toUpperCase() + headline.sentiment.slice(1)}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-teal-500"
                        style={{ width: `${headline.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 w-10 text-right">
                      {(headline.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
