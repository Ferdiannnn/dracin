import React from "react";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { Drama } from "@/types/drama";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Generate Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    let title = "Dracin Streaming";
    switch (slug) {
        case "dubindo":
            title = "Drama China Dubbing Indonesia | Dracin";
            break;
        case "latest":
            title = "Drama China Terbaru | Dracin";
            break;
        case "trending":
            title = "Sedang Trending Hari Ini | Dracin";
            break;
        case "popular":
            title = "Pencarian Populer | Dracin";
            break;
        case "fyp":
            title = "Rekomendasi FYP | Dracin";
            break;
    }

    return {
        title,
        description: `Nonton ${title} subtitle Indonesia gratis. Update drama china setiap hari.`,
    };
}

export default async function CategoryPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { page } = await searchParams;

    const currentPage = typeof page === "string" ? parseInt(page) : 1;

    let title = "";
    let data: Drama[] = [];

    switch (slug) {
        case "dubindo":
            title = "Dubbing Indonesia";
            data = await api.getDubIndo("terbaru", currentPage);
            break;
        case "latest":
            title = "Terbaru di Dracin";
            data = await api.getLatest(currentPage);
            break;
        case "trending":
            title = "Sedang Trending";
            data = await api.getTrending(currentPage);
            break;
        case "popular":
            title = "Pencarian Populer";
            data = await api.getPopularSearch(currentPage);
            break;
        case "fyp":
            title = "Rekomendasi FYP";
            data = await api.getFYP(currentPage);
            break;
        default:
            title = "Category Not Found";
            data = [];
    }

    const hasNextPage = data.length >= 15; // Assuming 15 is the limit based on previous check
    const hasPrevPage = currentPage > 1;

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                    <span className="w-1.5 h-8 bg-red-600 rounded-full block"></span>
                    {title}
                </h1>

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
                                    href={`/category/${slug}?page=${currentPage - 1}`}
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
                                    href={`/category/${slug}?page=${currentPage + 1}`}
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
                                href={`/category/${slug}?page=${currentPage - 1}`}
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
