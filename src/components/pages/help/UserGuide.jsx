import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

const UserGuide = () => {
  const { isDark } = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of DataHub',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome to DataHub!</h3>
          <p className="text-gray-600 dark:text-gray-300">
            DataHub is a powerful data visualization platform that helps you create, analyze, and share interactive charts and dashboards.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Key Features</h4>
              <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Interactive Charts</li>
                <li>• Real-time Data</li>
                <li>• Custom Themes</li>
                <li>• Export Options</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">Quick Start</h4>
              <ul className="text-green-700 dark:text-green-300 space-y-1">
                <li>• Choose a chart type</li>
                <li>• Upload your data</li>
                <li>• Customize appearance</li>
                <li>• Share or export</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Creating Charts',
      description: 'Step-by-step chart creation',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Creating Your First Chart</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Select Chart Type</h4>
                <p className="text-gray-600 dark:text-gray-300">Choose from 8+ chart types including bar, line, pie, scatter, and more.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Upload Data</h4>
                <p className="text-gray-600 dark:text-gray-300">Upload CSV, JSON, or Excel files, or use our sample data.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Customize Appearance</h4>
                <p className="text-gray-600 dark:text-gray-300">Adjust colors, animations, and display options in settings.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Export & Share</h4>
                <p className="text-gray-600 dark:text-gray-300">Download as PNG, SVG, or PDF, or share via API.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Data Management',
      description: 'Working with your data',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Data Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Supported Formats</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-600 dark:text-gray-300">CSV Files</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-600 dark:text-gray-300">JSON Data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-600 dark:text-gray-300">Excel Files</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-600 dark:text-gray-300">API Endpoints</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Data Requirements</h4>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Include column headers</li>
                <li>• Use consistent data types</li>
                <li>• Avoid empty rows</li>
                <li>• Keep file size under 10MB</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Customization',
      description: 'Personalizing your experience',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Customization Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Color Schemes</h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm">Choose from 6 beautiful color palettes to match your brand.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">Animations</h4>
              <p className="text-green-700 dark:text-green-300 text-sm">Control animation speed and effects for better user experience.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">Themes</h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm">Switch between light and dark themes for better visibility.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Advanced Features',
      description: 'Power user capabilities',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Advanced Features</h3>
          <div className="space-y-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">API Integration</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Connect your charts to live data sources using our REST API.</p>
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">GET /api/charts/&#123;chartId&#125;/data</code>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Export Options</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Export your charts in multiple formats for presentations and reports.</p>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">PNG</span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">SVG</span>
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs">PDF</span>
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Real-time Updates</h4>
              <p className="text-gray-600 dark:text-gray-300">Charts automatically refresh when data changes, keeping your visualizations up-to-date.</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            User Guide
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Step-by-step guide to using DataHub effectively
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Progress Steps */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Progress</h2>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                      activeStep === index
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                        activeStep === index
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{step.title}</div>
                        <div className="text-xs opacity-75">{step.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              {steps[activeStep].content}
              
              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                  disabled={activeStep === steps.length - 1}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;