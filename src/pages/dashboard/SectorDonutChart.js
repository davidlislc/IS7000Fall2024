import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function SectorDonutChart() {
  const data = {
    labels: [
      'Information Technology',
      'Consumer Discretionary',
      'Financials',
      'Health Care',
      'Industrials',
      'Consumer Staples',
      'Energy',
      'Utilities',
      'Communication Services',
      'Real Estate',
      'Materials',
    ],
    datasets: [
      {
        label: '% Change',
        data: [1.83, 1.37, -1.62, 0.64, -0.60, 0.37, -0.36, 0.15, 1.92, 1.19, 0.50],
        backgroundColor: [
          '#4caf50',
          '#66bb6a',
          '#e57373',
          '#81c784',
          '#ef5350',
          '#aed581',
          '#ff7043',
          '#b2dfdb',
          '#42a5f5',
          '#ba68c8',
          '#ffb74d',
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <h2 className="text-center font-bold text-xl mb-4">Sector Performance</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default SectorDonutChart;
