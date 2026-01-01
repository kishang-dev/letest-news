'use client'

import Image from 'next/image';
import TimeAgo from '@/components/common/TimeAgo';
import { useRouter } from 'next/router';

type News = {
  id: string;
  title: string;
  content: string;
  categories: string[];
  createdAt: any;
  updatedAt?: any;
  image?: string; // Add explicit image field
};

export default function NewsCard({ news }: { news: News }) {
  const router = useRouter();


  const extractFirstImageUrl = (htmlContent: string): string | null => {
    if (!htmlContent) return null;

    try {
      // Use regex to find the first img tag and extract src
      // This works on both client and server side
      const imgRegex = /<img[^>]+src="([^">]+)"/i;
      const match = htmlContent.match(imgRegex);

      if (match && match[1]) {
        let src = match[1];

        // Handle relative URLs
        if (src.startsWith('/')) {
          // On server side, we might not have window.location
          // But for images, they should usually be absolute URLs (Firebase Storage)
          // If strictly relative, we try to use process.env.NEXT_PUBLIC_URL or window.location
          if (typeof window !== 'undefined') {
            return `${window.location.origin}${src}`;
          }
          return src; // Return as is for SSR if we can't resolve origin
        }
        return src;
      }
      return null;
    } catch (error) {
      console.error('Error extracting image from HTML:', error);
      return null;
    }
  };


  // Prioritize explicitly set image, then fallback to content extraction
  const displayImage = news.image || extractFirstImageUrl(news?.content);

  console.log('Display Image URL:', displayImage);

  return (
    <div
      key={news?.id}
      className="h-full group cursor-pointer rounded-lg overflow-hidden transition-colors duration-300 
             bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
      onClick={() => {

        router.push({
          pathname: "/news",
          query: { id: news.id },
        })
      }

      }
    >
      {/* Image Section with Lazy Loading */}
      <div className="relative overflow-hidden h-48">
        <Image
          src={displayImage || 'https://placehold.co/600x400/png?text=No+Image'}
          alt={news?.title || 'News article image'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          // placeholder="blur" // Disable blur placeholder to avoid base64 large string complexity + potential hydration mismatch
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