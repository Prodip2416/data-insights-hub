import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';
import ChartExportButton from '../../common/ChartExportButton';

const TreeChart = () => {
  const fileInputRef = useRef(null);
  const svgRef = useRef(null);
  const chartRef = useRef(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();
  const { settings, getColorScheme, formatNumber, getAnimationDuration } = useSettings();

  // Sample data for demonstration
  const sampleData = {
    name: 'Company',
    children: [
      {
        name: 'Engineering',
        children: [
          { name: 'Frontend', value: 15 },
          { name: 'Backend', value: 20 },
          { name: 'DevOps', value: 8 },
        ],
      },
      {
        name: 'Marketing',
        children: [
          { name: 'Digital', value: 12 },
          { name: 'Content', value: 10 },
          { name: 'Events', value: 6 },
        ],
      },
      {
        name: 'Sales',
        children: [
          { name: 'Enterprise', value: 18 },
          { name: 'SMB', value: 14 },
          { name: 'Partnerships', value: 9 },
        ],
      },
    ],
  };

  const drawTree = (data) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    svg.attr('width', width).attr('height', height);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const tree = d3
      .tree()
      .size([
        width - margin.left - margin.right,
        height - margin.top - margin.bottom,
      ]);

    const root = d3.hierarchy(data);
    tree(root);

    // Add links
    g.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr(
        'd',
        d3
          .linkVertical()
          .x((d) => d.x)
          .y((d) => d.y)
      )
      .style('fill', 'none')
      .style('stroke', '#ccc')
      .style('stroke-width', 2);

    // Add nodes
    const node = g
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.x},${d.y})`);

    // Add circles
    node
      .append('circle')
      .attr('r', (d) => (d.children ? 8 : 6))
      .style('fill', (d) => (d.children ? getColorScheme(2)[0] : getColorScheme(2)[1]))
      .style('stroke', '#fff')
      .style('stroke-width', 2);

    // Add labels
    node
      .append('text')
      .attr('dy', '.35em')
      .attr('x', (d) => (d.children ? -12 : 12))
      .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
      .style('font-size', '12px')
      .style('fill', isDark ? '#ffffff' : '#374151')
      .text((d) => d.data.name);

    // Add value labels for leaves
    node
      .filter((d) => !d.children)
      .append('text')
      .attr('dy', '1.5em')
      .attr('x', 12)
      .style('text-anchor', 'start')
      .style('font-size', '10px')
      .style('fill', isDark ? '#d1d5db' : '#6B7280')
      .text((d) => `(${d.data.value || 0})`);

    // Add hover effects
    node
      .on('mouseover', function (event, d) {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', (d) => (d.children ? 10 : 8));

        // Show tooltip
        const tooltip = d3
          .select('body')
          .append('div')
          .attr('class', 'tooltip')
          .style('position', 'absolute')
          .style('background', 'rgba(0, 0, 0, 0.8)')
          .style('color', 'white')
          .style('padding', '8px 12px')
          .style('border-radius', '4px')
          .style('font-size', '12px')
          .style('pointer-events', 'none')
          .style('z-index', '1000')
          .style('opacity', 0);

        tooltip.transition().duration(200).style('opacity', 1);

        tooltip
          .html(
            `<strong>${d.data.name}</strong><br/>${
              d.data.value ? `Value: ${formatNumber(d.data.value)}` : 'Department'
            }`
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 10 + 'px');
      })
      .on('mouseout', function (event, d) {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', (d) => (d.children ? 8 : 6));

        d3.selectAll('.tooltip').remove();
      });
  };

  useEffect(() => {
    if (data) {
      drawTree(data);
    }
  }, [data, isDark, settings, getColorScheme, formatNumber]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);

      // Validate data structure
      if (!jsonData.name) {
        throw new Error(
          'Invalid data format. Expected hierarchical data with name property.'
        );
      }

      setData(jsonData);
    } catch (err) {
      setError('Error parsing file: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    setData(sampleData);
    setError(null);
  };

  const downloadSampleData = () => {
    const dataStr = JSON.stringify(sampleData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tree-chart-sample-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetData = () => {
    setData(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <svg
              className="w-8 h-8 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Tree Chart
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Visualize hierarchical data structures and organizational
            relationships with tree charts.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={loadSampleData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Load Sample Data
            </button>

            <button
              onClick={downloadSampleData}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Sample
            </button>

            <label className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Upload Data
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={resetData}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reset
            </button>
          </div>

          {isLoading && (
            <div className="mt-4 text-blue-600 dark:text-blue-400">
              Loading data...
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {/* Chart Header with Export Button */}
          {data && (
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Organizational Structure
              </h3>
              <ChartExportButton 
                chartRef={chartRef}
                chartType="tree"
                filename="tree-chart"
                className="ml-4"
              />
            </div>
          )}
          
          <div className="h-96 flex items-center justify-center" ref={chartRef}>
            {data ? (
              <svg ref={svgRef} className="w-full h-full"></svg>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <p className="text-lg">No data loaded</p>
                  <p className="text-sm">
                    Upload a JSON file or load sample data to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Format Info */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Expected Data Format
          </h3>
          <pre className="text-sm text-blue-800 dark:text-blue-200 overflow-x-auto">
            {`{
  "name": "Company",
  "children": [
    {
      "name": "Engineering",
      "children": [
        { "name": "Frontend", "value": 15 },
        { "name": "Backend", "value": 20 }
      ]
    },
    {
      "name": "Marketing",
      "children": [
        { "name": "Digital", "value": 12 },
        { "name": "Content", "value": 10 }
      ]
    }
  ]
}`}
          </pre>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
            Note: Each node should have a "name" property. Leaf nodes can have a
            "value" property for display. Parent nodes should have a "children"
            array containing their child nodes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TreeChart;
