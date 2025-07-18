
'use client';

import React from 'react';
import Chart from 'react-apexcharts';

const ChartDisplay = () => {
  const pieOptions = {
    labels: ['Group A', 'Group B', 'Group C', 'Group D'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };
  const pieSeries = [400, 300, 300, 200];

  const barOptions = {
    xaxis: {
      categories: ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'],
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };
  const barSeries = [
    {
      name: 'PV',
      data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
    },
    {
      name: 'UV',
      data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold">Chart Data</h2>
      <div className="flex-grow flex flex-col space-y-4">
        <div className="flex-grow bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Chart 1: Pie Chart</h3>
          <Chart options={pieOptions} series={pieSeries} type="pie" height="100%" />
        </div>
        <div className="flex-grow bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Chart 2: Bar Chart</h3>
          <Chart options={barOptions} series={barSeries} type="bar" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default ChartDisplay;
