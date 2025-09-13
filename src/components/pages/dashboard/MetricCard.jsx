import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

const MetricCard = ({ name, value, change, trend }) => {
  const { isDark } = useTheme();
  const trendColor =
    trend === 'up'
      ? 'text-green-600 dark:text-green-400'
      : 'text-red-600 dark:text-red-400';
  const trendIcon = trend === 'up' ? '↗' : '↘';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
        {name}
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {value}
      </div>
      <div className={`text-sm mt-2 ${trendColor}`}>
        <span className="inline-flex items-center">
          {trendIcon} {change}
        </span>
      </div>
    </div>
  );
};

export default MetricCard;
