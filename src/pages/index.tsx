'use client';

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  DocumentSnapshot,
  where,
} from "firebase/firestore";
import { app } from "@/lib/firebase";

import { useSearchStore } from "@/store/useSearchStore";
import { useNewsStore, News } from "@/store/useNewsStore";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ResponsiveAd } from "@/components/common/ads/ResponsiveAd";
import NewsCard from "@/view/NewsCard";
import LandingLayout from "@/layouts/LandingLayout";

const INITIAL_PAGE_SIZE = 15;
const LOAD_MORE_SIZE = 10;

const Home = () => {
  const router = useRouter();
  const { category } = router.query;
  const { searchQuery } = useSearchStore();
  const { setNewsList } = useNewsStore();

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [featuredNews, setFeaturedNews] = useState<News[]>([]);
  const [paginatedNews, setPaginatedNews] = useState<News[]>([]);
  const [filteredNewsList, setFilteredNewsList] = useState<News[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const lastDocRef = useRef<DocumentSnapshot | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const db = getFirestore(app);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
    };
  }, []);

  // Real-time listener for featured news
  useEffect(() => {
    const featuredQuery = query(
      collection(db, "news"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      featuredQuery,
      (snapshot) => {
        const featured = snapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              content: data.content,
              categories: data.categories || [],
              createdAt: data.createdAt?.toDate().toISOString() || "",
              updatedAt: data.updatedAt?.toDate().toISOString(),
              isFeatured: data.isFeatured || false,
            } as News;
          })
          .filter((n) => n.isFeatured);

        setFeaturedNews(featured);
      },
      (error) => {
        console.error("Error fetching featured news:", error);
      }
    );

    return () => unsubscribe();
  }, [db]);

  // Fetch initial page of non-featured news (15 items)
  const fetchInitialPage = useCallback(() => {
    setLoading(true);
    setPaginatedNews([]);
    setHasMore(true);
    lastDocRef.current = null;

    if (unsubscribeRef.current) unsubscribeRef.current();

    // Build query based on category
    let q;
    const activeCategory = category && category !== "Home" ? category as string : null;

    if (activeCategory) {
      // Query with category filter using array-contains
      q = query(
        collection(db, "news"),
        where("categories", "array-contains", activeCategory),
        orderBy("createdAt", "desc"),
        limit(INITIAL_PAGE_SIZE)
      );
    } else {
      // Query without category filter
      q = query(
        collection(db, "news"),
        orderBy("createdAt", "desc"),
        limit(INITIAL_PAGE_SIZE)
      );
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: News[] = snapshot.docs
          .map((doc) => {
            const data = doc.data();
            const item = {
              id: doc.id,
              title: data.title,
              content: data.content,
              categories: data.categories || [],
              createdAt: data.createdAt?.toDate().toISOString() || "",
              updatedAt: data.updatedAt?.toDate().toISOString(),
              isFeatured: data.isFeatured || false,
            } as News;

            // Update last doc for pagination
            if (doc.id === snapshot.docs[snapshot.docs.length - 1]?.id) {
              lastDocRef.current = doc;
            }
            return item;
          })
          .filter((n) => !n.isFeatured); // Exclude featured from main list

        setPaginatedNews(items);
        setNewsList(items);
        setHasMore(snapshot.docs.length === INITIAL_PAGE_SIZE);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching initial page:", error);
        setLoading(false);
      }
    );

    unsubscribeRef.current = unsubscribe;
  }, [db, setNewsList, category]);

  // Load more items (10 items per load)
  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore || !lastDocRef.current) return;

    setLoadingMore(true);

    const activeCategory = category && category !== "Home" ? category as string : null;
    let nextQuery;

    if (activeCategory) {
      nextQuery = query(
        collection(db, "news"),
        where("categories", "array-contains", activeCategory),
        orderBy("createdAt", "desc"),
        startAfter(lastDocRef.current),
        limit(LOAD_MORE_SIZE)
      );
    } else {
      nextQuery = query(
        collection(db, "news"),
        orderBy("createdAt", "desc"),
        startAfter(lastDocRef.current),
        limit(LOAD_MORE_SIZE)
      );
    }

    const unsubscribe = onSnapshot(
      nextQuery,
      (snapshot) => {
        const newItems: News[] = snapshot.docs
          .map((doc) => {
            const data = doc.data();
            const item = {
              id: doc.id,
              title: data.title,
              content: data.content,
              categories: data.categories || [],
              createdAt: data.createdAt?.toDate().toISOString() || "",
              updatedAt: data.updatedAt?.toDate().toISOString(),
              isFeatured: data.isFeatured || false,
            } as News;

            if (doc.id === snapshot.docs[snapshot.docs.length - 1]?.id) {
              lastDocRef.current = doc;
            }
            return item;
          })
          .filter((n) => !n.isFeatured);

        setPaginatedNews((prev) => [...prev, ...newItems]);
        setHasMore(newItems.length === LOAD_MORE_SIZE);
        setLoadingMore(false);
      },
      (error) => {
        console.error("Error loading more:", error);
        setLoadingMore(false);
      }
    );

    // Auto-unsubscribe after fetch
    setTimeout(unsubscribe, 1000);
  }, [hasMore, loadingMore, db, category]);

  // Re-fetch on category change
  useEffect(() => {
    fetchInitialPage();
  }, [category, fetchInitialPage]);

  // Filter news by search query only (category filtering is done in Firebase query)
  useEffect(() => {
    let filtered = [...paginatedNews];

    if (searchQuery) {
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.content?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNewsList(filtered);
  }, [paginatedNews, searchQuery]);

  // Embla Carousel
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000 })]
  );

  const getActiveCategoryName = () => {
    if (!category || category === "Home") return "All News";
    return category as string;
  };

  return (
    <div>

      {/* Featured News Carousel - Only on Home */}
      {(!category || category === "Home") && featuredNews.length > 0 && (
        <div className="overflow-hidden mb-8" ref={emblaRef}>
          <div className="flex">
            {featuredNews.map((news) => (
              <div key={news.id} className="flex-[0_0_100%] lg:flex-[0_0_50%] p-2">
                <NewsCard news={news} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Header */}
      {category && category !== "Home" && (
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {getActiveCategoryName()}
          </h2>
          <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
        </div>
      )}

      {/* Search Results Header */}
      {searchQuery && (
        <div className="mb-6">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Search results for:{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              "{searchQuery}"
            </span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Found {filteredNewsList.length} article
            {filteredNewsList.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT SIDE - News Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Loading news...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredNewsList.length > 0 ? (
                  filteredNewsList.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                      {searchQuery
                        ? `No news found for "${searchQuery}"`
                        : category && category !== "Home"
                          ? `No news found in ${category} category`
                          : "No news available"}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                      {searchQuery
                        ? "Try searching with different keywords"
                        : "Please check back later"}
                    </p>
                  </div>
                )}
              </div>

              {/* Load More Button */}
              {hasMore && filteredNewsList.length > 0 && (
                <div className="flex justify-center mt-8 mb-6">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="px-12 py-2 bg-transparent border border-gray-900 text-gray-800 hover:bg-gray-100 disabled:bg-transparent disabled:border-gray-300 disabled:text-gray-400 font-semibold hover:shadow-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loadingMore ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-800 border-r-transparent"></div>
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <span>Load More</span>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* No More Data */}
              {!hasMore && filteredNewsList.length > 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    You've reached the end!
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="h-px w-12 bg-gray-300 dark:bg-gray-700"></div>
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="h-px w-12 bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* RIGHT SIDE - Advertisements */}
        <div className="w-full sm:w-80 lg:w-64 xl:w-72">
          <div className="sticky top-4 space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Advertisement</p>
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded flex items-center justify-center">
                <div className="w-full h-[250px] overflow-hidden">
                  <ResponsiveAd dataAdSlot="2285841467" />
                </div>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Advertisement</p>
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500">Ad Space 300x250</span>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Advertisement</p>
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500">Ad Space 300x250</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default Home;