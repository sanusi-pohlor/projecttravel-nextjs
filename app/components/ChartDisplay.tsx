'use client';

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Province } from '@/lib/types';

interface ChartDisplayProps {
  selectedProvince: Province | null;
}

const ChartDisplay = ({ selectedProvince }: ChartDisplayProps) => {
  // Mock data state
  const [pieSeries, setPieSeries] = useState([44, 55, 13, 43]);
  const [barSeries, setBarSeries] = useState([{ name: 'Visitors', data: [30, 40, 45, 50, 49, 60, 70, 91] }]);

  // Update charts when province changes
  useEffect(() => {
    if (selectedProvince) {
      // Generate random data based on province ID to simulate unique data
      const seed = selectedProvince.id;
      const randomSeries = [
        (seed * 12) % 100,
        (seed * 45) % 100,
        (seed * 23) % 100,
        (seed * 67) % 100
      ];
      setPieSeries(randomSeries);

      const randomBarData = Array.from({ length: 8 }, (_, i) => (seed * (i + 1) * 7) % 100);
      setBarSeries([{ name: 'Visitors', data: randomBarData }]);
    } else {
      // Default data
      setPieSeries([44, 55, 13, 43]);
      setBarSeries([{ name: 'Visitors', data: [30, 40, 45, 50, 49, 60, 70, 91] }]);
    }
  }, [selectedProvince]);

  const pieOptions: ApexCharts.ApexOptions = {
    labels: ['Hotels', 'Attractions', 'Restaurants', 'Transport'],
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
    legend: { position: 'bottom' },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '65%'
        }
      }
    }
  };

  const barOptions: ApexCharts.ApexOptions = {
    chart: {
      toolbar: { show: false },
      fontFamily: 'inherit'
    },
    colors: ['#3B82F6'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    grid: {
      borderColor: '#f3f4f6',
      strokeDashArray: 4,
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: { borderRadius: 4 }
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          {selectedProvince ? `Statistics: ${selectedProvince.name_th}` : 'National Statistics'}
        </h2>
        <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-green-100 text-green-800">
          Live Data
        </span>
      </div>

      <div className="flex-grow flex flex-col space-y-6 overflow-y-auto pr-2 custom-scrollbar">
        {/* Pie Chart Card */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-600 mb-4">Revenue Distribution</h3>
          <div className="h-64">
            <Chart options={pieOptions} series={pieSeries} type="donut" height="100%" />
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-600 mb-4">Monthly Visitors (k)</h3>
          <div className="h-64">
            <Chart options={barOptions} series={barSeries} type="bar" height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDisplay;
