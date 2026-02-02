import React from "react";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
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
            title: "Drama Not Found | Dracin",
        };
    }

    return {
        title: `${drama.bookName} Sub Indo | Dracin`,
        description: `Nonton ${drama.bookName} subtitle Indonesia. ${drama.introduction.substring(0, 150)}...`,
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
            <Navbar />
            <DramaWatcher drama={drama} episodes={episodes} />
        </main>
    );
}
