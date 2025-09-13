import React, { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';
import ChartExportButton from '../../common/ChartExportButton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = () => {
  const fileInputRef = useRef(null);
  const chartRef = useRef(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();
  const { settings, getColorScheme, getLineChartColors, formatNumber } = useSettings();

  // Sample data for demonstration
  const lineColors = getLineChartColors(2);
  const sampleData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Sales',
        data: [
          12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000,
          38000, 45000,
        ],
        ...lineColors[0],
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Profit',
        data: [
          8000, 12000, 10000, 18000, 15000, 22000, 20000, 25000, 23000, 30000,
          28000, 35000,
        ],
        ...lineColors[1],
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: settings.animationSpeed === 'slow' ? 2000 : settings.animationSpeed === 'fast' ? 500 : 1000,
    },
    plugins: {
      legend: {
        display: settings.showLegend,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          color: isDark ? '#ffffff' : '#374151',
        },
      },
      title: {
        display: true,
        text: 'Sales and Profit Trends',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: isDark ? '#ffffff' : '#374151',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: isDark ? '#ffffff' : '#374151',
        bodyColor: isDark ? '#ffffff' : '#374151',
        borderColor: isDark ? '#4B5563' : '#E5E7EB',
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${formatNumber(value)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: settings.showGrid,
          color: isDark ? '#374151' : '#f3f4f6',
        },
        ticks: {
          color: isDark ? '#d1d5db' : '#6b7280',
        },
      },
      y: {
        grid: {
          display: settings.showGrid,
          color: isDark ? '#374151' : '#f3f4f6',
        },
        ticks: {
          color: isDark ? '#d1d5db' : '#6b7280',
          callback: function (value) {
            return formatNumber(value);
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  const processDataWithColors = (rawData) => {
    if (!rawData.labels || !rawData.datasets) {
      return rawData;
    }

    const datasetCount = rawData.datasets.length;
    const lineColors = getLineChartColors(datasetCount);
    
    return {
      ...rawData,
      datasets: rawData.datasets.map((dataset, index) => ({
        ...dataset,
        ...lineColors[index],
        fill: dataset.fill !== undefined ? dataset.fill : true,
        tension: dataset.tension !== undefined ? dataset.tension : 0.4,
      }))
    };
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
      if (!jsonData.labels || !jsonData.datasets) {
        throw new Error(
          'Invalid data format. Expected Chart.js format with labels and datasets.'
        );
      }

      // Process data with enhanced colors
      const processedData = processDataWithColors(jsonData);
      setData(processedData);
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
    link.download = 'line-chart-sample-data.json';
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
              className="w-8 h-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Line Chart
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Visualize trends and patterns over time with interactive line
            charts.
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
                Sales and Profit Trends
              </h3>
              <ChartExportButton 
                chartRef={chartRef}
                chartType="line"
                filename="line-chart"
                className="ml-4"
              />
            </div>
          )}
          
          <div className="h-96" ref={chartRef}>
            {data ? (
              <Line data={data} options={options} key={`${settings.colorScheme}-${settings.animationSpeed}-${settings.showLegend}-${settings.showGrid}`} />
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
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
  "labels": ["Jan", "Feb", "Mar", "Apr"],
  "datasets": [
    {
      "label": "Sales",
      "data": [12000, 19000, 15000, 25000],
      "borderColor": "rgb(59, 130, 246)",
      "backgroundColor": "rgba(59, 130, 246, 0.1)",
      "fill": true,
      "tension": 0.4
    }
  ]
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
