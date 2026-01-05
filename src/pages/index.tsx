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
  getCountFromServer,
  getDocs,
  startAfter,
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

  const [totalItems, setTotalItems] = useState(0);
  const [featuredNews, setFeaturedNews] = useState<News[]>([]);
  const [rawNewsList, setRawNewsList] = useState<News[]>([]);
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [displayedNews, setDisplayedNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const isSearchMode = !!searchQuery?.trim();

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

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset to page 1 when search query changes
  useEffect(() => {
    if (searchQuery.trim() && currentPage !== 1) {
      goToPage(1);
    }
  }, [searchQuery]);

  // 1. Fetch Total Count whenever category changes
  useEffect(() => {
    const fetchCount = async () => {
      let q = query(collection(db, "news"));
      if (category && category !== "Home") {
        q = query(collection(db, "news"), where("categories", "array-contains", category as string));
      }
      const snapshot = await getCountFromServer(q);
      setTotalItems(snapshot.data().count);
    };
    fetchCount();
  }, [db, category]);

  // 2. Fetch Featured News
  useEffect(() => {
    if (category && category !== "Home") {
      setFeaturedNews([]);
      return;
    }
    const q = query(collection(db, "news"), where("isFeatured", "==", true), orderBy("createdAt", "desc"), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const news = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toISOString() || "",
        updatedAt: doc.data().updatedAt?.toDate().toISOString() || "",
      } as News));
      setFeaturedNews(news);
    });
    return () => unsubscribe();
  }, [db, category]);

  // 3. Main Data Listener
  useEffect(() => {
    if (unsubscribeRef.current) unsubscribeRef.current();

    // Clear list immediately if we're starting a search to avoid showing old data
    if (debouncedSearch) {
      setRawNewsList([]);
    }
    setLoading(true);

    const fetchData = async () => {
      let baseQuery = query(collection(db, "news"), orderBy("createdAt", "desc"));
      if (category && category !== "Home") {
        baseQuery = query(collection(db, "news"), where("categories", "array-contains", category as string), orderBy("createdAt", "desc"));
      }

      let q;
      if (debouncedSearch) {
        // Reduced to 100 for more "Direct" performance
        q = query(baseQuery, limit(100));
      } else if (currentPage > 1) {
        const skipCount = (currentPage - 1) * PAGE_SIZE;
        const skipQuery = query(baseQuery, limit(skipCount));
        const skipSnapshot = await getDocs(skipQuery);
        const lastVisible = skipSnapshot.docs[skipSnapshot.docs.length - 1];
        q = lastVisible ? query(baseQuery, startAfter(lastVisible), limit(PAGE_SIZE)) : query(baseQuery, limit(PAGE_SIZE));
      } else {
        q = query(baseQuery, limit(PAGE_SIZE));
      }

      const unsubscribe = onSnapshot(q, (snapshot) => {
        let totalBytes = 0;
        const list = snapshot.docs.map((doc) => {
          const data = doc.data();
          totalBytes += doc.id.length + JSON.stringify(data).length;
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate().toISOString() || "",
            updatedAt: data.updatedAt?.toDate().toISOString() || "",
          } as News;
        });


        if (debouncedSearch) {
          debugger
          console.log(`[Search Time] Query: "${debouncedSearch}" | Fetched: ${list.length} | Size: ${(totalBytes / 1024).toFixed(2)} KB`);
        } else {
          debugger
          console.log(`[Reload/Initial Load] Page: ${currentPage} | Fetched: ${list.length} | Size: ${(totalBytes / 1024).toFixed(2)} KB`);
        }

        setRawNewsList(list);
        setLoading(false);
      }, (error) => {
        console.error("Data error:", error);
        setLoading(false);
      });
      unsubscribeRef.current = unsubscribe;
    };

    fetchData();
    return () => unsubscribeRef.current?.();
  }, [db, category, currentPage, debouncedSearch]);

  // 4. Transform Raw Data (Search Filter + Display Slicing)
  useEffect(() => {
    let result = rawNewsList;
    if (debouncedSearch) {
      const queryStr = debouncedSearch.toLowerCase();
      const keywords = queryStr.split(/\s+/).filter(k => k.length > 0);

      if (keywords.length > 0) {
        result = rawNewsList.filter(item => {
          const title = item.title.toLowerCase();
          const content = (item.content || "").toLowerCase();
          return keywords.every(kw => title.includes(kw) || content.includes(kw));
        });

        result.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          if (titleA === queryStr && titleB !== queryStr) return -1;
          if (titleB === queryStr && titleA !== queryStr) return 1;
          const aHasPhrase = titleA.includes(queryStr);
          const bHasPhrase = titleB.includes(queryStr);
          if (aHasPhrase && !bHasPhrase) return -1;
          if (bHasPhrase && !aHasPhrase) return 1;
          return 0;
        });
      }
    }
    setFilteredNews(result);
    // If searching, we slice locally. If not, the rawNewsList IS the current page.
    const itemsToShow = debouncedSearch
      ? result.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
      : result;

    setDisplayedNews(itemsToShow);
    setNewsList(itemsToShow);
  }, [rawNewsList, debouncedSearch, currentPage, setNewsList]);

  // Final calculations
  const totalItemsToDisplay = isSearchMode ? filteredNews.length : totalItems;
  const totalPages = Math.ceil(totalItemsToDisplay / PAGE_SIZE);

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
            {totalItemsToDisplay} article{totalItemsToDisplay !== 1 ? "s" : ""} found
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
                    totalItems={totalItemsToDisplay}
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