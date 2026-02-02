"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Drama } from "@/types/drama";
import MovieCard from "./MovieCard";

interface Tab {
    label: string;
    value: string;
    movies: Drama[];
    link: string;
}

interface TabbedSectionSliderProps {
    title: string;
    tabs: Tab[];
}

export default function TabbedSectionSlider({ title, tabs }: TabbedSectionSliderProps) {
    const [activeTabValue, setActiveTabValue] = useState(tabs[0].value);

    const activeTab = tabs.find(t => t.value === activeTabValue) || tabs[0];
    const movies = activeTab.movies;
    const link = activeTab.link;

    return (
        <section className="py-6 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                    <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                        <span className="w-1 h-6 bg-red-600 rounded-full block"></span>
                        {title}
                    </h2>

                    <div className="flex items-center gap-4">
                        {/* Tabs */}
                        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    onClick={() => setActiveTabValue(tab.value)}
                                    className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all ${activeTabValue === tab.value
                                            ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                                            : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <Link
                            href={link}
                            className="group flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
                        >
                            View All
                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                <div className="flex overflow-x-auto pb-6 gap-4 scrollbar-hide snap-x snap-mandatory">
                    {movies.map((movie) => (
                        <div key={movie.bookId} className="snap-start shrink-0 first:pl-2 last:pr-2">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
