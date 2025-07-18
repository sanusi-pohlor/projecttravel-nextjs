'use client';

import { useState } from 'react';
import Thailand from '@react-map/thailand';
import provincesData from '@/lib/provinces.json';

interface Province {
  id: number;
  name_th: string;
  name_en: string;
  zip_code?: string; // zip_code is optional based on the usage in the component
}

const MapPage = () => {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);

  const handleProvinceClick = (provinceName: string | null) => {
    if (provinceName) {
      const province = provincesData.find(p => p.name_th === provinceName);
      if (province) {
        setSelectedProvince(province);
      } else {
        setSelectedProvince(null);
      }
    } else {
      setSelectedProvince(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 flex-grow">
      <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">แผนที่ประเทศไทย</h1>
      <div className="w-3/4 flex-grow mb-8">
        <Thailand
          onSelect={handleProvinceClick}
          type="select-single"
        />
      </div>

      {selectedProvince && (
        <div className="bg-white p-6 rounded-lg shadow-md w-3/4">
          <h2 className="text-xl font-semibold mb-2">ข้อมูลจังหวัด: {selectedProvince.name_th}</h2>
          <p><strong>ชื่อภาษาอังกฤษ:</strong> {selectedProvince.name_en}</p>
          <p><strong>รหัสไปรษณีย์:</strong> {selectedProvince.zip_code}</p>
          {/* Add more province details here as needed */}
        </div>
      )}
      </div>
    </div>
  );
};

export default MapPage;