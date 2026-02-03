import React from "react";
import { Play, Info } from "lucide-react";
import Image from "next/image";
import { Drama } from "@/types/drama";

interface HeroProps {
    drama: Drama;
}

export default function HeroSection({ drama }: HeroProps) {
    if (!drama) return null;

    const imageUrl = drama.coverWap || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop";

    return (
        <div className="relative h-[85vh] w-full">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={imageUrl}
                    alt={drama.bookName}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />
                {/* Gradient Overlay - Stronger on mobile for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent sm:from-black/80 sm:via-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-32 sm:justify-center sm:pb-0">
                <div className="max-w-xl space-y-4 sm:space-y-6 pt-20 sm:pt-0">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-red-500/50 bg-red-500/10 backdrop-blur-sm text-red-500 text-xs sm:text-sm font-medium">
                        #1 in FYP
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg leading-tight line-clamp-2">
                        {drama.bookName}
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-gray-300 line-clamp-3 max-w-lg">
                        {drama.introduction}
                    </p>

                    <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                        <a href={`/drama/${drama.bookId}`} className="flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20">
                            <Play className="fill-current w-4 h-4 sm:w-5 sm:h-5" />
                            Watch Now
                        </a>

                        <a href={`/drama/${drama.bookId}`} className="flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full font-semibold text-sm sm:text-base border border-white/20 transition-all hover:scale-105 active:scale-95">
                            <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                            More Info
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
