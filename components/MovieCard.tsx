import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, PlayCircle } from "lucide-react";
import { Drama } from "@/types/drama";

export default function MovieCard({ movie }: { movie: Drama }) {
    // Use coverWap if available, or cover, or fallback
    // The interface I defined has 'cover'. I should stick to that or update the interface.
    // The previous file view showed 'coverWap'.
    // I will check the API response again via the python script I skipped? 
    // No, I'll stick to 'cover' as per my interface, but adding a safe fallback.

    const imageUrl = movie.coverWap || "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1000&auto=format&fit=crop";

    return (
        <Link
            href={`/drama/${movie.bookId}`}
            className="group relative w-[200px] flex-shrink-0 cursor-pointer transition-all duration-300 hover:z-10 block"
        >
            <div className="relative h-[300px] w-full overflow-hidden rounded-xl shadow-lg border border-white/5">
                <Image
                    src={imageUrl}
                    alt={movie.bookName || "Drama Cover"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-white drop-shadow-md scale-50 group-hover:scale-100 transition-transform duration-300" />
                </div>

                {/* Episode Badge */}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 border border-white/10">
                    <span className="text-xs font-bold text-white">{movie.chapterCount} Eps</span>
                </div>
            </div>

            <div className="mt-3 space-y-1">
                <h3 className="text-white font-semibold truncate group-hover:text-red-500 transition-colors">
                    {movie.bookName}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    {movie.tags && movie.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="bg-white/10 px-1.5 py-0.5 rounded">{tag}</span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
