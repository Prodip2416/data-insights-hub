import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSettings } from '../../../../contexts/SettingsContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartJSPie = ({
  data,
  title,
  onDataPointHover,
  onDataPointClick,
  zoomLevel = 1,
  panOffset = { x: 0, y: 0 },
}) => {
  const { getColorScheme } = useSettings();
  
  // Check if data is already in Chart.js format or raw data
  const chartData =
    data.labels && data.datasets
      ? data // Already in Chart.js format
      : {
          labels: data.map((item) => item.label || item.category),
          datasets: [
            {
              data: data.map((item) => item.value || item.users),
              backgroundColor: getColorScheme(4).map(color => color.replace('rgb', 'rgba').replace(')', ', 0.8)')),
              borderColor: getColorScheme(4),
              borderWidth: 2,
            },
          ],
        };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);

            if (onDataPointHover) {
              onDataPointHover(data[context.dataIndex]);
            }

            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0 && onDataPointClick) {
        const elementIndex = elements[0].index;
        onDataPointClick(data[elementIndex]);
      }
    },
    onHover: (event, elements) => {
      if (elements.length > 0 && onDataPointHover) {
        const elementIndex = elements[0].index;
        onDataPointHover(data[elementIndex]);
      }
    },
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <div className="h-80">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartJSPie;
