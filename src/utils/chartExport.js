import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Chart Export Utility
 * Provides functions to export charts in various formats
 */

/**
 * Export chart as PNG image
 * @param {HTMLElement} chartElement - The chart container element
 * @param {string} filename - Name of the file to save
 * @param {Object} options - Export options
 */
export const exportChartAsPNG = async (chartElement, filename = 'chart.png', options = {}) => {
  try {
    const canvas = await html2canvas(chartElement, {
      backgroundColor: options.backgroundColor || '#ffffff',
      scale: options.scale || 2,
      useCORS: true,
      allowTaint: true,
      ...options
    });

    const link = document.createElement('a');
    link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    return { success: true, format: 'PNG' };
  } catch (error) {
    console.error('Error exporting chart as PNG:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Export chart as SVG
 * @param {HTMLElement} chartElement - The chart container element
 * @param {string} filename - Name of the file to save
 * @param {Object} options - Export options
 */
export const exportChartAsSVG = async (chartElement, filename = 'chart.svg', options = {}) => {
  try {
    // Find the canvas element within the chart
    const canvas = chartElement.querySelector('canvas');
    if (!canvas) {
      throw new Error('No canvas element found in chart');
    }

    // Convert canvas to SVG
    const svgData = canvasToSVG(canvas, options);
    
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = filename.endsWith('.svg') ? filename : `${filename}.svg`;
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
    
    return { success: true, format: 'SVG' };
  } catch (error) {
    console.error('Error exporting chart as SVG:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Export chart as PDF
 * @param {HTMLElement} chartElement - The chart container element
 * @param {string} filename - Name of the file to save
 * @param {Object} options - Export options
 */
export const exportChartAsPDF = async (chartElement, filename = 'chart.pdf', options = {}) => {
  try {
    const canvas = await html2canvas(chartElement, {
      backgroundColor: options.backgroundColor || '#ffffff',
      scale: options.scale || 2,
      useCORS: true,
      allowTaint: true,
      ...options
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: options.orientation || 'landscape',
      unit: 'mm',
      format: options.format || 'a4'
    });

    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    const finalFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    pdf.save(finalFilename);
    
    return { success: true, format: 'PDF' };
  } catch (error) {
    console.error('Error exporting chart as PDF:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Export chart as JPEG
 * @param {HTMLElement} chartElement - The chart container element
 * @param {string} filename - Name of the file to save
 * @param {Object} options - Export options
 */
export const exportChartAsJPEG = async (chartElement, filename = 'chart.jpg', options = {}) => {
  try {
    const canvas = await html2canvas(chartElement, {
      backgroundColor: options.backgroundColor || '#ffffff',
      scale: options.scale || 2,
      useCORS: true,
      allowTaint: true,
      ...options
    });

    const link = document.createElement('a');
    link.download = filename.endsWith('.jpg') ? filename : `${filename}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', options.quality || 0.9);
    link.click();
    
    return { success: true, format: 'JPEG' };
  } catch (error) {
    console.error('Error exporting chart as JPEG:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Convert canvas to SVG
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {Object} options - Conversion options
 */
const canvasToSVG = (canvas, options = {}) => {
  const width = canvas.width;
  const height = canvas.height;
  const dataURL = canvas.toDataURL('image/png');
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <image href="${dataURL}" width="${width}" height="${height}"/>
    </svg>
  `;
};

/**
 * Get export options based on chart type
 * @param {string} chartType - Type of chart
 * @param {Object} customOptions - Custom options to override defaults
 */
export const getExportOptions = (chartType, customOptions = {}) => {
  const defaultOptions = {
    backgroundColor: '#ffffff',
    scale: 2,
    quality: 0.9,
    orientation: 'landscape',
    format: 'a4'
  };

  const chartSpecificOptions = {
    line: { scale: 2, orientation: 'landscape' },
    area: { scale: 2, orientation: 'landscape' },
    bar: { scale: 2, orientation: 'landscape' },
    pie: { scale: 2, orientation: 'portrait' },
    scatter: { scale: 2, orientation: 'landscape' },
    heatmap: { scale: 2, orientation: 'landscape' },
    gauge: { scale: 2, orientation: 'portrait' },
    tree: { scale: 2, orientation: 'landscape' }
  };

  return {
    ...defaultOptions,
    ...chartSpecificOptions[chartType],
    ...customOptions
  };
};

/**
 * Export chart in multiple formats
 * @param {HTMLElement} chartElement - The chart container element
 * @param {string} baseFilename - Base name for the files
 * @param {Array} formats - Array of formats to export ['png', 'svg', 'pdf', 'jpeg']
 * @param {Object} options - Export options
 */
export const exportChartMultiple = async (chartElement, baseFilename = 'chart', formats = ['png', 'pdf'], options = {}) => {
  const results = [];
  
  for (const format of formats) {
    let result;
    switch (format.toLowerCase()) {
      case 'png':
        result = await exportChartAsPNG(chartElement, baseFilename, options);
        break;
      case 'svg':
        result = await exportChartAsSVG(chartElement, baseFilename, options);
        break;
      case 'pdf':
        result = await exportChartAsPDF(chartElement, baseFilename, options);
        break;
      case 'jpeg':
      case 'jpg':
        result = await exportChartAsJPEG(chartElement, baseFilename, options);
        break;
      default:
        result = { success: false, error: `Unsupported format: ${format}` };
    }
    results.push({ format, ...result });
  }
  
  return results;
};
