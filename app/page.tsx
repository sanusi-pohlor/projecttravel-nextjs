'use client';

import ThailandMapComponent from '@/app/components/ThailandMapComponent';
import ChartDisplay from '@/app/components/ChartDisplay';

const Home = () => {


  return (
    <div className="w-screen overflow-hidden">
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="md:w-1/2">
          <ThailandMapComponent />
        </div>
        <div className="md:w-1/2">
          <ChartDisplay />
        </div>
    </div>
    </div>
  );
};

export default Home;