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
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                <div className="max-w-xl space-y-6 pt-20">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-red-500/50 bg-red-500/10 backdrop-blur-sm text-red-500 text-sm font-medium">
                        #1 in FYP
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg leading-tight">
                        {drama.bookName}
                    </h1>

                    <p className="text-lg text-gray-300 line-clamp-3">
                        {drama.introduction}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <a href={`/drama/${drama.bookId}`} className="flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20">
                            <Play className="fill-current w-5 h-5" />
                            Watch Now
                        </a>

                        <a href={`/drama/${drama.bookId}`} className="flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full font-semibold border border-white/20 transition-all hover:scale-105 active:scale-95">
                            <Info className="w-5 h-5" />
                            More Info
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
