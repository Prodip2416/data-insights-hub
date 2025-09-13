import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';

const Reports = () => {
  const { isDark } = useTheme();
  const { settings } = useSettings();
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState('30d');

  const reportTypes = [
    {
      id: 'sales',
      title: 'Sales Reports',
      description: 'Revenue, transactions, and sales performance analytics',
      icon: '💰',
      color: 'green',
      metrics: {
        totalRevenue: 125000,
        transactions: 1250,
        avgOrderValue: 100,
        growth: 12.5
      }
    },
    {
      id: 'users',
      title: 'User Analytics',
      description: 'User behavior, engagement, and demographic insights',
      icon: '👥',
      color: 'blue',
      metrics: {
        totalUsers: 892,
        activeUsers: 456,
        newUsers: 78,
        retention: 85.2
      }
    },
    {
      id: 'performance',
      title: 'Performance Metrics',
      description: 'System performance, response times, and uptime',
      icon: '⚡',
      color: 'purple',
      metrics: {
        uptime: 99.9,
        avgResponseTime: 1.2,
        errorRate: 0.1,
        throughput: 1250
      }
    },
    {
      id: 'financial',
      title: 'Financial Summary',
      description: 'Revenue, costs, profit margins, and financial health',
      icon: '📊',
      color: 'yellow',
      metrics: {
        revenue: 125000,
        costs: 75000,
        profit: 50000,
        margin: 40
      }
    },
    {
      id: 'marketing',
      title: 'Marketing ROI',
      description: 'Campaign performance, conversion rates, and ROI analysis',
      icon: '📈',
      color: 'indigo',
      metrics: {
        campaigns: 12,
        conversionRate: 3.2,
        roi: 250,
        costPerLead: 15
      }
    },
    {
      id: 'custom',
      title: 'Custom Reports',
      description: 'Create and manage your own custom report templates',
      icon: '📋',
      color: 'pink',
      metrics: {
        templates: 8,
        scheduled: 3,
        lastGenerated: '2 hours ago',
        nextRun: 'Tomorrow 9:00 AM'
      }
    }
  ];

  const dateRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const generateReport = (reportId) => {
    setSelectedReport(reportId);
    // Simulate report generation
    setTimeout(() => {
      setSelectedReport(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Reports Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Generate and analyze comprehensive reports for your business
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Range:</span>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              Export All
            </button>
          </div>
        </div>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {reportTypes.map((report) => (
          <div
            key={report.id}
            className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
              selectedReport === report.id ? 'ring-2 ring-indigo-500' : ''
            }`}
            onClick={() => generateReport(report.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${report.color}-100 dark:bg-${report.color}-900/20`}>
                <span className="text-2xl">{report.icon}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Last updated</div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">2 hours ago</div>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {report.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {report.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              {Object.entries(report.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {typeof value === 'number' ? 
                      (key.includes('Rate') || key.includes('margin') ? `${value}%` :
                       key.includes('Revenue') || key.includes('costs') || key.includes('profit') ? `$${value.toLocaleString()}` :
                       value.toLocaleString()) : value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                selectedReport === report.id
                  ? 'bg-green-500 text-white'
                  : `bg-${report.color}-500 hover:bg-${report.color}-600 text-white`
              }`}
              disabled={selectedReport === report.id}
            >
              {selectedReport === report.id ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Generating...
                </div>
              ) : (
                'Generate Report'
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 hover:scale-105">
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Schedule Report</div>
            </div>
          </button>
          
          <button className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border-2 border-transparent hover:border-green-200 dark:hover:border-green-800 transition-all duration-200 hover:scale-105">
            <div className="text-center">
              <div className="text-2xl mb-2">📧</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Report</div>
            </div>
          </button>
          
          <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-200 hover:scale-105">
            <div className="text-center">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Compare Periods</div>
            </div>
          </button>
          
          <button className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border-2 border-transparent hover:border-orange-200 dark:hover:border-orange-800 transition-all duration-200 hover:scale-105">
            <div className="text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Report Settings</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
