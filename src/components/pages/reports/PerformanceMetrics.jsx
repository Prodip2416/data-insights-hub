import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';

const PerformanceMetrics = () => {
  const { isDark } = useTheme();
  const { settings } = useSettings();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const performanceData = {
    uptime: 99.9,
    avgResponseTime: 1.2,
    errorRate: 0.1,
    throughput: 1250,
    systemMetrics: [
      { name: 'CPU Usage', value: 45, status: 'good', threshold: 80 },
      { name: 'Memory Usage', value: 62, status: 'good', threshold: 85 },
      { name: 'Disk Usage', value: 38, status: 'good', threshold: 90 },
      { name: 'Network I/O', value: 23, status: 'excellent', threshold: 70 }
    ],
    responseTimeHistory: [
      { time: '00:00', responseTime: 1.1 },
      { time: '04:00', responseTime: 0.9 },
      { time: '08:00', responseTime: 1.3 },
      { time: '12:00', responseTime: 1.5 },
      { time: '16:00', responseTime: 1.2 },
      { time: '20:00', responseTime: 1.0 }
    ],
    errorTypes: [
      { type: '404 Not Found', count: 12, percentage: 40 },
      { type: '500 Server Error', count: 8, percentage: 27 },
      { type: 'Timeout', count: 6, percentage: 20 },
      { type: 'Database Error', count: 4, percentage: 13 }
    ],
    apiEndpoints: [
      { endpoint: '/api/dashboard', avgTime: 0.8, requests: 1250, success: 99.2 },
      { endpoint: '/api/reports', avgTime: 1.2, requests: 890, success: 98.8 },
      { endpoint: '/api/charts', avgTime: 1.5, requests: 567, success: 99.5 },
      { endpoint: '/api/settings', avgTime: 0.6, requests: 234, success: 100 },
      { endpoint: '/api/auth', avgTime: 0.9, requests: 456, success: 99.8 }
    ]
  };

  const periods = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'good': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Performance Metrics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              System performance, response times, and uptime monitoring
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
            
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Uptime</div>
              <div className="text-sm font-medium text-green-600">{performanceData.uptime}%</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {performanceData.uptime}%
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">System Uptime</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <span className="text-2xl">⏱️</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Avg Time</div>
              <div className="text-sm font-medium text-blue-600">{performanceData.avgResponseTime}s</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {performanceData.avgResponseTime}s
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Response Time</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Error Rate</div>
              <div className="text-sm font-medium text-red-600">{performanceData.errorRate}%</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {performanceData.errorRate}%
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Error Rate</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Throughput</div>
              <div className="text-sm font-medium text-purple-600">{performanceData.throughput}</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {performanceData.throughput.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Requests/min</p>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">System Resources</h3>
          <div className="space-y-4">
            {performanceData.systemMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(metric.status)}`}>
                    {metric.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      metric.value < 50 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                      metric.value < 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                      metric.value < 90 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                      'bg-gradient-to-r from-red-400 to-red-500'
                    }`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{metric.value}%</span>
                  <span>Threshold: {metric.threshold}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Response Time Trend</h3>
          <div className="grid grid-cols-6 gap-2">
            {performanceData.responseTimeHistory.map((data, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{data.time}</div>
                <div 
                  className="bg-gradient-to-t from-purple-400 to-indigo-500 rounded-lg p-2 mb-1" 
                  style={{ height: `${(data.responseTime / 2) * 60}px` }}
                >
                  <div className="text-white text-xs font-bold">{data.responseTime}s</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Error Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Error Types</h3>
          <div className="space-y-4">
            {performanceData.errorTypes.map((error, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{error.type}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{error.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${error.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                  {error.count} errors
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">API Endpoints Performance</h3>
          <div className="space-y-4">
            {performanceData.apiEndpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">#{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{endpoint.endpoint}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{endpoint.requests} requests</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{endpoint.avgTime}s</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{endpoint.success}% success</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
