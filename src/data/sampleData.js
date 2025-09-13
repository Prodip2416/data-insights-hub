// Sample data for the dashboard
export const performanceMetrics = [
  {
    name: 'Total Users',
    value: '12,345',
    change: '+12%',
    trend: 'up',
  },
  {
    name: 'Revenue',
    value: '$45,678',
    change: '+8%',
    trend: 'up',
  },
  {
    name: 'Conversion Rate',
    value: '3.2%',
    change: '-2%',
    trend: 'down',
  },
  {
    name: 'Active Sessions',
    value: '8,901',
    change: '+15%',
    trend: 'up',
  },
];

export const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.1,
    },
    {
      label: 'Profit',
      data: [8000, 12000, 10000, 18000, 15000, 22000],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.1,
    },
  ],
};

export const userEngagementData = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [45, 35, 20],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 205, 86, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 205, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export const geographicData = [
  { country: 'USA', value: 45 },
  { country: 'Canada', value: 25 },
  { country: 'UK', value: 20 },
  { country: 'Germany', value: 15 },
  { country: 'France', value: 12 },
  { country: 'Australia', value: 8 },
];
