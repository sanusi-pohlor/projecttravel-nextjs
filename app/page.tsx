'use client';

import { useState } from 'react';
import ThailandMapComponent from '@/app/components/ThailandMapComponent';
import ChartDisplay from '@/app/components/ChartDisplay';
import DashboardHeader from '@/app/components/DashboardHeader';
import { Province } from '@/lib/types';

const Home = () => {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <DashboardHeader selectedProvince={selectedProvince} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Map Section */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-[600px] lg:h-[1000px] relative">
              <div className="absolute inset-0 p-4">
                <ThailandMapComponent
                  selectedProvince={selectedProvince}
                  onSelectProvince={setSelectedProvince}
                />
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-full">
              <ChartDisplay selectedProvince={selectedProvince} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;