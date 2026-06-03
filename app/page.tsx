import { PrismaClient } from '@prisma/client';
import AttractionCard from './components/AttractionCard';

const prisma = new PrismaClient();

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const region = resolvedSearchParams.region;
  
  let attractions;
  
  if (region) {
    attractions = await prisma.attraction.findMany({
      where: { region },
      orderBy: { createdAt: 'desc' }
    });
  } else {
    attractions = await prisma.attraction.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4">
            <span className="block text-blue-600">สถานที่ท่องเที่ยวไทย</span>
            <span className="block text-gray-900 text-3xl mt-2">สัมผัสความสวยงามของประเทศไทย</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {region ? `สถานที่ท่องเที่ยวยอดนิยมใน ${region}` : 'สถานที่ท่องเที่ยวยอดนิยมในทุกภูมิภาคที่เราคัดสรรมาเพื่อคุณ'}
          </p>
        </div>
        
        {attractions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction) => (
              <AttractionCard 
                key={attraction.id}
                id={attraction.id}
                name={attraction.name}
                description={attraction.description}
                region={attraction.region}
                imageUrl={attraction.imageUrl}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">ไม่พบสถานที่ท่องเที่ยวในหมวดหมู่นี้</p>
          </div>
        )}
      </div>
    </div>
  );
}