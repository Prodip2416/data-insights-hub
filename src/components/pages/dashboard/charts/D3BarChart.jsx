import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useSettings } from '../../../../contexts/SettingsContext';

const D3BarChart = ({
  data,
  title,
  onDataPointHover,
  onDataPointClick,
  zoomLevel = 1,
  panOffset = { x: 0, y: 0 },
}) => {
  const svgRef = useRef();
  const { isDark } = useTheme();
  const { settings, getColorScheme, formatNumber } = useSettings();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const baseWidth = 400 - margin.left - margin.right;
    const baseHeight = 300 - margin.top - margin.bottom;
    const width = baseWidth * zoomLevel;
    const height = baseHeight * zoomLevel;

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr(
        'transform',
        `translate(${margin.left + panOffset.x},${margin.top + panOffset.y})`
      );

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.category || d.country))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([height, 0]);

    // Add bars
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.category || d.country))
      .attr('width', x.bandwidth())
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => height - y(d.value))
      .attr('fill', (d, i) => d.color || getColorScheme(data.length)[i % getColorScheme(data.length).length])
      .attr('rx', 4)
      .style('cursor', 'pointer')
      .on('mouseover', function (event, d) {
        d3.select(this).transition().duration(200).attr('opacity', 0.8);

        if (onDataPointHover) {
          onDataPointHover(d);
        }

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
          .style('opacity', 0)
          .style('z-index', '1000');

        tooltip
          .html(`${d.category || d.country}: ${formatNumber(d.value)}`)
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 10 + 'px')
          .transition()
          .duration(200)
          .style('opacity', 1);
      })
      .on('mouseout', function () {
        d3.select(this).transition().duration(200).attr('opacity', 1);
        d3.selectAll('.tooltip').remove();
      })
      .on('click', function (event, d) {
        if (onDataPointClick) {
          onDataPointClick(d);
        }
      });

    // Add x-axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', isDark ? '#d1d5db' : '#6b7280');

    // Add y-axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(formatNumber))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', isDark ? '#d1d5db' : '#6b7280');

    // Add grid lines
    if (settings.showGrid) {
      g.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''))
        .style('stroke', isDark ? '#374151' : '#f3f4f6')
        .style('stroke-width', 1);
    }
  }, [data, isDark, settings, getColorScheme, formatNumber]);

  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <div className="flex justify-center">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default D3BarChart;
