"use client";

import React, { useState, useEffect } from "react";
import { app } from "@/lib/firebase";
import { getFirestore, collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  Clock, 
  FileText, 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  Search,
  Filter,
  Grid3X3,
  List,
  Newspaper,
  TrendingUp,
  Eye,
  MoreHorizontal
} from "lucide-react";
import withAdminAuth from "@/hoc/withAdminAuth";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

const  NewsList = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const db = getFirestore(app);

  // Fetch news from Firestore
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const newsQuery = query(collection(db, "news"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(newsQuery);
        const newsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as NewsItem[];
        setNewsItems(newsData);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError("Failed to load news. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [db]);

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news article?")) return;
    setError(null);
    setSuccess(null);
    try {
      await deleteDoc(doc(db, "news", id));
      setSuccess("News deleted successfully!");
      // Refresh the list
      const newsQuery = query(collection(db, "news"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(newsQuery);
      const newsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as NewsItem[];
      setNewsItems(newsData);
    } catch (err) {
      console.error("Failed to delete news:", err);
      setError("Failed to delete news. Please try again.");
    }
  };

  // Filter news based on search term
  const filteredNews = newsItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Strip HTML tags for preview
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-8">
            <div className="flex items-center space-x-4 mb-6 lg:mb-0">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  News Dashboard
                </h1>
                <p className="text-indigo-100 text-sm sm:text-base">
                  Manage and publish your news articles
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 text-white/80">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">{newsItems.length} Articles</span>
              </div>
              <Link
                href="/admin/news/manage"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-all duration-200 group border border-white/20"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                <span>Create Article</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white shadow-sm text-indigo-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-sm text-indigo-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:block">Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Status Messages */}
        {error && (
          <div className="mb-6 flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-green-700 font-medium">{success}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Loading articles...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredNews.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchTerm ? 'No articles found' : 'No articles yet'}
            </h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              {searchTerm 
                ? 'Try adjusting your search terms or filters'
                : 'Get started by creating your first news article'
              }
            </p>
            {!searchTerm && (
              <Link
                href="/admin/news/manage"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Article</span>
              </Link>
            )}
          </div>
        )}

        {/* Articles Grid/List */}
        {!loading && filteredNews.length > 0 && (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
              : 'space-y-4'
          }`}>
            {filteredNews.map((item) => (
              <article
                key={item.id}
                className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group ${
                  viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                }`}
              >
                {viewMode === 'grid' ? (
                  // Grid View
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
                          {item.title}
                        </h2>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {item.createdAt?.toDate
                                ? item.createdAt.toDate().toLocaleDateString()
                                : "N/A"}
                            </span>
                          </div>
                          {item.updatedAt?.toDate && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>Updated</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-lg transition-all duration-200">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-gray-600 line-clamp-3 leading-relaxed">
                        {stripHtml(item.content)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Eye className="w-4 h-4" />
                        <span>Draft</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/news/manage?id=${item.id}`}
                          className="inline-flex items-center space-x-1 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium rounded-lg transition-all duration-200 group/edit"
                        >
                          <Edit3 className="w-4 h-4 group-hover/edit:scale-110 transition-transform duration-200" />
                          <span>Edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center space-x-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-all duration-200 group/delete"
                        >
                          <Trash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform duration-200" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View
                  <>
                    <div className="flex-1 p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
                        <h2 className="text-xl font-bold text-gray-900 mb-2 sm:mb-0 group-hover:text-indigo-600 transition-colors duration-200">
                          {item.title}
                        </h2>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {item.createdAt?.toDate
                                ? item.createdAt.toDate().toLocaleDateString()
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 line-clamp-2 leading-relaxed mb-4">
                        {stripHtml(item.content)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Eye className="w-4 h-4" />
                          <span>Draft</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/news/manage?id=${item.id}`}
                            className="inline-flex items-center space-x-1 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium rounded-lg transition-all duration-200"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span>Edit</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="inline-flex items-center space-x-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


export default  withAdminAuth(NewsList);