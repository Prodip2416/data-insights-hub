import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';

const UserAnalytics = () => {
  const { isDark } = useTheme();
  const { settings } = useSettings();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const userData = {
    totalUsers: 892,
    activeUsers: 456,
    newUsers: 78,
    retentionRate: 85.2,
    userSegments: [
      { name: 'New Users', count: 78, percentage: 8.7, color: 'blue' },
      { name: 'Active Users', count: 456, percentage: 51.1, color: 'green' },
      { name: 'Returning Users', count: 234, percentage: 26.2, color: 'purple' },
      { name: 'Dormant Users', count: 124, percentage: 13.9, color: 'gray' }
    ],
    deviceUsage: [
      { device: 'Desktop', users: 456, percentage: 51.1 },
      { device: 'Mobile', users: 312, percentage: 35.0 },
      { device: 'Tablet', users: 124, percentage: 13.9 }
    ],
    userActivity: [
      { hour: '00:00', users: 45 },
      { hour: '02:00', users: 23 },
      { hour: '04:00', users: 12 },
      { hour: '06:00', users: 34 },
      { hour: '08:00', users: 156 },
      { hour: '10:00', users: 234 },
      { hour: '12:00', users: 189 },
      { hour: '14:00', users: 267 },
      { hour: '16:00', users: 298 },
      { hour: '18:00', users: 245 },
      { hour: '20:00', users: 178 },
      { hour: '22:00', users: 123 }
    ],
    topPages: [
      { page: '/dashboard', views: 1250, users: 456 },
      { page: '/reports', views: 890, users: 234 },
      { page: '/settings', views: 567, users: 189 },
      { page: '/help', views: 345, users: 123 },
      { page: '/charts', views: 234, users: 78 }
    ]
  };

  const periods = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              User Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              User behavior, engagement, and demographic insights
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
            
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
              <div className="text-sm font-medium text-blue-600">{userData.totalUsers}</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {userData.totalUsers.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Active</div>
              <div className="text-sm font-medium text-green-600">{userData.activeUsers}</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {userData.activeUsers.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <span className="text-2xl">🆕</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">This Month</div>
              <div className="text-sm font-medium text-purple-600">{userData.newUsers}</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {userData.newUsers.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">New Users</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Retention</div>
              <div className="text-sm font-medium text-orange-600">{userData.retentionRate}%</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {userData.retentionRate}%
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Retention Rate</p>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* User Segments */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">User Segments</h3>
          <div className="space-y-4">
            {userData.userSegments.map((segment, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{segment.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{segment.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`bg-gradient-to-r from-${segment.color}-400 to-${segment.color}-500 h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${segment.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                  {segment.count.toLocaleString()} users
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Usage */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Device Usage</h3>
          <div className="space-y-4">
            {userData.deviceUsage.map((device, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <span className="text-sm">📱</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{device.device}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{device.users} users</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{device.percentage}%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">of total</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Activity Heatmap */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">User Activity by Hour</h3>
        <div className="grid grid-cols-12 gap-2">
          {userData.userActivity.map((activity, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{activity.hour}</div>
              <div 
                className="bg-gradient-to-t from-blue-400 to-cyan-500 rounded-lg p-2 mb-1" 
                style={{ height: `${(activity.users / 300) * 60}px` }}
              >
                <div className="text-white text-xs font-bold">{activity.users}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Top Pages</h3>
        <div className="space-y-4">
          {userData.topPages.map((page, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{page.page}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{page.users} unique users</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900 dark:text-gray-100">{page.views.toLocaleString()}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">page views</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
