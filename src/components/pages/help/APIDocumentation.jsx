import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

const APIDocumentation = () => {
  const { isDark } = useTheme();
  const [activeEndpoint, setActiveEndpoint] = useState(0);

  const endpoints = [
    {
      method: 'GET',
      path: '/api/charts',
      description: 'Get all charts',
      parameters: [
        { name: 'limit', type: 'number', required: false, description: 'Number of charts to return (default: 10)' },
        { name: 'offset', type: 'number', required: false, description: 'Number of charts to skip' },
        { name: 'type', type: 'string', required: false, description: 'Filter by chart type' }
      ],
      response: {
        success: true,
        data: [
          {
            id: 'chart_123',
            name: 'Sales Overview',
            type: 'bar',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T10:30:00Z'
          }
        ],
        total: 1
      }
    },
    {
      method: 'GET',
      path: '/api/charts/{id}',
      description: 'Get specific chart',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Chart ID' }
      ],
      response: {
        success: true,
        data: {
          id: 'chart_123',
          name: 'Sales Overview',
          type: 'bar',
          config: {
            labels: ['Jan', 'Feb', 'Mar'],
            datasets: [{
              label: 'Sales',
              data: [1200, 1900, 3000]
            }]
          },
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z'
        }
      }
    },
    {
      method: 'POST',
      path: '/api/charts',
      description: 'Create new chart',
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'Chart name' },
        { name: 'type', type: 'string', required: true, description: 'Chart type (bar, line, pie, etc.)' },
        { name: 'data', type: 'object', required: true, description: 'Chart data configuration' }
      ],
      response: {
        success: true,
        data: {
          id: 'chart_456',
          name: 'New Chart',
          type: 'line',
          createdAt: '2024-01-15T11:00:00Z',
          updatedAt: '2024-01-15T11:00:00Z'
        }
      }
    },
    {
      method: 'PUT',
      path: '/api/charts/{id}',
      description: 'Update chart',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Chart ID' },
        { name: 'name', type: 'string', required: false, description: 'New chart name' },
        { name: 'data', type: 'object', required: false, description: 'Updated chart data' }
      ],
      response: {
        success: true,
        data: {
          id: 'chart_123',
          name: 'Updated Chart',
          type: 'bar',
          updatedAt: '2024-01-15T11:30:00Z'
        }
      }
    },
    {
      method: 'DELETE',
      path: '/api/charts/{id}',
      description: 'Delete chart',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Chart ID' }
      ],
      response: {
        success: true,
        message: 'Chart deleted successfully'
      }
    },
    {
      method: 'GET',
      path: '/api/export/{chartId}',
      description: 'Export chart data',
      parameters: [
        { name: 'chartId', type: 'string', required: true, description: 'Chart ID' },
        { name: 'format', type: 'string', required: false, description: 'Export format (png, svg, pdf)' }
      ],
      response: {
        success: true,
        data: {
          downloadUrl: 'https://api.datahub.com/exports/chart_123.png',
          expiresAt: '2024-01-15T12:00:00Z'
        }
      }
    }
  ];

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'POST': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            API Documentation
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Complete API reference for DataHub integration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Endpoints</h2>
              <div className="space-y-2">
                {endpoints.map((endpoint, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveEndpoint(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                      activeEndpoint === index
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <span className="text-sm font-mono">{endpoint.path}</span>
                    </div>
                    <div className="text-xs mt-1 opacity-75">{endpoint.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-center space-x-4 mb-6">
                <span className={`px-3 py-1 rounded text-sm font-bold ${getMethodColor(endpoints[activeEndpoint].method)}`}>
                  {endpoints[activeEndpoint].method}
                </span>
                <code className="text-lg font-mono text-gray-900 dark:text-gray-100">
                  {endpoints[activeEndpoint].path}
                </code>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {endpoints[activeEndpoint].description}
              </p>

              {/* Parameters */}
              {endpoints[activeEndpoint].parameters && endpoints[activeEndpoint].parameters.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Parameters</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2 font-medium text-gray-900 dark:text-gray-100">Name</th>
                          <th className="text-left py-2 font-medium text-gray-900 dark:text-gray-100">Type</th>
                          <th className="text-left py-2 font-medium text-gray-900 dark:text-gray-100">Required</th>
                          <th className="text-left py-2 font-medium text-gray-900 dark:text-gray-100">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoints[activeEndpoint].parameters.map((param, index) => (
                          <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                            <td className="py-2 font-mono text-indigo-600 dark:text-indigo-400">{param.name}</td>
                            <td className="py-2 text-gray-600 dark:text-gray-300">{param.type}</td>
                            <td className="py-2">
                              <span className={`px-2 py-1 rounded text-xs ${
                                param.required 
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                              }`}>
                                {param.required ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td className="py-2 text-gray-600 dark:text-gray-300">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Response */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Response</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-800 dark:text-gray-200">
                    <code>{JSON.stringify(endpoints[activeEndpoint].response, null, 2)}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Authentication */}
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Authentication</h3>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                All API requests require authentication. Include your API key in the Authorization header:
              </p>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-green-400 text-sm">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
            </div>

            {/* Rate Limits */}
            <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Rate Limits</h3>
              <p className="text-yellow-700 dark:text-yellow-300">
                API requests are limited to 1000 requests per hour per API key. Contact support for higher limits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentation;