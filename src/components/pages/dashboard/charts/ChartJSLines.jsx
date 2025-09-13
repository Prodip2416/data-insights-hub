import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSettings } from '../../../../contexts/SettingsContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartJSLines = ({
  data,
  title,
  onDataPointHover,
  onDataPointClick,
  zoomLevel = 1,
  panOffset = { x: 0, y: 0 },
}) => {
  const { getLineChartColors } = useSettings();
  
  // Check if data is already in Chart.js format or raw data
  const chartData =
    data.labels && data.datasets
      ? data // Already in Chart.js format
      : {
          labels: data.map((item) => item.x || item.month),
          datasets: [
            {
              label: 'Value',
              data: data.map((item) => item.y || item.value),
              ...getLineChartColors(1)[0],
              fill: true,
              tension: 0.4,
            },
          ],
        };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          afterLabel: function (context) {
            if (onDataPointHover) {
              // Handle both Chart.js format and raw data format
              const dataPoint =
                data.labels && data.datasets
                  ? {
                      x: data.labels[context.dataIndex],
                      y: data.datasets[0].data[context.dataIndex],
                    }
                  : data[context.dataIndex];
              onDataPointHover(dataPoint);
            }
            return '';
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
        },
      },
      y: {
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          color: '#6b7280',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
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
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartJSLines;
