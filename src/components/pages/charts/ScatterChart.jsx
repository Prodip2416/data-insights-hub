import React, { useState, useRef } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';
import ChartExportButton from '../../common/ChartExportButton';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ScatterChart = () => {
  const fileInputRef = useRef(null);
  const chartRef = useRef(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();
  const { settings, getColorScheme, formatNumber, getAnimationDuration } = useSettings();

  // Sample data for demonstration
  const sampleData = {
    datasets: [
      {
        label: 'Sales vs Marketing Spend',
        data: [
          { x: 1000, y: 5000 },
          { x: 1500, y: 7500 },
          { x: 2000, y: 12000 },
          { x: 2500, y: 15000 },
          { x: 3000, y: 18000 },
          { x: 3500, y: 22000 },
          { x: 4000, y: 25000 },
          { x: 4500, y: 28000 },
          { x: 5000, y: 32000 },
          { x: 5500, y: 35000 },
        ],
        backgroundColor: getColorScheme(2)[0].replace('1)', '0.6)'),
        borderColor: getColorScheme(2)[0],
        pointRadius: 8,
        pointHoverRadius: 10,
      },
      {
        label: 'Profit vs Marketing Spend',
        data: [
          { x: 1000, y: 2000 },
          { x: 1500, y: 3000 },
          { x: 2000, y: 5000 },
          { x: 2500, y: 6000 },
          { x: 3000, y: 8000 },
          { x: 3500, y: 10000 },
          { x: 4000, y: 12000 },
          { x: 4500, y: 14000 },
          { x: 5000, y: 16000 },
          { x: 5500, y: 18000 },
        ],
        backgroundColor: getColorScheme(2)[1].replace('1)', '0.6)'),
        borderColor: getColorScheme(2)[1],
        pointRadius: 8,
        pointHoverRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: settings.showLegend,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          color: isDark ? '#d1d5db' : '#374151',
        },
      },
      title: {
        display: true,
        text: 'Marketing Spend vs Revenue & Profit',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return context[0].dataset.label;
          },
          label: function (context) {
            return `Marketing: ${formatNumber(context.parsed.x)}, Revenue: ${formatNumber(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Marketing Spend ($)',
        },
        grid: {
          display: settings.showGrid,
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? '#d1d5db' : '#6b7280',
          callback: function (value) {
            return formatNumber(value);
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Revenue ($)',
        },
        grid: {
          display: settings.showGrid,
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? '#d1d5db' : '#6b7280',
          callback: function (value) {
            return formatNumber(value);
          },
        },
      },
    },
    animation: {
      duration: getAnimationDuration(),
      easing: 'easeInOutQuart',
    },
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);

      // Validate data structure
      if (!jsonData.datasets || !Array.isArray(jsonData.datasets)) {
        throw new Error(
          'Invalid data format. Expected Chart.js format with datasets array.'
        );
      }

      setData(jsonData);
    } catch (err) {
      setError('Error parsing file: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    setData(sampleData);
    setError(null);
  };

  const downloadSampleData = () => {
    const dataStr = JSON.stringify(sampleData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'scatter-chart-sample-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetData = () => {
    setData(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <svg
              className="w-8 h-8 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Scatter Chart
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Explore relationships between two variables with interactive scatter
            plots.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={loadSampleData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Load Sample Data
            </button>

            <button
              onClick={downloadSampleData}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Sample
            </button>

            <label className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Upload Data
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={resetData}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reset
            </button>
          </div>

          {isLoading && (
            <div className="mt-4 text-blue-600 dark:text-blue-400">
              Loading data...
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {/* Chart Header with Export Button */}
          {data && (
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Performance vs Quality Analysis
              </h3>
              <ChartExportButton 
                chartRef={chartRef}
                chartType="scatter"
                filename="scatter-chart"
                className="ml-4"
              />
            </div>
          )}
          
          <div className="h-96" ref={chartRef}>
            {data ? (
              <Scatter 
                key={`${settings.colorScheme}-${settings.animationSpeed}-${settings.showGrid}-${settings.showLegend}-${isDark}`}
                data={data} 
                options={options} 
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                  <p className="text-lg">No data loaded</p>
                  <p className="text-sm">
                    Upload a JSON file or load sample data to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Format Info */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Expected Data Format
          </h3>
          <pre className="text-sm text-blue-800 dark:text-blue-200 overflow-x-auto">
            {`{
  "datasets": [
    {
      "label": "Sales vs Marketing",
      "data": [
        { "x": 1000, "y": 5000 },
        { "x": 1500, "y": 7500 },
        { "x": 2000, "y": 12000 }
      ],
      "backgroundColor": "rgba(59, 130, 246, 0.6)",
      "borderColor": "rgb(59, 130, 246)",
      "pointRadius": 8
    }
  ]
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ScatterChart;
