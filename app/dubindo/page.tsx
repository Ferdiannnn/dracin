import React from "react";
import { api } from "@/lib/api";
import MovieCard from "@/components/MovieCard";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
    title: "Drama China Dubbing Indonesia | Dracin",
    description: "Nonton Drama China dengan Dubbing Bahasa Indonesia. Koleksi lengkap dan terbaru.",
};

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DubIndoPage({ searchParams }: Props) {
    const { page, classify } = await searchParams;
    const currentPage = typeof page === "string" ? parseInt(page) : 1;
    const currentClassify = typeof classify === "string" ? classify : "terbaru";

    const data = await api.getDubIndo(currentClassify, currentPage);
    const title = "Dubbing Indonesia";

    const hasNextPage = data.length >= 15; // API limit assumption
    const hasPrevPage = currentPage > 1;

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <span className="w-1.5 h-8 bg-red-600 rounded-full block"></span>
                        {title}
                    </h1>

                    {/* Filter / Classification Toggle */}
                    <div className="flex bg-white/5 rounded-full p-1 border border-white/10 self-start md:self-auto">
                        <Link
                            href={`/dubindo?classify=terbaru&page=1`}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${currentClassify === "terbaru"
                                ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Terbaru
                        </Link>
                        <Link
                            href={`/dubindo?classify=terpopuler&page=1`}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${currentClassify === "terpopuler"
                                ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Terpopuler
                        </Link>
                    </div>
                </div>

                {data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {data.map((movie) => (
                                <div key={movie.bookId} className="flex justify-center">
                                    <MovieCard movie={movie} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center gap-4 mt-12">
                            {hasPrevPage ? (
                                <Link
                                    href={`/dubindo?classify=${currentClassify}&page=${currentPage - 1}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Previous
                                </Link>
                            ) : (
                                <button disabled className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-500 rounded-full cursor-not-allowed">
                                    <ChevronLeft className="w-5 h-5" />
                                    Previous
                                </button>
                            )}

                            <span className="text-gray-400 font-medium">Page {currentPage}</span>

                            {hasNextPage ? (
                                <Link
                                    href={`/dubindo?classify=${currentClassify}&page=${currentPage + 1}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    Next
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            ) : (
                                <button disabled className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-500 rounded-full cursor-not-allowed">
                                    Next
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <p className="text-lg">No dramas found in this category.</p>
                        {hasPrevPage && (
                            <Link
                                href={`/dubindo?classify=${currentClassify}&page=${currentPage - 1}`}
                                className="mt-4 text-red-500 hover:text-red-400"
                            >
                                Go Back
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
