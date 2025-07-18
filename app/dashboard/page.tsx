import dynamic from 'next/dynamic';
import ThailandMap from '@/app/components/ThailandMapComponent';

const ChartDisplay = dynamic(() => import('@/app/components/ChartDisplay'), { ssr: false });

const DashboardPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4 p-4">Dashboard</h1>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        <div className="h-full">
          <ThailandMap />
        </div>
        <div className="h-full">
          <ChartDisplay />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
