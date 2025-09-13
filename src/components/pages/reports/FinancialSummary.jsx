import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';

const FinancialSummary = () => {
  const { isDark } = useTheme();
  const { settings } = useSettings();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const financialData = {
    revenue: 125000,
    costs: 75000,
    profit: 50000,
    margin: 40,
    expenses: [
      { category: 'Personnel', amount: 35000, percentage: 46.7, color: 'blue' },
      { category: 'Infrastructure', amount: 15000, percentage: 20.0, color: 'green' },
      { category: 'Marketing', amount: 12000, percentage: 16.0, color: 'purple' },
      { category: 'Operations', amount: 8000, percentage: 10.7, color: 'orange' },
      { category: 'Other', amount: 5000, percentage: 6.6, color: 'gray' }
    ],
    revenueStreams: [
      { source: 'Subscriptions', amount: 75000, percentage: 60, growth: 15.2 },
      { source: 'One-time Sales', amount: 30000, percentage: 24, growth: 8.5 },
      { source: 'Consulting', amount: 15000, percentage: 12, growth: 22.1 },
      { source: 'Other', amount: 5000, percentage: 4, growth: -5.2 }
    ],
    monthlyTrend: [
      { month: 'Jan', revenue: 10000, costs: 6000, profit: 4000 },
      { month: 'Feb', revenue: 12000, costs: 7000, profit: 5000 },
      { month: 'Mar', revenue: 15000, costs: 8000, profit: 7000 },
      { month: 'Apr', revenue: 18000, costs: 9000, profit: 9000 },
      { month: 'May', revenue: 20000, costs: 10000, profit: 10000 },
      { month: 'Jun', revenue: 25000, costs: 12000, profit: 13000 }
    ],
    kpis: [
      { name: 'Gross Margin', value: 40, target: 45, status: 'warning' },
      { name: 'Operating Margin', value: 25, target: 30, status: 'warning' },
      { name: 'Net Margin', value: 20, target: 25, status: 'warning' },
      { name: 'ROI', value: 15, target: 20, status: 'warning' }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Financial Summary
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Revenue, costs, profit margins, and financial health analysis
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
            
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Revenue</div>
              <div className="text-sm font-medium text-green-600">+12.5%</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            ${financialData.revenue.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <span className="text-2xl">💸</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Costs</div>
              <div className="text-sm font-medium text-red-600">+8.2%</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            ${financialData.costs.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Costs</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Profit</div>
              <div className="text-sm font-medium text-blue-600">+18.3%</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            ${financialData.profit.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Net Profit</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Margin</div>
              <div className="text-sm font-medium text-purple-600">{financialData.margin}%</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {financialData.margin}%
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Profit Margin</p>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Expense Breakdown */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Expense Breakdown</h3>
          <div className="space-y-4">
            {financialData.expenses.map((expense, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{expense.category}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{expense.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`bg-gradient-to-r from-${expense.color}-400 to-${expense.color}-500 h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${expense.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                  ${expense.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Streams */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Revenue Streams</h3>
          <div className="space-y-4">
            {financialData.revenueStreams.map((stream, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{stream.source}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{stream.percentage}% of total</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">${stream.amount.toLocaleString()}</div>
                  <div className={`text-sm ${stream.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stream.growth > 0 ? '+' : ''}{stream.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Financial Trend */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Monthly Financial Trend</h3>
        <div className="grid grid-cols-6 gap-4">
          {financialData.monthlyTrend.map((month, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{month.month}</div>
              <div className="space-y-1">
                <div className="bg-gradient-to-t from-green-400 to-green-500 rounded-lg p-2 mb-1" style={{ height: `${(month.revenue / 25000) * 60}px` }}>
                  <div className="text-white text-xs font-bold">${(month.revenue / 1000).toFixed(0)}K</div>
                </div>
                <div className="bg-gradient-to-t from-red-400 to-red-500 rounded-lg p-2 mb-1" style={{ height: `${(month.costs / 12000) * 60}px` }}>
                  <div className="text-white text-xs font-bold">${(month.costs / 1000).toFixed(0)}K</div>
                </div>
                <div className="bg-gradient-to-t from-blue-400 to-blue-500 rounded-lg p-2" style={{ height: `${(month.profit / 13000) * 60}px` }}>
                  <div className="text-white text-xs font-bold">${(month.profit / 1000).toFixed(0)}K</div>
                </div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                <div>Rev: ${(month.revenue / 1000).toFixed(0)}K</div>
                <div>Cost: ${(month.costs / 1000).toFixed(0)}K</div>
                <div>Profit: ${(month.profit / 1000).toFixed(0)}K</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Financial KPIs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {financialData.kpis.map((kpi, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{kpi.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(kpi.status)}`}>
                  {kpi.status}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {kpi.value}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Target: {kpi.target}%
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    kpi.value >= kpi.target ? 'bg-gradient-to-r from-green-400 to-green-500' :
                    kpi.value >= kpi.target * 0.8 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                    'bg-gradient-to-r from-red-400 to-red-500'
                  }`}
                  style={{ width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
