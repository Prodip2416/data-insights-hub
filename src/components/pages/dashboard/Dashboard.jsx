import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';
import MetricCard from './MetricCard';
import { ChartJSLines, ChartJSPie, D3BarChart } from './charts';
import {
  performanceMetrics,
  salesData,
  userEngagementData,
  geographicData,
} from '../../../data/sampleData';

const Dashboard = () => {
  const { isDark } = useTheme();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Enhanced data summary with more metrics
  const dataSummary = {
    totalRecords: 1250,
    dateRange: 'Jan 2024 - Dec 2024',
    dataSources: 3,
    lastUpdated: '2 hours ago',
    trendingUp: true,
    topCategory: 'Sales',
    highestValue: 2500,
    avgResponseTime: '1.2s',
    uptime: '99.9%',
    errorRate: '0.1%',
    activeUsers: 892,
    dataProcessed: '2.4TB',
    chartsGenerated: 47,
    insightsFound: 23,
  };

  // Real-time metrics data
  const realTimeMetrics = {
    revenue: { value: 125000, change: 12.5, trend: 'up' },
    users: { value: 892, change: 8.2, trend: 'up' },
    conversion: { value: 3.2, change: -2.1, trend: 'down' },
    satisfaction: { value: 4.8, change: 0.3, trend: 'up' },
    performance: { value: 98.5, change: 1.2, trend: 'up' },
    errors: { value: 0.1, change: -0.05, trend: 'down' }
  };

  // Sample data for different chart types
  const heatmapData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Activity',
      data: [
        [0, 1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6, 7],
        [2, 3, 4, 5, 6, 7, 8],
        [3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 10],
        [5, 6, 7, 8, 9, 10, 11],
        [6, 7, 8, 9, 10, 11, 12]
      ],
      backgroundColor: 'rgba(99, 102, 241, 0.6)',
      borderColor: 'rgba(99, 102, 241, 1)',
    }]
  };

  const scatterData = {
    datasets: [{
      label: 'Performance vs Quality',
      data: [
        { x: 85, y: 92 },
        { x: 78, y: 88 },
        { x: 92, y: 95 },
        { x: 88, y: 90 },
        { x: 95, y: 98 },
        { x: 82, y: 85 },
        { x: 90, y: 93 },
        { x: 87, y: 89 }
      ],
      backgroundColor: 'rgba(16, 185, 129, 0.6)',
      borderColor: 'rgba(16, 185, 129, 1)',
      borderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8
    }]
  };

  const treeData = {
    name: 'DataHub',
    children: [
      {
        name: 'Analytics',
        children: [
          { name: 'Sales', value: 4000 },
          { name: 'Marketing', value: 3000 },
          { name: 'Support', value: 2000 }
        ]
      },
      {
        name: 'Engineering',
        children: [
          { name: 'Frontend', value: 2500 },
          { name: 'Backend', value: 3500 },
          { name: 'DevOps', value: 1500 }
        ]
      }
    ]
  };

  // Time range options
  const timeRanges = [
    { value: '1d', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  // Chart types for quick access
  const chartTypes = [
    { name: 'Line Chart', icon: '📈', route: '/line-chart', color: 'blue' },
    { name: 'Bar Chart', icon: '📊', route: '/bar-chart', color: 'green' },
    { name: 'Pie Chart', icon: '🥧', route: '/pie-chart', color: 'purple' },
    { name: 'Area Chart', icon: '📈', route: '/area-chart', color: 'indigo' },
    { name: 'Scatter Plot', icon: '⚪', route: '/scatter-chart', color: 'pink' },
    { name: 'Heatmap', icon: '🔥', route: '/heatmap', color: 'orange' },
    { name: 'Tree Chart', icon: '🌳', route: '/tree-chart', color: 'teal' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Loading Dashboard...</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Preparing your data insights</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                DataHub Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
                Real-time analytics and insights platform
              </p>
            </div>
            
            {/* Time Range Selector */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Range:</span>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {timeRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {Object.entries(realTimeMetrics).map(([key, metric]) => (
            <div
              key={key}
              className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                hoveredCard === key ? 'ring-2 ring-indigo-500' : ''
              }`}
              onMouseEnter={() => setHoveredCard(key)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  key === 'revenue' ? 'bg-green-100 dark:bg-green-900/20' :
                  key === 'users' ? 'bg-blue-100 dark:bg-blue-900/20' :
                  key === 'conversion' ? 'bg-purple-100 dark:bg-purple-900/20' :
                  key === 'satisfaction' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                  key === 'performance' ? 'bg-indigo-100 dark:bg-indigo-900/20' :
                  'bg-red-100 dark:bg-red-900/20'
                }`}>
                  {key === 'revenue' && <span className="text-2xl">💰</span>}
                  {key === 'users' && <span className="text-2xl">👥</span>}
                  {key === 'conversion' && <span className="text-2xl">📈</span>}
                  {key === 'satisfaction' && <span className="text-2xl">😊</span>}
                  {key === 'performance' && <span className="text-2xl">⚡</span>}
                  {key === 'errors' && <span className="text-2xl">⚠️</span>}
                </div>
                <div className={`flex items-center space-x-1 ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {metric.trend === 'up' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                    )}
                  </svg>
                  <span className="text-sm font-medium">{Math.abs(metric.change)}%</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {key === 'revenue' ? `$${(metric.value / 1000).toFixed(0)}K` :
                   key === 'users' ? metric.value.toLocaleString() :
                   key === 'conversion' ? `${metric.value}%` :
                   key === 'satisfaction' ? `${metric.value}/5` :
                   key === 'performance' ? `${metric.value}%` :
                   `${metric.value}%`}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'analytics', label: 'Analytics', icon: '📈' },
              { id: 'insights', label: 'Insights', icon: '💡' },
              { id: 'reports', label: 'Reports', icon: '📋' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-indigo-500 text-white shadow-lg transform scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => navigate('/line-chart')}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Sales & Profit Trends</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Last 30 days</span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
                <ChartJSLines data={salesData} title="Monthly Sales and Profit Analysis" />
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => navigate('/pie-chart')}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">User Engagement</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">By device</span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
                <ChartJSPie data={userEngagementData} title="User Engagement by Device" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => navigate('/bar-chart')}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Geographic Distribution</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">By region</span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
                <D3BarChart data={geographicData} title="Geographic Distribution" />
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Quick Actions</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Tools</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {chartTypes.slice(0, 4).map((chart, index) => (
                    <button
                      key={index}
                      onClick={() => navigate(chart.route)}
                      className={`p-4 rounded-xl border-2 border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 hover:scale-105 bg-gradient-to-br from-${chart.color}-50 to-${chart.color}-100 dark:from-${chart.color}-900/20 dark:to-${chart.color}-800/20`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">{chart.icon}</div>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{chart.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => navigate('/heatmap')}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Activity Heatmap</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Weekly view</span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔥</div>
                    <p className="text-gray-600 dark:text-gray-400">Heatmap Visualization</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Click to view full chart</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => navigate('/scatter-chart')}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Performance vs Quality</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Correlation</span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl">
                  <div className="text-center">
                    <div className="text-4xl mb-2">⚪</div>
                    <p className="text-gray-600 dark:text-gray-400">Scatter Plot Analysis</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Click to view full chart</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => navigate('/area-chart')}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Area Chart Analysis</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Trend analysis</span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <p className="text-gray-600 dark:text-gray-400">Area Chart Visualization</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Click to view full chart</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => navigate('/tree-chart')}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Data Hierarchy</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Tree structure</span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌳</div>
                    <p className="text-gray-600 dark:text-gray-400">Tree Chart Visualization</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Click to view full chart</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Types Grid */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Available Chart Types</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {chartTypes.map((chart, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(chart.route)}
                    className={`p-4 rounded-xl border-2 border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 hover:scale-105 bg-gradient-to-br from-${chart.color}-50 to-${chart.color}-100 dark:from-${chart.color}-900/20 dark:to-${chart.color}-800/20 group`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">{chart.icon}</div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">{chart.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Report Generation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Sales Report', description: 'Monthly sales performance', icon: '📊', color: 'blue' },
                  { title: 'User Analytics', description: 'User behavior and engagement', icon: '👥', color: 'green' },
                  { title: 'Performance Metrics', description: 'System and app performance', icon: '⚡', color: 'purple' },
                  { title: 'Financial Summary', description: 'Revenue and cost analysis', icon: '💰', color: 'yellow' },
                  { title: 'Marketing ROI', description: 'Marketing campaign effectiveness', icon: '📈', color: 'indigo' },
                  { title: 'Custom Report', description: 'Create your own report', icon: '📋', color: 'pink' }
                ].map((report, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border-2 border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 hover:scale-105 cursor-pointer bg-gradient-to-br from-${report.color}-50 to-${report.color}-100 dark:from-${report.color}-900/20 dark:to-${report.color}-800/20`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{report.icon}</div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{report.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{report.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;