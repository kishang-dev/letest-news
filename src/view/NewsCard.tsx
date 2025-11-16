'use client'

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TimeAgo from '@/components/common/TimeAgo';

type News = {
  id: string;
  title: string;
  content: string;
  categories: string[];
  createdAt: any;
  updatedAt?: any;
};

export default function NewsCard({ news }: { news: News }) {
  const router = useRouter();


  const extractFirstImageUrl = (htmlContent: string): string | null => {
  if (!htmlContent) return null;
  
  try {
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Find the first img element
    const firstImg = tempDiv.querySelector('img');
    
    if (firstImg) {
      const src = firstImg.getAttribute('src');
      // Handle relative URLs by converting them to absolute URLs if needed
      if (src) {
        // If it's a relative URL, you might want to prepend your domain
        if (src.startsWith('/')) {
          return `${window.location.origin}${src}`;
        }
        return src;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting image from HTML:', error);
    return null;
  }
};


  const firstImageUrl = extractFirstImageUrl(news?.content);

  console.log('Extracted Image URL:', firstImageUrl);
  
  return (
    <div
      key={news?.id}
      className="h-full group cursor-pointer rounded-lg overflow-hidden transition-colors duration-300 
             bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
      onClick={() => router.push(`/${news?.id}`)}
    >
      {/* Image Section with Lazy Loading */}
      <div className="relative overflow-hidden h-48">
        <Image
          src={firstImageUrl || 'https://placehold.co/600x400/png'}
          alt={news?.title || 'News article image'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3
          className="text-lg font-semibold mb-3 line-clamp-3 transition-colors duration-300 
                 text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400"
        >
          {news?.title}
        </h3>
        <h6 className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          <TimeAgo date={news?.createdAt} />
        </h6>
      </div>
    </div>
  );
}