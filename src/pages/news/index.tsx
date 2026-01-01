"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getFirestore, doc, onSnapshot, Timestamp, getDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";
import LandingLayout from "@/layouts/LandingLayout";
import Image from "next/image";
import Head from "next/head";

import {
  Facebook,
  Instagram,
  Copy,
  MessageCircle,
  Send,
} from "lucide-react";

// Types
interface NewsData {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt?: any; // Serialized Timestamp (string/number) or Firestore Object
  [key: string]: any;
}

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query as { id?: string };

  const [news, setNews] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamic URL & Site Info
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const siteName = "WORLD NEWS";
  const defaultOgImage = "https://worldwideshortnews.com/world-news.png";

  // Extract first image from HTML content
  const extractFirstImageFromContent = (html: string): string | null => {
    if (!html) return null;

    // Regex based extraction to work on SSR
    const imgRegex = /<img[^>]+src="([^">]+)"/i;
    const match = html.match(imgRegex);

    if (match && match[1]) {
      let src = match[1];
      if (src.startsWith("/")) {
        if (typeof window !== "undefined") {
          return `${window.location.origin}${src}`;
        }
        // Fallback for SSR
        return src;
      } else if (!src.startsWith("http")) {
        // Try to handle other relative paths if possible, or just return them
        if (typeof window !== "undefined") {
          return new URL(src, window.location.origin).href;
        }
      }
      return src;
    }
    return null;
  };

  // Best OG Image Selection
  const getOgImage = (): string => {
    let imageUrl = defaultOgImage;

    if (news?.image) {
      if (typeof window !== "undefined") {
        imageUrl = news.image.startsWith("http") ? news.image : `${window.location.origin}${news.image}`;
      } else {
        imageUrl = news.image; // SSR fallback, assume absolute or handle later
      }
    } else if (news?.content && typeof window !== "undefined") {
      const contentImage = extractFirstImageFromContent(news.content);
      if (contentImage) imageUrl = contentImage;
    }

    return imageUrl;
  };

  // Clean description
  const getDescription = (): string => {
    if (!news?.content) return "Read the latest world news and updates.";
    const text = news.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    return text.length > 200 ? text.slice(0, 197) + "..." : text;
  };

  // Real-time listener to fetch and keep data fresh
  useEffect(() => {
    if (!id) return;

    const db = getFirestore(app);
    const newsRef = doc(db, "news", id);

    const unsubscribe = onSnapshot(
      newsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setNews({
            id: snapshot.id,
            ...snapshot.data(),
          } as NewsData);
          setLoading(false);
        } else {
          setNews(null);
          setError("Article not found.");
          setLoading(false);
        }
      },
      (err) => {
        console.error("Error fetching news:", err);
        setError("Failed to load the article.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link");
    }
  };

  // Share methods...
  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${news?.title}\n${pageUrl}`)}`, "_blank");
  };

  const shareToTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(news?.title || "")}`, "_blank");
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, "_blank");
  };

  const shareToInstagram = () => {
    navigator.clipboard.writeText(pageUrl);
    alert("Link copied! Open Instagram app → Tap + → Story → Paste link");
    setTimeout(() => {
      const url = "instagram://app";
      window.open(url, "_blank") || window.open("https://instagram.com", "_blank");
    }, 1000);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading article...</p>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-red-500 text-lg mb-6">{error || "Article not found"}</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const ogImage = getOgImage();
  const title = `${news.title} | ${siteName}`;
  const description = getDescription();

  // Helper date formatter safe for SSR/Hydration match
  const publishDate = news.createdAt
    ? (typeof news.createdAt.toDate === 'function'
      ? news.createdAt.toDate().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      : new Date(news.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }))
    : "Recently";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        {/* Open Graph */}
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={news.title} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={news.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={news.title} />
      </Head>

      <div className="container mx-auto md:px-4 py-8 min-h-screen flex flex-col lg:flex-row gap-8">
        <article className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            {news.title}
          </h1>

          {/* Display Featured Image or First Content Image */}
          {/* {(news.image || extractFirstImageFromContent(news.content)) && (
            <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={news.image || extractFirstImageFromContent(news.content) || ""}
                alt={news.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )} */}

          <div
            className="prose prose-lg max-w-none dark:prose-invert ck-content 
                       prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                       prose-p:text-justify prose-p:leading-relaxed prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
              Share this article:
            </p>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button onClick={shareToWhatsApp} className="p-2 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-600 border border-green-500/30 transition-all"><MessageCircle size={15} /></button>
              <button onClick={shareToTelegram} className="p-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/30 transition-all"><Send size={15} /></button>
              <button onClick={shareToFacebook} className="p-2 rounded-full bg-blue-700/10 hover:bg-blue-700/20 text-blue-700 border border-blue-700/30 transition-all"><Facebook size={15} /></button>
              <button onClick={shareToInstagram} className="p-2 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 text-white shadow-sm transition-all"><Instagram size={15} /></button>
              <button onClick={handleCopyLink} className="p-2 rounded-full bg-gray-500/10 hover:bg-gray-500/20 text-gray-700 border border-gray-500/30 transition-all"><Copy size={15} /></button>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            Published on {publishDate}
          </p>
        </article>

        <aside className="w-full lg:w-80 xl:w-96">
          <div className="sticky top-6 space-y-6">
            <div className="bg-gray-100 border-2 border-dashed rounded-xl p-6 text-center">
              <p className="text-gray-500 text-sm mb-3">Advertisement</p>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
                <span className="text-gray-400">300×600 Ad</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};



DetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default DetailPage;