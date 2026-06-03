import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function AttractionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);

  if (isNaN(id)) {
    notFound();
  }

  const attraction = await prisma.attraction.findUnique({
    where: { id },
  });

  if (!attraction) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            กลับหน้าหลัก
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          <div className="h-80 sm:h-96 w-full relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={attraction.imageUrl} 
              alt={attraction.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-blue-600 shadow-lg">
              {attraction.region}
            </div>
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
              {attraction.name}
            </h1>
            
            <div className="prose prose-blue max-w-none mb-12 text-gray-700 text-lg leading-relaxed">
              <p>{attraction.description}</p>
            </div>

            <div className="border-t border-gray-100 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                แผนที่ตั้ง
              </h2>
              <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-md border border-gray-200">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src={`https://maps.google.com/maps?q=${attraction.latitude},${attraction.longitude}&z=15&output=embed`}
                  title={`แผนที่ ${attraction.name}`}
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
