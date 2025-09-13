import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

const FAQ = () => {
  const { isDark } = useTheme();
  const [openItems, setOpenItems] = useState({});

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I create my first chart?',
          answer: 'To create your first chart, navigate to the Visualizations section, select your preferred chart type, upload your data (CSV, JSON, or Excel), and customize the appearance using the settings panel.'
        },
        {
          question: 'What data formats are supported?',
          answer: 'DataHub supports CSV, JSON, Excel (.xlsx, .xls), and can connect to REST API endpoints. Make sure your data includes proper headers and consistent formatting for best results.'
        },
        {
          question: 'Do I need to create an account?',
          answer: 'Yes, you need to log in to access most features. Use the demo credentials: username "admin" and password "admin123" to get started.'
        }
      ]
    },
    {
      category: 'Chart Customization',
      questions: [
        {
          question: 'How can I change chart colors?',
          answer: 'Go to Settings and select from 6 predefined color schemes: Ocean Blue, Forest Green, Royal Purple, Sunset Orange, Crimson Red, and Deep Indigo. Changes apply to all charts instantly.'
        },
        {
          question: 'Can I adjust animation speed?',
          answer: 'Yes! In Settings, you can choose from Slow (2s), Medium (1s), or Fast (0.5s) animation speeds. This affects how charts animate when loading or updating.'
        },
        {
          question: 'How do I toggle grid lines and legends?',
          answer: 'In the Settings panel, you can toggle "Show Grid Lines" and "Show Legend" options. These settings apply to all charts and can be changed at any time.'
        }
      ]
    },
    {
      category: 'Data Management',
      questions: [
        {
          question: 'What\'s the maximum file size I can upload?',
          answer: 'The recommended maximum file size is 10MB. For larger datasets, consider using the API integration feature to connect to external data sources.'
        },
        {
          question: 'How do I update my data?',
          answer: 'You can update data by uploading a new file with the same structure, or use the API integration to connect to live data sources that automatically refresh your charts.'
        },
        {
          question: 'Can I use real-time data?',
          answer: 'Yes! DataHub supports real-time data through API integration. Set up an API endpoint and your charts will automatically update when new data is available.'
        }
      ]
    },
    {
      category: 'Export & Sharing',
      questions: [
        {
          question: 'What export formats are available?',
          answer: 'You can export charts as PNG (for presentations), SVG (for web use), or PDF (for reports). All exports maintain high quality and can be customized.'
        },
        {
          question: 'How do I share my charts?',
          answer: 'Use the API integration feature to generate shareable links, or export your charts and embed them in other applications using the provided code snippets.'
        },
        {
          question: 'Can I embed charts in other websites?',
          answer: 'Yes! Use the API integration to get embed codes that you can insert into any website. The charts will be interactive and responsive.'
        }
      ]
    },
    {
      category: 'Troubleshooting',
      questions: [
        {
          question: 'Why isn\'t my chart loading?',
          answer: 'Check your data format and ensure it matches the expected structure. Make sure all required fields are present and there are no empty rows or columns causing issues.'
        },
        {
          question: 'The colors aren\'t changing when I update settings.',
          answer: 'Try refreshing the page or clearing your browser cache. If the issue persists, check that you\'re logged in and the settings are being saved properly.'
        },
        {
          question: 'My exported chart looks different than the preview.',
          answer: 'Export quality depends on your browser settings and the chart size. Try adjusting the chart dimensions or using a different export format for better results.'
        }
      ]
    },
    {
      category: 'Advanced Features',
      questions: [
        {
          question: 'How do I use the API integration?',
          answer: 'Navigate to Help & Documentation > API Integration for detailed instructions. You\'ll need to set up API endpoints and configure authentication for live data connections.'
        },
        {
          question: 'Can I create custom chart types?',
          answer: 'Currently, DataHub supports 8 predefined chart types. Custom chart types may be available in future updates. Check the documentation for the latest features.'
        },
        {
          question: 'Is there a mobile app?',
          answer: 'DataHub is fully responsive and works great on mobile browsers. A dedicated mobile app is planned for future releases.'
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Find answers to common questions about DataHub
          </p>
        </div>

        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {category.category}
                </h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {category.questions.map((item, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItems[key];
                  
                  return (
                    <div key={questionIndex} className="px-6 py-4">
                      <button
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                        className="w-full text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-lg p-2 -m-2"
                      >
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 pr-4">
                          {item.question}
                        </h3>
                        <svg
                          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="mt-4 pl-0">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
              Contact Support
            </button>
            <button className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;