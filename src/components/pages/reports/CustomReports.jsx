import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';

const CustomReports = () => {
  const { isDark } = useTheme();
  const { settings } = useSettings();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const reportTemplates = [
    {
      id: 1,
      name: 'Monthly Sales Summary',
      description: 'Comprehensive monthly sales analysis with trends and forecasts',
      category: 'Sales',
      lastUsed: '2 days ago',
      frequency: 'Monthly',
      dataPoints: ['Revenue', 'Orders', 'Customers', 'Products'],
      color: 'blue'
    },
    {
      id: 2,
      name: 'User Engagement Report',
      description: 'Detailed user behavior and engagement metrics',
      category: 'Analytics',
      lastUsed: '1 week ago',
      frequency: 'Weekly',
      dataPoints: ['Active Users', 'Session Duration', 'Page Views', 'Bounce Rate'],
      color: 'green'
    },
    {
      id: 3,
      name: 'Financial Dashboard',
      description: 'Complete financial overview with P&L and cash flow',
      category: 'Finance',
      lastUsed: '3 days ago',
      frequency: 'Daily',
      dataPoints: ['Revenue', 'Expenses', 'Profit', 'Cash Flow'],
      color: 'yellow'
    },
    {
      id: 4,
      name: 'Marketing Performance',
      description: 'Campaign performance and ROI analysis',
      category: 'Marketing',
      lastUsed: '5 days ago',
      frequency: 'Weekly',
      dataPoints: ['Campaigns', 'ROI', 'Leads', 'Conversions'],
      color: 'purple'
    },
    {
      id: 5,
      name: 'System Health Monitor',
      description: 'System performance and uptime monitoring',
      category: 'Technical',
      lastUsed: '1 day ago',
      frequency: 'Real-time',
      dataPoints: ['Uptime', 'Response Time', 'Errors', 'Throughput'],
      color: 'red'
    },
    {
      id: 6,
      name: 'Customer Satisfaction',
      description: 'Customer feedback and satisfaction metrics',
      category: 'Support',
      lastUsed: '1 week ago',
      frequency: 'Monthly',
      dataPoints: ['NPS Score', 'CSAT', 'Reviews', 'Support Tickets'],
      color: 'indigo'
    }
  ];

  const scheduledReports = [
    {
      id: 1,
      name: 'Daily Sales Report',
      nextRun: 'Tomorrow 9:00 AM',
      frequency: 'Daily',
      recipients: ['admin@company.com', 'sales@company.com'],
      status: 'Active'
    },
    {
      id: 2,
      name: 'Weekly Analytics',
      nextRun: 'Monday 8:00 AM',
      frequency: 'Weekly',
      recipients: ['analytics@company.com'],
      status: 'Active'
    },
    {
      id: 3,
      name: 'Monthly Financial',
      nextRun: '1st of next month',
      frequency: 'Monthly',
      recipients: ['finance@company.com', 'ceo@company.com'],
      status: 'Active'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800',
      green: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800',
      yellow: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800',
      purple: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800',
      red: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800',
      indigo: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-800'
    };
    return colorMap[color] || colorMap.blue;
  };

  const generateReport = (templateId) => {
    setSelectedTemplate(templateId);
    setTimeout(() => {
      setSelectedTemplate(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-rose-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent">
              Custom Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create and manage your own custom report templates
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button 
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Create New
            </button>
            
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              Import Template
            </button>
          </div>
        </div>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Create New Report Template</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Report Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700"
                placeholder="Enter report name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700">
                <option>Sales</option>
                <option>Analytics</option>
                <option>Finance</option>
                <option>Marketing</option>
                <option>Technical</option>
                <option>Support</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Frequency</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700">
                <option>Real-time</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data Sources</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700">
                <option>All Sources</option>
                <option>Sales Database</option>
                <option>Analytics Platform</option>
                <option>CRM System</option>
                <option>Marketing Tools</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700"
                placeholder="Describe your custom report"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button 
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
              Create Template
            </button>
          </div>
        </div>
      )}

      {/* Report Templates */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTemplates.map((template) => (
            <div
              key={template.id}
              className={`bg-gradient-to-br ${getColorClasses(template.color)} rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedTemplate === template.id ? 'ring-2 ring-pink-500' : ''
              }`}
              onClick={() => generateReport(template.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-white/50 dark:bg-gray-800/50 flex items-center justify-center">
                    <span className="text-xl">📊</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{template.category}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">{template.frequency}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Last used</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{template.lastUsed}</div>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {template.name}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {template.description}
              </p>
              
              <div className="mb-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Data Points:</div>
                <div className="flex flex-wrap gap-1">
                  {template.dataPoints.map((point, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-white/50 dark:bg-gray-800/50 rounded-full text-gray-700 dark:text-gray-300"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                  selectedTemplate === template.id
                    ? 'bg-green-500 text-white'
                    : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-700/50'
                }`}
                disabled={selectedTemplate === template.id}
              >
                {selectedTemplate === template.id ? (
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
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Scheduled Reports</h3>
        <div className="space-y-4">
          {scheduledReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center">
                  <span className="text-lg">⏰</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{report.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Next run: {report.nextRun} • {report.frequency}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    Recipients: {report.recipients.join(', ')}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  report.status === 'Active' 
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-600' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600'
                }`}>
                  {report.status}
                </span>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomReports;
