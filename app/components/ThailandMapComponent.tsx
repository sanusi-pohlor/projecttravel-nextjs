'use client';

import Thailand from '@react-map/thailand';
import provincesData from '@/lib/provinces.json';
import { Province } from '@/lib/types';

interface ThailandMapComponentProps {
  selectedProvince: Province | null;
  onSelectProvince: (province: Province | null) => void;
}

const ThailandMapComponent = ({ selectedProvince, onSelectProvince }: ThailandMapComponentProps) => {

  const handleProvinceClick = (provinceName: string | null) => {
    if (provinceName) {
      const province = provincesData.find(p => p.name_th === provinceName);
      if (province) {
        onSelectProvince(province);
      } else {
        onSelectProvince(null);
      }
    } else {
      onSelectProvince(null);
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex-grow flex items-center justify-center">
        <Thailand
          className="w-full h-full"
          onSelect={handleProvinceClick}
          type="select-single"
          hoverColor="#3B82F6"
          selectColor="#2563EB"
          strokeColor="#d89f9fff"
          strokeWidth={1}
        />
      </div>

      {/* Floating Info Card */}
      {selectedProvince && (
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-xl border border-gray-100 max-w-sm animate-fade-in-up">
          <h2 className="text-lg font-bold text-gray-800 mb-2">{selectedProvince.name_th}</h2>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-semibold text-gray-700">English:</span> {selectedProvince.name_en}</p>
            <p><span className="font-semibold text-gray-700">Zip Code:</span> {selectedProvince.zip_code}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThailandMapComponent;
