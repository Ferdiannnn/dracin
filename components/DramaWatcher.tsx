"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Layers, Star, Info, X } from "lucide-react";
import { DetailDrama, Episode } from "@/types/drama";

interface DramaWatcherProps {
    drama: DetailDrama;
    episodes: Episode[];
}

export default function DramaWatcher({ drama, episodes }: DramaWatcherProps) {
    const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);

    // If no episodes, show something?
    const hasEpisodes = episodes && episodes.length > 0;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Player / Hero Section */}
            <div className="relative w-full">
                {currentEpisode ? (
                    // Video Player Mode
                    <div className="relative w-full aspect-video bg-black flex flex-col items-center justify-center">
                        <div className="absolute top-4 right-4 z-20">
                            <button
                                onClick={() => setCurrentEpisode(null)}
                                className="p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <video
                            controls
                            autoPlay
                            className="w-full h-full object-contain"
                            src={currentEpisode.url}
                            onEnded={() => {
                                // Optional: Auto-play next episode
                            }}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ) : (
                    // Hero Mode (Default)
                    <div className="relative h-[60vh] md:h-[70vh] w-full">
                        <div className="absolute inset-0">
                            {drama.coverWap ? (
                                <Image
                                    src={drama.coverWap}
                                    alt={drama.bookName}
                                    fill
                                    className="object-cover opacity-60"
                                    priority
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-900" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 flex flex-col md:flex-row gap-8 items-end">
                            {/* Poster Image */}
                            <div className="relative w-40 h-60 md:w-56 md:h-80 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl border border-white/10 hidden md:block">
                                {drama.coverWap ? (
                                    <Image
                                        src={drama.coverWap}
                                        alt={drama.bookName}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">No Image</div>
                                )}
                            </div>

                            <div className="space-y-3 sm:space-y-4 max-w-3xl">
                                <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-md leading-tight">
                                    {drama.bookName}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                                    <div className="flex items-center gap-1">
                                        <Layers className="w-4 h-4 text-red-500" />
                                        <span>{drama.chapterCount} Episodes</span>
                                    </div>
                                    {drama.tags && drama.tags.map((tag, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-white/10 rounded-md border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4 pt-2">
                                    <button
                                        onClick={() => hasEpisodes && setCurrentEpisode(episodes[0])}
                                        className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-all hover:scale-105"
                                        disabled={!hasEpisodes}
                                    >
                                        <Play className="fill-current w-5 h-5" />
                                        Watch Ep 1
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Left Column: Synopsis & Episodes */}
                <div className="md:col-span-2 space-y-12">

                    {/* Synopsis */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <span className="w-1 h-6 bg-red-600 rounded-full block"></span>
                            Synopsis
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            {drama.introduction}
                        </p>
                        <div className="pt-2 text-sm text-gray-400">
                            <strong>Protagonist:</strong> {drama.protagonist}
                        </div>
                    </section>

                    {/* Episodes Grid */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <span className="w-1 h-6 bg-red-600 rounded-full block"></span>
                                All Episodes
                            </h2>
                            {currentEpisode && (
                                <span className="text-gray-400 text-sm">
                                    Now Playing: <span className="text-white font-medium">{currentEpisode.name}</span>
                                </span>
                            )}
                        </div>

                        {hasEpisodes ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                                {episodes.map((ep) => {
                                    const isActive = currentEpisode?.id === ep.id;
                                    return (
                                        <button
                                            key={ep.id}
                                            onClick={() => setCurrentEpisode(ep)}
                                            className={`
                                                relative p-4 rounded-lg transition-all group text-left border
                                                ${isActive
                                                    ? "bg-red-600/20 border-red-500/50"
                                                    : "bg-white/5 hover:bg-white/10 border-white/5"}
                                            `}
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <span className={`font-medium truncate ${isActive ? "text-red-400" : "text-gray-300 group-hover:text-white"}`}>
                                                    {ep.name}
                                                </span>
                                                {isActive ? (
                                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                                ) : (
                                                    <Play className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100" />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No episodes available.</p>
                        )}
                    </section>
                </div>

                {/* Right Column: Info */}
                <div className="space-y-8">
                    <div className="p-6 bg-white/5 rounded-xl border border-white/5 sticky top-24">
                        <h3 className="text-xl font-bold mb-4">Drama Info</h3>
                        <div className="space-y-4 text-sm text-gray-300">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>Status</span>
                                <span className="text-green-400">Ongoing</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>Total Episodes</span>
                                <span>{drama.chapterCount}</span>
                            </div>
                            {drama.rankVo && (
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>Rank</span>
                                    <span className="text-yellow-500 flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-current" />
                                        #{drama.rankVo.sort}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Add some custom CSS for scrollbar if needed, or rely on Tailwind
