'use client';

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  Query,
  DocumentData,
  limit,
} from "firebase/firestore";
import { app } from "@/lib/firebase";

import { useSearchStore } from "@/store/useSearchStore";
import { useNewsStore, News } from "@/store/useNewsStore";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ResponsiveAd } from "@/components/common/ads/ResponsiveAd";
import NewsCard from "@/view/NewsCard";
import LandingLayout from "@/layouts/LandingLayout";
import Pagination from "@/components/common/Pagination";

const PAGE_SIZE = 12;

export default function Home() {
  const router = useRouter();
  const { category = "Home", page: pageQuery } = router.query;
  const { searchQuery } = useSearchStore();
  const { setNewsList } = useNewsStore();

  const currentPage = Math.max(1, parseInt(pageQuery as string) || 1);

  const [featuredNews, setFeaturedNews] = useState<News[]>([]);
  const [allNews, setAllNews] = useState<News[]>([]);           // Real-time full list
  const [filteredNews, setFilteredNews] = useState<News[]>([]); // After category + search
  const [displayedNews, setDisplayedNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  // Update URL page
  const goToPage = useCallback(
    (page: number) => {
      const newQuery: any = { ...router.query };
      if (page === 1) delete newQuery.page;
      else newQuery.page = page;

      router.push({ pathname: router.pathname, query: newQuery }, undefined, {
        shallow: true,
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });

    },
    [router]
  );

  // 1. Real-time: Listen to ALL news (or filtered by category)
  useEffect(() => {
    if (unsubscribeRef.current) unsubscribeRef.current();

    setLoading(true);

    let q: Query<DocumentData> = query(
      collection(db, "news"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    // Apply category filter if not "Home"
    if (category && category !== "Home") {
      q = query(
        collection(db, "news"),
        where("categories", "array-contains", category as string),
        orderBy("createdAt", "desc"),
        limit(50)
      );
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newsList: News[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toISOString() || "",
          updatedAt: doc.data().updatedAt?.toDate().toISOString() || "",
        } as News));

        // Separate featured
        const featured = newsList.filter((n) => n.isFeatured);
        const regular = newsList.filter((n) => !n.isFeatured);

        setFeaturedNews(featured);
        setAllNews(regular); // Only non-featured in main list

        setLoading(false);
      },
      (error) => {
        console.error("Realtime listener error:", error);
        setLoading(false);
      }
    );

    unsubscribeRef.current = unsubscribe;

    return () => {
      unsubscribeRef.current?.();
    };
  }, [db, category]);

  // 2. Real-time Search + Category Filtering (client-side on live data)
  useEffect(() => {
    if (!allNews.length) {
      setFilteredNews([]);
      return;
    }

    let result = allNews;

    // Apply search
    if (searchQuery?.trim()) {
      const term = searchQuery.toLowerCase().trim();
      result = allNews.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.content?.toLowerCase().includes(term) ||
          item.categories.some((c) => c.toLowerCase().includes(term))
      );
    }

    setFilteredNews(result);
  }, [allNews, searchQuery]);

  // 3. Real-time Pagination (updates instantly when new article added)
  useEffect(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageItems = filteredNews.slice(start, end);
    setDisplayedNews(pageItems);
    setNewsList(pageItems);
  }, [filteredNews, currentPage, setNewsList]);

  // Final calculations
  const isSearchMode = !!searchQuery?.trim();
  const totalItems = filteredNews.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  // Auto-reset to page 1 if current page becomes invalid
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      goToPage(1);
    }
  }, [currentPage, totalPages, goToPage]);
  return (
    <div>
      {/* Featured Carousel - Only on Home & no search */}
      {(!category || category === "Home") && featuredNews.length > 0 && !isSearchMode && (
        <div className="overflow-hidden mb-8 rounded-xl" ref={emblaRef}>
          <div className="flex">
            {featuredNews.map((news) => (
              <div key={news.id} className="flex-[0_0_100%] md:flex-[0_0_50%] p-2">
                <NewsCard news={news} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Title */}
      {category && category !== "Home" && !isSearchMode && (
        <div className="mb-8">
          <h1 className="text-4xl font-bold capitalize">{category}</h1>
          <div className="h-1 w-24 bg-blue-600 mt-3 rounded-full" />
        </div>
      )}

      {/* Search Results Header */}
      {isSearchMode && (
        <div className="mb-8 rounded-lg">
          <p className="text-xl">
            Search results for:{" "}
            <strong className="text-blue-600 dark:text-blue-400">"{searchQuery}"</strong>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {totalItems} article{totalItems !== 1 ? "s" : ""} found
          </p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main News Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="min-h-[60vh] flex items-center justify-center w-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Loading...</p>
              </div>
            </div>
          ) : displayedNews.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-2xl font-medium">
                {isSearchMode
                  ? `No results found for "${searchQuery}"`
                  : category && category !== "Home"
                    ? `No articles in ${category} yet`
                    : "No news available at the moment"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {displayedNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>

              {/* Real-time Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    onPageChange={goToPage}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar Ads */}
        <aside className="w-full lg:w-80">
          {!loading && displayedNews.length > 0 && (
            <div className="sticky top-24 space-y-6">
              <div className="bg-gray-100 dark:bg-gray-800 border-2 border-dashed rounded-xl p-6 text-center">
                <p className="text-xs text-gray-500 mb-3">Advertisement</p>
                <ResponsiveAd dataAdSlot="2285841467" />
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-xl flex items-center justify-center text-gray-500 font-medium">
                300×250 Ad
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <LandingLayout>{page}</LandingLayout>;
};