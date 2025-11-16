"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/router";

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
const token:any = await auth.currentUser?.getIdToken();
        localStorage.setItem("adminToken", token);

        router.push("/admin/news");
    
    } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg p-6 sm:p-8 lg:p-10 border border-white/20">
                {/* Header */}
                <div className="text-center mb-8 lg:mb-10">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <LogIn className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        Please sign in to your account
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 text-xs sm:text-sm p-3 sm:p-4 rounded-xl mb-6 animate-pulse">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
                    {/* Email Input */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                        <div className="relative flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 sm:py-4 bg-white dark:bg-gray-800 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 dark:focus-within:ring-indigo-700 transition-all duration-300">
                            <Mail className="text-gray-400 mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-transparent outline-none text-gray-700 dark:text-white placeholder-gray-400 text-sm sm:text-base"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                        <div className="relative flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 sm:py-4 bg-white dark:bg-gray-800 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 dark:focus-within:ring-indigo-700 transition-all duration-300">
                            <Lock className="text-gray-400 mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full bg-transparent outline-none text-gray-700 dark:text-white placeholder-gray-400 text-sm sm:text-base"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full relative overflow-hidden group bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                            {loading ? (
                                <Loader2 className="animate-spin w-5 h-5 sm:w-6 sm:h-6" />
                            ) : (
                                <LogIn className="w-5 h-5 sm:w-6 sm:h-6" />
                            )}
                            <span>{loading ? "Signing In..." : "Sign In"}</span>
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;