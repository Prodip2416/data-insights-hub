import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';
import { useNotification } from '../../../contexts/NotificationContext';

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();
  const { settings, updateSetting, resetSettings } = useSettings();
  const { showSuccess } = useNotification();

  const handleSettingChange = (key, value) => {
    updateSetting(key, value);
    showSuccess(`Setting updated: ${key} = ${value}`);
  };

  const handleSave = () => {
    showSuccess('All settings saved successfully!');
  };

  const handleReset = () => {
    resetSettings();
    showSuccess('Settings reset to default values!');
  };

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: '📊' },
    { value: 'line', label: 'Line Chart', icon: '📈' },
    { value: 'pie', label: 'Pie Chart', icon: '🥧' },
    { value: 'scatter', label: 'Scatter Plot', icon: '⚪' },
    { value: 'area', label: 'Area Chart', icon: '📉' },
    { value: 'heatmap', label: 'Heatmap', icon: '🔥' },
    { value: 'gauge', label: 'Gauge Chart', icon: '⏱️' },
    { value: 'tree', label: 'Tree Chart', icon: '🌳' },
  ];

  const colorSchemes = [
    {
      value: 'blue',
      label: 'Ocean Blue',
      preview: ['#3B82F6', '#1D4ED8', '#1E40AF', '#1E3A8A', '#1E3A8A', '#1D4ED8'],
      description: 'Professional and trustworthy',
      category: 'Professional'
    },
    {
      value: 'green',
      label: 'Forest Green',
      preview: ['#10B981', '#059669', '#047857', '#065F46', '#064E3B', '#059669'],
      description: 'Natural and growth-focused',
      category: 'Nature'
    },
    {
      value: 'purple',
      label: 'Royal Purple',
      preview: ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95', '#7C3AED'],
      description: 'Creative and innovative',
      category: 'Creative'
    },
    {
      value: 'orange',
      label: 'Sunset Orange',
      preview: ['#F59E0B', '#D97706', '#B45309', '#92400E', '#78350F', '#D97706'],
      description: 'Energetic and warm',
      category: 'Energy'
    },
    {
      value: 'red',
      label: 'Crimson Red',
      preview: ['#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D', '#DC2626'],
      description: 'Bold and attention-grabbing',
      category: 'Bold'
    },
    {
      value: 'indigo',
      label: 'Deep Indigo',
      preview: ['#6366F1', '#4F46E5', '#4338CA', '#3730A3', '#312E81', '#4F46E5'],
      description: 'Modern and sophisticated',
      category: 'Modern'
    },
    {
      value: 'teal',
      label: 'Tropical Teal',
      preview: ['#14B8A6', '#0D9488', '#0F766E', '#115E59', '#134E4A', '#0D9488'],
      description: 'Fresh and calming',
      category: 'Fresh'
    },
    {
      value: 'pink',
      label: 'Vibrant Pink',
      preview: ['#EC4899', '#DB2777', '#BE185D', '#9D174D', '#831843', '#DB2777'],
      description: 'Playful and dynamic',
      category: 'Playful'
    },
    {
      value: 'yellow',
      label: 'Golden Yellow',
      preview: ['#EAB308', '#CA8A04', '#A16207', '#854D0E', '#713F12', '#CA8A04'],
      description: 'Optimistic and bright',
      category: 'Bright'
    },
    {
      value: 'cyan',
      label: 'Electric Cyan',
      preview: ['#06B6D4', '#0891B2', '#0E7490', '#155E75', '#164E63', '#0891B2'],
      description: 'Tech-savvy and clean',
      category: 'Tech'
    },
    {
      value: 'emerald',
      label: 'Rich Emerald',
      preview: ['#10B981', '#059669', '#047857', '#065F46', '#064E3B', '#059669'],
      description: 'Luxurious and elegant',
      category: 'Luxury'
    },
    {
      value: 'violet',
      label: 'Mystic Violet',
      preview: ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95', '#7C3AED'],
      description: 'Mysterious and enchanting',
      category: 'Mystic'
    },
    {
      value: 'rose',
      label: 'Passionate Rose',
      preview: ['#F43F5E', '#E11D48', '#BE123C', '#9F1239', '#881337', '#E11D48'],
      description: 'Romantic and passionate',
      category: 'Romantic'
    },
    {
      value: 'sky',
      label: 'Clear Sky',
      preview: ['#0EA5E9', '#0284C7', '#0369A1', '#075985', '#0C4A6E', '#0284C7'],
      description: 'Open and expansive',
      category: 'Open'
    },
    {
      value: 'lime',
      label: 'Electric Lime',
      preview: ['#84CC16', '#65A30D', '#4D7C0F', '#365314', '#1A2E05', '#65A30D'],
      description: 'Fresh and energetic',
      category: 'Fresh'
    },
    {
      value: 'slate',
      label: 'Professional Slate',
      preview: ['#64748B', '#475569', '#334155', '#1E293B', '#0F172A', '#475569'],
      description: 'Corporate and reliable',
      category: 'Corporate'
    },
    {
      value: 'stone',
      label: 'Warm Stone',
      preview: ['#78716C', '#57534E', '#44403C', '#292524', '#1C1917', '#57534E'],
      description: 'Natural and earthy',
      category: 'Earth'
    },
    {
      value: 'neutral',
      label: 'Pure Neutral',
      preview: ['#737373', '#525252', '#404040', '#262626', '#171717', '#525252'],
      description: 'Minimal and clean',
      category: 'Minimal'
    },
    {
      value: 'zinc',
      label: 'Cool Zinc',
      preview: ['#71717A', '#52525B', '#3F3F46', '#27272A', '#18181B', '#52525B'],
      description: 'Modern and cool',
      category: 'Cool'
    },
    {
      value: 'gray',
      label: 'Classic Gray',
      preview: ['#6B7280', '#4B5563', '#374151', '#1F2937', '#111827', '#4B5563'],
      description: 'Timeless and versatile',
      category: 'Classic'
    }
  ];

  const animationSpeeds = [
    { value: 'slow', label: 'Slow', duration: '2s', description: 'Smooth and elegant' },
    { value: 'medium', label: 'Medium', duration: '1s', description: 'Balanced and responsive' },
    { value: 'fast', label: 'Fast', duration: '0.5s', description: 'Quick and snappy' }
  ];

  const numberFormats = [
    { value: 'standard', label: 'Standard (1,234)', description: '1,234' },
    { value: 'comma', label: 'Comma Separated (1,234)', description: '1,234' },
    { value: 'compact', label: 'Compact (1.2K)', description: '1.2K' },
    { value: 'decimal', label: 'Decimal (1234.56)', description: '1234.56' }
  ];

  const currencies = [
    { value: 'USD', label: 'US Dollar ($)', symbol: '$' },
    { value: 'EUR', label: 'Euro (€)', symbol: '€' },
    { value: 'GBP', label: 'British Pound (£)', symbol: '£' },
    { value: 'JPY', label: 'Japanese Yen (¥)', symbol: '¥' },
    { value: 'CAD', label: 'Canadian Dollar (C$)', symbol: 'C$' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Chart Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Customize chart appearance, animations, and data formatting across all visualizations
          </p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Color Scheme Settings */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <span className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mr-4 text-white text-lg">
                🎨
              </span>
              Color Schemes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Choose a color palette that will be applied to all charts. Each scheme includes 6 colors for maximum visibility and variety.
            </p>
            
            {/* Color Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Color Categories</h3>
              <div className="flex flex-wrap gap-2">
                {['Professional', 'Nature', 'Creative', 'Energy', 'Bold', 'Modern', 'Fresh', 'Playful', 'Bright', 'Tech', 'Luxury', 'Mystic', 'Romantic', 'Open', 'Corporate', 'Earth', 'Minimal', 'Cool', 'Classic'].map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {colorSchemes.map((scheme) => (
                <label
                  key={scheme.value}
                  className={`relative flex flex-col p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                    settings.colorScheme === scheme.value
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg scale-105'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="colorScheme"
                    value={scheme.value}
                    checked={settings.colorScheme === scheme.value}
                    onChange={(e) => handleSettingChange('colorScheme', e.target.value)}
                    className="sr-only"
                  />
                  
                  {/* Color Preview */}
                  <div className="flex justify-center mb-4">
                    <div className="flex space-x-1">
                      {scheme.preview.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-lg border-2 border-white dark:border-gray-800 shadow-md hover:scale-110 transition-transform duration-200"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Scheme Info */}
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-1">
                      {scheme.label}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {scheme.description}
                    </div>
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                      {scheme.category}
                    </div>
                  </div>
                  
                  {/* Selection Indicator */}
                  {settings.colorScheme === scheme.value && (
                    <div className="absolute top-3 right-3 w-7 h-7 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </label>
              ))}
            </div>
            
            {/* Current Selection Info */}
            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    Selected: {colorSchemes.find(s => s.value === settings.colorScheme)?.label}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {colorSchemes.find(s => s.value === settings.colorScheme)?.description}
                  </p>
                </div>
                <div className="flex space-x-1">
                  {colorSchemes.find(s => s.value === settings.colorScheme)?.preview.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Animation Settings */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                ⚡
              </span>
              Animation & Motion
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control how charts animate and respond to interactions
            </p>

            <div className="space-y-6">
              {/* Animation Speed */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Animation Speed
                </label>
                <div className="space-y-3">
                  {animationSpeeds.map((speed) => (
                    <label
                      key={speed.value}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        settings.animationSpeed === speed.value
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="animationSpeed"
                        value={speed.value}
                        checked={settings.animationSpeed === speed.value}
                        onChange={(e) => handleSettingChange('animationSpeed', e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center w-full">
                        <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded-full mr-3 flex items-center justify-center">
                          {settings.animationSpeed === speed.value && (
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {speed.label} ({speed.duration})
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {speed.description}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Chart Display Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Display Options
                </h3>
                
                <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">Show Grid Lines</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Display background grid on charts</div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={settings.showGrid}
                      onChange={(e) => handleSettingChange('showGrid', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                      settings.showGrid ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                        settings.showGrid ? 'translate-x-6' : 'translate-x-0.5'
                      } mt-0.5`}></div>
                    </div>
                  </div>
                </label>

                <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">Show Legend</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Display chart legends</div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={settings.showLegend}
                      onChange={(e) => handleSettingChange('showLegend', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                      settings.showLegend ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                        settings.showLegend ? 'translate-x-6' : 'translate-x-0.5'
                      } mt-0.5`}></div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Data Formatting */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                📊
              </span>
              Data Formatting
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Configure how numbers and currencies are displayed
            </p>

            <div className="space-y-6">
              {/* Number Format */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Number Format
                </label>
                <div className="space-y-2">
                  {numberFormats.map((format) => (
                    <label
                      key={format.value}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        settings.numberFormat === format.value
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="numberFormat"
                        value={format.value}
                        checked={settings.numberFormat === format.value}
                        onChange={(e) => handleSettingChange('numberFormat', e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center w-full">
                        <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded-full mr-3 flex items-center justify-center">
                          {settings.numberFormat === format.value && (
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {format.label}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Example: {format.description}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleSettingChange('currency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {currencies.map((currency) => (
                    <option key={currency.value} value={currency.value}>
                      {currency.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Chart Types Overview */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                📈
              </span>
              Available Chart Types
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              These settings will apply to all chart types in your dashboard
            </p>

            <div className="grid grid-cols-2 gap-3">
              {chartTypes.map((chart) => (
                <div
                  key={chart.value}
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="text-2xl mr-3">{chart.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {chart.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;