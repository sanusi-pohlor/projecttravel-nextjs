'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Province } from '@/lib/types';
import ThailandMap from '@/app/components/ThailandMapComponent';

const ChartDisplay = dynamic(() => import('@/app/components/ChartDisplay'), { ssr: false });

const DashboardPage = () => {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);

  const handleSelectProvince = (province: Province | null) => {
    setSelectedProvince(province);
  };

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4 p-4">Dashboard</h1>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        <div className="h-full">
          <ThailandMap
            selectedProvince={selectedProvince}
            onSelectProvince={handleSelectProvince}
          />
        </div>
        <div className="h-full">
          <ChartDisplay selectedProvince={selectedProvince} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
