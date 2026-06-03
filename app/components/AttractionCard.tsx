import Link from 'next/link';

interface AttractionCardProps {
  id: number;
  name: string;
  description: string;
  region: string;
  imageUrl: string;
}

export default function AttractionCard({ id, name, description, region, imageUrl }: AttractionCardProps) {
  return (
    <Link href={`/attractions/${id}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col hover:-translate-y-1">
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-10"
            loading="lazy"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-blue-600 shadow-sm z-20">
            {region}
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <p className="text-gray-600 line-clamp-3 text-sm flex-grow">
            {description}
          </p>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-medium text-blue-600">
            <span>ดูรายละเอียด</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
