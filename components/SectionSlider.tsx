import React from "react";
import MovieCard from "./MovieCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Drama } from "@/types/drama";

interface SectionSliderProps {
    title: string;
    movies: Drama[];
    link?: string;
}

export default function SectionSlider({ title, movies, link = "#" }: SectionSliderProps) {
    return (
        <section className="py-8 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2 relative">
                        <span className="w-1 h-6 bg-red-600 rounded-full block"></span>
                        {title}
                    </h2>
                    <Link
                        href={link}
                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors group"
                    >
                        View All
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="relative">
                    <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x">
                        {movies.map((movie, index) => (
                            <MovieCard key={`${movie.bookId}-${index}`} movie={movie} />
                        ))}
                    </div>

                    {/* Edge Gradients for scrolling cue */}
                    <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none md:block hidden" />
                </div>
            </div>
        </section>
    );
}
