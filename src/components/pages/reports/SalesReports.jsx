import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';

const SalesReports = () => {
  const { isDark } = useTheme();
  const { settings } = useSettings();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const salesData = {
    totalRevenue: 125000,
    totalOrders: 1250,
    averageOrderValue: 100,
    growthRate: 12.5,
    topProducts: [
      { name: 'Product A', sales: 25000, orders: 250 },
      { name: 'Product B', sales: 20000, orders: 200 },
      { name: 'Product C', sales: 15000, orders: 150 },
      { name: 'Product D', sales: 12000, orders: 120 },
      { name: 'Product E', sales: 10000, orders: 100 }
    ],
    monthlyTrend: [
      { month: 'Jan', revenue: 10000, orders: 100 },
      { month: 'Feb', revenue: 12000, orders: 120 },
      { month: 'Mar', revenue: 15000, orders: 150 },
      { month: 'Apr', revenue: 18000, orders: 180 },
      { month: 'May', revenue: 20000, orders: 200 },
      { month: 'Jun', revenue: 25000, orders: 250 }
    ],
    regions: [
      { name: 'North America', revenue: 50000, percentage: 40 },
      { name: 'Europe', revenue: 37500, percentage: 30 },
      { name: 'Asia', revenue: 25000, percentage: 20 },
      { name: 'Others', revenue: 12500, percentage: 10 }
    ]
  };

  const periods = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Sales Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Comprehensive sales analytics and performance metrics
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
            
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
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
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Growth</div>
              <div className="text-sm font-medium text-green-600">+{salesData.growthRate}%</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            ${salesData.totalRevenue.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Orders</div>
              <div className="text-sm font-medium text-blue-600">{salesData.totalOrders}</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {salesData.totalOrders.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">AOV</div>
              <div className="text-sm font-medium text-purple-600">${salesData.averageOrderValue}</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            ${salesData.averageOrderValue}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Average Order Value</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Growth</div>
              <div className="text-sm font-medium text-orange-600">+{salesData.growthRate}%</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {salesData.growthRate}%
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</p>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Products */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Top Products</h3>
          <div className="space-y-4">
            {salesData.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{product.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{product.orders} orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">${product.sales.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {((product.sales / salesData.totalRevenue) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Regional Distribution</h3>
          <div className="space-y-4">
            {salesData.regions.map((region, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{region.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{region.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${region.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                  ${region.revenue.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Monthly Sales Trend</h3>
        <div className="grid grid-cols-6 gap-4">
          {salesData.monthlyTrend.map((month, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{month.month}</div>
              <div className="bg-gradient-to-t from-green-400 to-emerald-500 rounded-lg p-4 mb-2" style={{ height: `${(month.revenue / 25000) * 100}px` }}>
                <div className="text-white text-xs font-bold">${(month.revenue / 1000).toFixed(0)}K</div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{month.orders} orders</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesReports;
