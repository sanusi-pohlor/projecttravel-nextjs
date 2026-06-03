import { attractions, regions } from '@/lib/attractions';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface AttractionDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return attractions.map((attraction) => ({
    id: attraction.id.toString(),
  }));
}

export default async function AttractionDetailPage({ params }: AttractionDetailPageProps) {
  // Await the params object before accessing its properties.
  // In newer versions of Next.js, 'params' can be a Promise in Page components.
  const resolvedParams = await params;
  const attractionId = parseInt(resolvedParams.id, 10);
  const attraction = attractions.find(a => a.id === attractionId);

  if (!attraction) {
    notFound();
  }

  const region = regions.find(r => r.id === attraction.region);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Navigation Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">หน้าแรก</Link>
          <span>/</span>
          <span>{region?.name}</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">{attraction.name}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

          {/* Header Image */}
          <div className="relative w-full h-[400px] md:h-[500px]">
            <Image
              src={attraction.imageUrl}
              alt={attraction.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{attraction.name}</h1>
              <div className="flex items-center space-x-4">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {attraction.province}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {region?.name}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Description Details */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">รายละเอียด</h2>
                <p className="text-gray-600 leading-relaxed">
                  {attraction.description}
                </p>
              </div>
            </div>

            {/* Map Info */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">แผนที่ตั้ง</h2>
              <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 h-[400px] w-full">
                <iframe
                  src={attraction.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map showing location of ${attraction.name}`}
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
