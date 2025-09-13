import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';

const MarketingROI = () => {
  const { isDark } = useTheme();
  const { settings } = useSettings();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const marketingData = {
    totalSpend: 25000,
    totalRevenue: 75000,
    roi: 200,
    costPerLead: 15,
    campaigns: [
      { name: 'Social Media Ads', spend: 8000, revenue: 24000, roi: 200, leads: 533, cpl: 15 },
      { name: 'Google Ads', spend: 10000, revenue: 30000, roi: 200, leads: 667, cpl: 15 },
      { name: 'Email Marketing', spend: 2000, revenue: 8000, roi: 300, leads: 400, cpl: 5 },
      { name: 'Content Marketing', spend: 3000, revenue: 9000, roi: 200, leads: 200, cpl: 15 },
      { name: 'Influencer', spend: 2000, revenue: 4000, roi: 100, leads: 100, cpl: 20 }
    ],
    channels: [
      { channel: 'Facebook', spend: 5000, revenue: 15000, roi: 200, leads: 333, cpl: 15 },
      { channel: 'Google', spend: 8000, revenue: 24000, roi: 200, leads: 533, cpl: 15 },
      { channel: 'Instagram', spend: 3000, revenue: 9000, roi: 200, leads: 200, cpl: 15 },
      { channel: 'LinkedIn', spend: 4000, revenue: 12000, roi: 200, leads: 267, cpl: 15 },
      { channel: 'Email', spend: 2000, revenue: 8000, roi: 300, leads: 400, cpl: 5 },
      { channel: 'Other', spend: 3000, revenue: 7000, roi: 133, leads: 150, cpl: 20 }
    ],
    conversionFunnel: [
      { stage: 'Impressions', count: 100000, percentage: 100 },
      { stage: 'Clicks', count: 5000, percentage: 5 },
      { stage: 'Leads', count: 500, percentage: 10 },
      { stage: 'Opportunities', count: 100, percentage: 20 },
      { stage: 'Customers', count: 25, percentage: 25 }
    ],
    monthlyTrend: [
      { month: 'Jan', spend: 2000, revenue: 6000, roi: 200 },
      { month: 'Feb', spend: 3000, revenue: 9000, roi: 200 },
      { month: 'Mar', spend: 4000, revenue: 12000, roi: 200 },
      { month: 'Apr', spend: 5000, revenue: 15000, roi: 200 },
      { month: 'May', spend: 6000, revenue: 18000, roi: 200 },
      { month: 'Jun', spend: 5000, revenue: 15000, roi: 200 }
    ]
  };

  const periods = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  const getROIColor = (roi) => {
    if (roi >= 300) return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    if (roi >= 200) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
    if (roi >= 100) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-100 dark:bg-red-900/20';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Marketing ROI
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Campaign performance, conversion rates, and ROI analysis
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
            
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Spend</div>
              <div className="text-sm font-medium text-indigo-600">${marketingData.totalSpend.toLocaleString()}</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            ${marketingData.totalSpend.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Marketing Spend</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Revenue</div>
              <div className="text-sm font-medium text-green-600">${marketingData.totalRevenue.toLocaleString()}</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            ${marketingData.totalRevenue.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Attributed Revenue</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">ROI</div>
              <div className="text-sm font-medium text-purple-600">{marketingData.roi}%</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {marketingData.roi}%
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Return on Investment</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Cost per Lead</div>
              <div className="text-sm font-medium text-orange-600">${marketingData.costPerLead}</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            ${marketingData.costPerLead}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Cost per Lead</p>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Campaign Performance</h3>
          <div className="space-y-4">
            {marketingData.campaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-indigo-600">#{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{campaign.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{campaign.leads} leads</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">${campaign.revenue.toLocaleString()}</div>
                  <div className={`text-sm px-2 py-1 rounded-full ${getROIColor(campaign.roi)}`}>
                    {campaign.roi}% ROI
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Channel Performance</h3>
          <div className="space-y-4">
            {marketingData.channels.map((channel, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{channel.channel}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getROIColor(channel.roi)}`}>
                    {channel.roi}% ROI
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(channel.revenue / 30000) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>${channel.revenue.toLocaleString()}</span>
                  <span>{channel.leads} leads</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Conversion Funnel</h3>
        <div className="space-y-4">
          {marketingData.conversionFunnel.map((stage, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300">
                {stage.stage}
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-8 relative">
                <div
                  className="bg-gradient-to-r from-indigo-400 to-purple-500 h-8 rounded-full transition-all duration-500 flex items-center justify-end pr-4"
                  style={{ width: `${stage.percentage}%` }}
                >
                  <span className="text-white text-sm font-bold">{stage.count.toLocaleString()}</span>
                </div>
              </div>
              <div className="w-16 text-sm text-gray-500 dark:text-gray-400 text-right">
                {stage.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Monthly Marketing Trend</h3>
        <div className="grid grid-cols-6 gap-4">
          {marketingData.monthlyTrend.map((month, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{month.month}</div>
              <div className="space-y-1">
                <div className="bg-gradient-to-t from-indigo-400 to-indigo-500 rounded-lg p-2 mb-1" style={{ height: `${(month.spend / 6000) * 60}px` }}>
                  <div className="text-white text-xs font-bold">${(month.spend / 1000).toFixed(0)}K</div>
                </div>
                <div className="bg-gradient-to-t from-purple-400 to-purple-500 rounded-lg p-2 mb-1" style={{ height: `${(month.revenue / 18000) * 60}px` }}>
                  <div className="text-white text-xs font-bold">${(month.revenue / 1000).toFixed(0)}K</div>
                </div>
                <div className="bg-gradient-to-t from-pink-400 to-pink-500 rounded-lg p-2" style={{ height: `${(month.roi / 300) * 60}px` }}>
                  <div className="text-white text-xs font-bold">{month.roi}%</div>
                </div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                <div>Spend: ${(month.spend / 1000).toFixed(0)}K</div>
                <div>Revenue: ${(month.revenue / 1000).toFixed(0)}K</div>
                <div>ROI: {month.roi}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingROI;
