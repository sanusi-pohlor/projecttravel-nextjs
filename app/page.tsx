'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThailandMapComponent from '@/app/components/ThailandMapComponent';
import DashboardHeader from '@/app/components/DashboardHeader';
import { Province } from '@/lib/types';
import { regions, attractions } from '@/lib/attractions';

const Home = () => {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('north');

  const filteredAttractions = attractions.filter(attraction => attraction.region === selectedRegion);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <DashboardHeader selectedProvince={selectedProvince} />

        {/* Attractions Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">สถานที่ท่องเที่ยวยอดนิยม</h2>

          {/* Region Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedRegion === region.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {region.name}
              </button>
            ))}
          </div>

          {/* Attractions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((attraction) => (
              <Link href={`/attractions/${attraction.id}`} key={attraction.id} className="group cursor-pointer">
                <div className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-white h-full flex flex-col">
                  <div className="relative h-48 w-full">
                    <Image
                      src={attraction.imageUrl}
                      alt={attraction.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">{attraction.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{attraction.description}</p>
                    <div className="mt-auto">
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md font-medium">
                        {attraction.province}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {filteredAttractions.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500">
                ไม่มีข้อมูลสถานที่ท่องเที่ยวในภูมิภาคนี้
              </div>
            )}
          </div>
        </div>

        {/* Map Section (Original functionality) */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-[600px] relative">
          <div className="absolute inset-0 p-4">
            <ThailandMapComponent
              selectedProvince={selectedProvince}
              onSelectProvince={setSelectedProvince}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;