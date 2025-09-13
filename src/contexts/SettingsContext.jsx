import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

const defaultSettings = {
  colorScheme: 'blue',
  showGrid: true,
  showLegend: true,
  animationSpeed: 'medium',
  numberFormat: 'standard',
  currency: 'USD',
  dateFormat: 'MM/DD/YYYY',
  timezone: 'UTC'
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('dashboardSettings');
    if (savedSettings) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const getColorScheme = (count = 6) => {
    const schemes = {
      blue: ['#3B82F6', '#1D4ED8', '#1E40AF', '#1E3A8A', '#1E3A8A', '#1D4ED8'],
      green: ['#10B981', '#059669', '#047857', '#065F46', '#064E3B', '#059669'],
      purple: ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95', '#7C3AED'],
      orange: ['#F59E0B', '#D97706', '#B45309', '#92400E', '#78350F', '#D97706'],
      red: ['#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D', '#DC2626'],
      indigo: ['#6366F1', '#4F46E5', '#4338CA', '#3730A3', '#312E81', '#4F46E5'],
      teal: ['#14B8A6', '#0D9488', '#0F766E', '#115E59', '#134E4A', '#0D9488'],
      pink: ['#EC4899', '#DB2777', '#BE185D', '#9D174D', '#831843', '#DB2777'],
      yellow: ['#EAB308', '#CA8A04', '#A16207', '#854D0E', '#713F12', '#CA8A04'],
      cyan: ['#06B6D4', '#0891B2', '#0E7490', '#155E75', '#164E63', '#0891B2'],
      emerald: ['#10B981', '#059669', '#047857', '#065F46', '#064E3B', '#059669'],
      violet: ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95', '#7C3AED'],
      rose: ['#F43F5E', '#E11D48', '#BE123C', '#9F1239', '#881337', '#E11D48'],
      sky: ['#0EA5E9', '#0284C7', '#0369A1', '#075985', '#0C4A6E', '#0284C7'],
      lime: ['#84CC16', '#65A30D', '#4D7C0F', '#365314', '#1A2E05', '#65A30D'],
      slate: ['#64748B', '#475569', '#334155', '#1E293B', '#0F172A', '#475569'],
      stone: ['#78716C', '#57534E', '#44403C', '#292524', '#1C1917', '#57534E'],
      neutral: ['#737373', '#525252', '#404040', '#262626', '#171717', '#525252'],
      zinc: ['#71717A', '#52525B', '#3F3F46', '#27272A', '#18181B', '#52525B'],
      gray: ['#6B7280', '#4B5563', '#374151', '#1F2937', '#111827', '#4B5563']
    };
    const selectedScheme = schemes[settings.colorScheme] || schemes.blue;
    return selectedScheme.slice(0, count);
  };

  // Enhanced function for better line chart visibility
  const getLineChartColors = (datasetCount = 2) => {
    const baseColors = getColorScheme(6);
    
    // For single dataset, use primary color with high contrast
    if (datasetCount === 1) {
      return [{
        borderColor: baseColors[0],
        backgroundColor: baseColors[0].replace('rgb', 'rgba').replace(')', ', 0.1)'),
        pointBackgroundColor: baseColors[0],
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: baseColors[0],
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 10,
      }];
    }
    
    // For multiple datasets, use contrasting colors
    return baseColors.slice(0, datasetCount).map((color, index) => ({
      borderColor: color,
      backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.1)'),
      pointBackgroundColor: color,
      pointBorderColor: '#ffffff',
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 3,
      borderWidth: index === 0 ? 3 : 2.5, // First line slightly thicker
      pointRadius: 6,
      pointHoverRadius: 10,
    }));
  };

  const formatNumber = (value) => {
    if (settings.numberFormat === 'comma') {
      return value.toLocaleString();
    } else if (settings.numberFormat === 'compact') {
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1
      }).format(value);
    }
    return value.toString();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: settings.currency
    }).format(value);
  };

  const getAnimationDuration = () => {
    const durations = {
      slow: 2000,
      medium: 1000,
      fast: 500
    };
    return durations[settings.animationSpeed] || 1000;
  };

  const value = {
    settings,
    updateSetting,
    resetSettings,
    getColorScheme,
    getLineChartColors,
    formatNumber,
    formatCurrency,
    getAnimationDuration
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
