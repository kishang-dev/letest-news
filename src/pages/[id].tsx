"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { app } from "@/lib/firebase";
import LandingLayout from "@/layouts/LandingLayout";
import Image from "next/image";

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // this is the Firestore document ID (direct)

  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return; // safety check

    const db = getFirestore(app);
    const newsRef = doc(db, "news", id);

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      newsRef,
      (snapshot) => {
        setLoading(false);
        
        if (snapshot.exists()) {
          setNews({
            id: snapshot.id,
            ...snapshot.data(),
          });
          setError(null);
        } else {
          setNews(null);
          setError("News not found");
        }
      },
      (err) => {
        console.error("Error loading news:", err);
        setError("Failed to load news");
        setLoading(false);
      }
    );

    // Cleanup listener on unmount or when id changes
    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 min-h-screen">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="container mx-auto px-4 py-10 min-h-screen">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">
            {error || "News not found"}
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto md:px-4 md:py-10 min-h-screen flex flex-col lg:flex-row gap-6">
      {/* LEFT CONTENT */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{news.title}</h1>

        {news.image && (
          <div className="relative w-full h-96 mb-6">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}

        <div
          className="prose max-w-none w-full dark:prose-invert ck-content prose-p:text-justify prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />

        <p className="text-sm text-gray-500 mt-6">
          Published on{" "}
          {news.createdAt?.toDate
            ? news.createdAt.toDate().toLocaleDateString()
            : "Unknown date"}
        </p>
      </div>

      {/* RIGHT ADS */}
      <div className="w-full sm:w-80 lg:w-64 xl:w-72">
        <div className="sticky top-4 space-y-4">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-sm mb-2">Advertisement</p>
            <div className="bg-gray-200 h-96 rounded flex items-center justify-center">
              <span className="text-gray-400">Ad Space 300x400</span>
            </div>
          </div>

          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-sm mb-2">Advertisement</p>
            <div className="bg-gray-200 h-64 rounded flex items-center justify-center">
              <span className="text-gray-400">Ad Space 300x250</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default DetailPage;