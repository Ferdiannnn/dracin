import React from "react";
import { api } from "@/lib/api";
import DramaWatcher from "@/components/DramaWatcher";
import { Metadata } from "next";

type Props = {
    params: Promise<{ bookId: string }>;
};

// Generate Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { bookId } = await params;
    const drama = await api.getDetail(bookId);

    if (!drama) {
        return {
            title: "Drama Not Found | Dracin 25",
            description: "Drama yang Anda cari tidak ditemukan di Dracin 25.",
        };
    }

    const title = `${drama.bookName} Sub Indo | Dracin 25`;
    const description = `Nonton ${drama.bookName} subtitle Indonesia. ${drama.introduction.substring(0, 150)}... Streaming gratis drama china ${drama.bookName} full episode.`;
    const imageUrl = drama.cover || drama.coverWap || "/og-image.jpg";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "video.movie",
            url: `/drama/${bookId}`,
            images: [
                {
                    url: imageUrl,
                    width: 800,
                    height: 600,
                    alt: drama.bookName,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
        alternates: {
            canonical: `/drama/${bookId}`,
        },
    };
}

export default async function DetailPage({ params }: Props) {
    const { bookId } = await params;
    const drama = await api.getDetail(bookId);
    const episodes = await api.getAllEpisodes(bookId);

    if (!drama) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <p>Drama not found.</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Movie",
                        name: drama.bookName,
                        description: drama.introduction,
                        image: drama.cover || drama.coverWap,
                        genre: drama.tags,
                        url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://dracin25.com"}/drama/${drama.bookId}`,
                    }),
                }}
            />
            <DramaWatcher drama={drama} episodes={episodes} />
        </main>
    );
}
