import React from 'react';
import { useTheme } from '../../../../contexts/ThemeContext';

const Heatmap = () => {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            Heatmap Component
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            This is the Heatmap component page
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-6xl mb-4">🔥</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Heatmap Component
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Component Name: Heatmap
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;

