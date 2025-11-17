"use client";

import dynamic from "next/dynamic";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { app } from "@/lib/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const Select = dynamic(() => import("react-select"), { ssr: false });
const CustomEditor = dynamic(() => import("@/components/common/CustomEditor"), { ssr: false });

import {
  Save,
  X,
  FileText,
  Edit3,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Tag,
  Star,
} from "lucide-react";
import withAdminAuth from "@/hoc/withAdminAuth";

// Predefined categories
const categoryOptions = [
  { value: "Home", label: "Home" },
  { value: "World", label: "World" },
  { value: "Business & Markets", label: "Business & Markets" },
  { value: "Sports", label: "Sports" },
  { value: "Technology", label: "Technology" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Politics", label: "Politics" },
];

const ManageNewsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);

  const firebaseApp = app;
  const storage = getStorage(firebaseApp);
  const db = getFirestore(firebaseApp);

  // Client-side fetch when `id` is present
  useEffect(() => {
    if (!id) {
      setEditingId(null);
      return;
    }

    const fetchArticle = async () => {
      try {
        setError(null);
        const docRef = doc(db, "news", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setContent(data.content || "");
          setIsFeatured(data.isFeatured || false);
          setCategories(
            (data.categories || []).map((cat: string) => ({
              value: cat,
              label: cat,
            }))
          );
          setEditingId(id as string);
        } else {
          setError("Article not found.");
        }
      } catch (err) {
        console.error("Failed to fetch article:", err);
        setError("Failed to load article. Please try again.");
      }
    };

    fetchArticle();
  }, [id, db]);

  // Image upload handler
  const handleImageUpload = useCallback(
    async (file: File): Promise<string> => {
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Image upload is " + progress + "% done");
          },
          (error) => {
            console.error("Image upload failed:", error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (err) {
              reject(err);
            }
          }
        );
      });
    },
    [storage]
  );

  // Video upload handler
  const handleVideoUpload = useCallback(
    async (file: File): Promise<string> => {
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `videos/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Video upload is " + progress + "% done");
          },
          (error) => {
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (err) {
              reject(err);
            }
          }
        );
      });
    },
    [storage]
  );

  // Clear all form state
  const clearFormState = () => {
    setContent("");
    setTitle("");
    setCategories([]);
    setIsFeatured(false);
    setError(null);
    setSuccess(null);
    setEditingId(null);
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!content.trim()) return setError("Content cannot be empty");
    if (!title.trim()) return setError("Title cannot be empty");
    if (categories.length === 0) return setError("Please select at least one category");

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const categoryValues = categories.map((cat) => cat.value);

      if (editingId) {
        // Update
        const docRef = doc(db, "news", editingId);
        await updateDoc(docRef, {
          title,
          content,
          categories: categoryValues,
          isFeatured,
          updatedAt: serverTimestamp(),
        });
        setSuccess("Article updated successfully!");
        
        // Clear state and redirect after update
        setTimeout(() => {
          clearFormState();
          router.push("/admin/news");
        }, 1500);
      } else {
        // Create
        await addDoc(collection(db, "news"), {
          title,
          content,
          categories: categoryValues,
          isFeatured,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setSuccess("Article created successfully!");
        
        // Clear state and redirect after create
        setTimeout(() => {
          clearFormState();
          router.push("/admin/news");
        }, 1500);
      }
    } catch (err) {
      console.error("Save failed:", err);
      setError("Failed to save. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom Select Styles
  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#f7fafc",
      borderColor: "#e2e8f0",
      borderWidth: "2px",
      borderRadius: "0.75rem",
      padding: "0.5rem",
      boxShadow: "none",
      "&:hover": { borderColor: "#a0aec0" },
      "&:focus-within": {
        borderColor: "#5a67d8",
        boxShadow: "0 0 0 3px rgba(90, 103, 216, 0.1)",
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#e2e8f0",
      borderRadius: "0.375rem",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#2d3748",
      fontWeight: "500",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "#718096",
      "&:hover": { backgroundColor: "#cbd5e0", color: "#2d3748" },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#a0aec0",
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: "0.75rem",
      overflow: "hidden",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#5a67d8"
        : state.isFocused
          ? "#edf2f7"
          : "white",
      color: state.isSelected ? "white" : "#2d3748",
      "&:hover": {
        backgroundColor: state.isSelected ? "#5a67d8" : "#edf2f7",
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/news"
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="hidden sm:block font-medium">Back to News</span>
              </Link>
              <div className="h-6 w-px bg-white/20 hidden sm:block"></div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  {editingId ? (
                    <Edit3 className="w-6 h-6 text-white" />
                  ) : (
                    <FileText className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    {editingId ? "Edit Article" : "Create Article"}
                  </h1>
                  <p className="text-indigo-100 text-sm hidden sm:block">
                    {editingId ? "Update your news article" : "Write and publish your news story"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white/80 text-sm font-medium hidden sm:block">Premium Editor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Editor Header */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 sm:px-8 py-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <p className="text-sm font-medium text-gray-600 ml-4">Article Editor • Auto-save enabled</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Title */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Article Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your compelling headline..."
                  className="text-black w-full px-4 py-4 text-lg font-medium bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400"
                />
                <FileText className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 flex items-center space-x-1">
                <span>Tip:</span>
                <span>A great title grabs attention</span>
              </p>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Categories
              </label>
              <div className="relative">
                <Select
                  isMulti
                  options={categoryOptions}
                  value={categories}
                  onChange={(selected: any) => setCategories(selected || [])}
                  placeholder="Select categories..."
                  styles={customSelectStyles}
                  className="w-full"
                />
                <Tag className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <p className="text-xs text-gray-500 flex items-center space-x-1">
                <span>Tag:</span>
                <span>Select multiple categories</span>
              </p>
            </div>

            {/* Featured */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Article Settings
              </label>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${isFeatured
                        ? "bg-gradient-to-r from-yellow-400 to-orange-400 border-yellow-400"
                        : "bg-white border-gray-300 group-hover:border-yellow-400"
                      }`}
                  >
                    {isFeatured && <Star className="w-4 h-4 text-white fill-current" />}
                  </div>
                  <div className="flex-1">
                    <span
                      className={`font-semibold ${isFeatured ? "text-yellow-800" : "text-gray-700 group-hover:text-yellow-700"
                        }`}
                    >
                      Mark as Featured Article
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Featured articles get priority placement
                    </p>
                  </div>
                  <Star
                    className={`w-5 h-5 ${isFeatured
                        ? "text-yellow-500 fill-current animate-pulse"
                        : "text-gray-400 group-hover:text-yellow-400"
                      }`}
                  />
                </label>
              </div>
            </div>

          

            {/* Editor */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Article Content
              </label>
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-indigo-100 focus-within:border-indigo-500">
                <CustomEditor
                  value={content}
                  onChange={setContent}
                  height="500px"
                  onImageUpload={handleImageUpload}
                  onVideoUpload={handleVideoUpload}
                />
              </div>
              <p className="text-xs text-gray-500 flex items-center space-x-1">
                <span>Sparkles:</span>
                <span>Use toolbar to format, add media</span>
              </p>
            </div>

            {/* Messages */}
            {error && (
              <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}
            {success && (
              <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-green-700 font-medium">{success}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/admin/news"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all group"
              >
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                <span>Cancel</span>
              </Link>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{editingId ? "Update Article" : "Publish Article"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/admin/news"
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>View All Articles</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(ManageNewsPage);