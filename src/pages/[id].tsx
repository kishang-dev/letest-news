"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";
import LandingLayout from "@/layouts/LandingLayout";
import Image from "next/image";

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // this is the Firestore document ID (direct)

  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || typeof id !== "string") return; // safety check

    const db = getFirestore(app);

    const fetchNews = async () => {
      setLoading(true);

      try {
        const ref = doc(db, "news", id);  // ✔ use id directly
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setNews({
            id,
            ...snap.data(),
          });
        }
      } catch (error) {
        console.error("Error loading news:", error);
      }

      setLoading(false);
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">Loading...</p>
    );
  }

  if (!news) {
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        News not found.
      </p>
    );
  }

  return (
    <div className="container mx-auto md:px-4 md:py-10 min-h-screen flex flex-col lg:flex-row gap-6">

      {/* LEFT CONTENT */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{news.title}</h1>

        {news.image && (
          <Image
            src={news.image}
            alt={news.title}
            className="w-full rounded-lg mb-6"
          />
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
