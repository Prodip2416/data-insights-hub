import React, { useState } from 'react';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'features', title: 'Features', icon: '✨' },
    { id: 'charts', title: 'Chart Types', icon: '📊' },
    { id: 'data', title: 'Data Format', icon: '📁' },
    { id: 'customization', title: 'Customization', icon: '🎨' },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: '🔧' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">DataHub Overview</h2>
            <p className="text-gray-600 dark:text-gray-300">
              DataHub is a comprehensive data visualization platform built with React, Chart.js, and D3.js. 
              It provides powerful tools for creating interactive charts, managing data, and generating insights.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Real-time Analytics</h3>
                <p className="text-blue-700 dark:text-blue-300">Monitor your data with live updates and interactive visualizations.</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">Multiple Chart Types</h3>
                <p className="text-green-700 dark:text-green-300">Choose from 8+ different chart types to best represent your data.</p>
              </div>
            </div>
          </div>
        );
      case 'features':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Interactive Charts', desc: 'Hover, click, and zoom on all visualizations', icon: '🎯' },
                { title: 'Dark Mode', desc: 'Switch between light and dark themes', icon: '🌙' },
                { title: 'Responsive Design', desc: 'Works perfectly on all device sizes', icon: '📱' },
                { title: 'Export Options', desc: 'Download charts as PNG, SVG, or PDF', icon: '💾' },
                { title: 'Real-time Updates', desc: 'Data refreshes automatically', icon: '⚡' },
                { title: 'Custom Styling', desc: 'Personalize colors and themes', icon: '🎨' }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'charts':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Available Chart Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Bar Chart', desc: 'Compare values across categories', icon: '📊' },
                { name: 'Line Chart', desc: 'Show trends over time', icon: '📈' },
                { name: 'Pie Chart', desc: 'Display parts of a whole', icon: '🥧' },
                { name: 'Scatter Plot', desc: 'Show relationships between variables', icon: '⚪' },
                { name: 'Area Chart', desc: 'Show cumulative totals over time', icon: '📉' },
                { name: 'Heatmap', desc: 'Visualize data density', icon: '🔥' },
                { name: 'Gauge Chart', desc: 'Display single values with ranges', icon: '⏱️' },
                { name: 'Tree Chart', desc: 'Show hierarchical data structures', icon: '🌳' }
              ].map((chart, index) => (
                <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{chart.icon}</span>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{chart.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{chart.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'data':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Data Format Requirements</h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Supported Formats</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• <strong>CSV:</strong> Comma-separated values with headers</li>
                <li>• <strong>JSON:</strong> JavaScript Object Notation</li>
                <li>• <strong>Excel:</strong> .xlsx and .xls files</li>
                <li>• <strong>API:</strong> RESTful API endpoints</li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">Data Structure Example</h3>
              <pre className="text-sm text-blue-800 dark:text-blue-200 overflow-x-auto">
{`{
  "labels": ["Jan", "Feb", "Mar", "Apr"],
  "datasets": [{
    "label": "Sales",
    "data": [1200, 1900, 3000, 2500],
    "backgroundColor": "#3B82F6"
  }]
}`}
              </pre>
            </div>
          </div>
        );
      case 'customization':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Customization Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Color Schemes</h3>
                <div className="space-y-2">
                  {['Ocean Blue', 'Forest Green', 'Royal Purple', 'Sunset Orange'].map((scheme, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="text-gray-700 dark:text-gray-300">{scheme}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Animation Settings</h3>
                <div className="space-y-2">
                  {['Slow (2s)', 'Medium (1s)', 'Fast (0.5s)'].map((speed, index) => (
                    <div key={index} className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300">
                      {speed}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'troubleshooting':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Troubleshooting</h2>
            <div className="space-y-4">
              {[
                {
                  problem: "Charts not loading",
                  solution: "Check your data format and ensure all required fields are present. Try refreshing the page."
                },
                {
                  problem: "Performance issues",
                  solution: "Reduce data size or disable animations in settings. Close other browser tabs."
                },
                {
                  problem: "Export not working",
                  solution: "Ensure you have a stable internet connection. Try using a different browser."
                },
                {
                  problem: "Dark mode not applying",
                  solution: "Clear browser cache and refresh the page. Check if your browser supports CSS custom properties."
                }
              ].map((item, index) => (
                <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{item.problem}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.solution}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Documentation</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{section.icon}</span>
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
