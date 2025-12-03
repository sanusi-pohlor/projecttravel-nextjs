'use client';

import { Province } from '@/lib/types';

interface DashboardHeaderProps {
    selectedProvince: Province | null;
}

const DashboardHeader = ({ selectedProvince }: DashboardHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Thailand Travel Dashboard</h1>
                <p className="text-gray-500 mt-1">Explore provinces and view statistics</p>
            </div>
            {selectedProvince ? (
                <div className="mt-4 md:mt-0 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium border border-blue-100">
                    Selected: {selectedProvince.name_th}
                </div>
            ) : (
                <div className="mt-4 md:mt-0 px-4 py-2 bg-gray-50 text-gray-500 rounded-lg font-medium border border-gray-100">
                    Select a province to begin
                </div>
            )}
        </div>
    );
};

export default DashboardHeader;
