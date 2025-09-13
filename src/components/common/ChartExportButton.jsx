import React, { useState, useRef } from 'react';
import { 
  exportChartAsPNG, 
  exportChartAsSVG, 
  exportChartAsPDF, 
  exportChartAsJPEG,
  getExportOptions 
} from '../../utils/chartExport';

const ChartExportButton = ({ 
  chartRef, 
  chartType = 'line', 
  filename = 'chart',
  className = '',
  showAllFormats = true 
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const exportOptions = getExportOptions(chartType);

  const handleExport = async (format) => {
    if (!chartRef?.current) {
      setExportStatus({ success: false, error: 'Chart reference not found' });
      return;
    }

    setIsExporting(true);
    setExportStatus(null);

    try {
      let result;
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filenameWithTimestamp = `${filename}_${timestamp}`;

      switch (format) {
        case 'png':
          result = await exportChartAsPNG(chartRef.current, filenameWithTimestamp, exportOptions);
          break;
        case 'svg':
          result = await exportChartAsSVG(chartRef.current, filenameWithTimestamp, exportOptions);
          break;
        case 'pdf':
          result = await exportChartAsPDF(chartRef.current, filenameWithTimestamp, exportOptions);
          break;
        case 'jpeg':
          result = await exportChartAsJPEG(chartRef.current, filenameWithTimestamp, exportOptions);
          break;
        default:
          result = { success: false, error: `Unsupported format: ${format}` };
      }

      setExportStatus(result);
      
      if (result.success) {
        // Auto-hide success message after 3 seconds
        setTimeout(() => setExportStatus(null), 3000);
      }
    } catch (error) {
      setExportStatus({ success: false, error: error.message });
    } finally {
      setIsExporting(false);
      setShowDropdown(false);
    }
  };

  const formats = [
    { key: 'png', label: 'PNG', icon: '🖼️', description: 'High quality image' },
    { key: 'svg', label: 'SVG', icon: '📐', description: 'Scalable vector' },
    { key: 'pdf', label: 'PDF', icon: '📄', description: 'Document format' },
    { key: 'jpeg', label: 'JPEG', icon: '📷', description: 'Compressed image' }
  ];

  const availableFormats = showAllFormats ? formats : formats.slice(0, 2);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Export Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        disabled={isExporting || !chartRef?.current}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
          ${isExporting || !chartRef?.current
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
          }
        `}
      >
        {isExporting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export Chart</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-2">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
              Export Format
            </div>
            <div className="space-y-1">
              {availableFormats.map((format) => (
                <button
                  key={format.key}
                  onClick={() => handleExport(format.key)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-left"
                >
                  <span className="text-lg">{format.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {format.label}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {format.description}
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Status Message */}
      {exportStatus && (
        <div className={`
          absolute top-full left-0 mt-2 px-4 py-2 rounded-lg text-sm font-medium z-50
          ${exportStatus.success
            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
          }
        `}>
          {exportStatus.success ? (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Exported as {exportStatus.format} successfully!
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Export failed: {exportStatus.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChartExportButton;
