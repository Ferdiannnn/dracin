import { MetadataRoute } from "next";
import { api } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://dracin25.com";

    // Static routes
    const routes = [
        "",
        "/category/latest",
        "/category/trending",
        "/category/popular",
        "/category/fyp",
        "/dubindo",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1,
    }));

    // Fetch as many dramas as possible to index
    // We'll fetch from multiple sources to get a good coverage
    const [latest, trending, fyp, popular, dubIndoNew, dubIndoPop] = await Promise.all([
        api.getLatest().catch(() => []),
        api.getTrending().catch(() => []),
        api.getFYP().catch(() => []),
        api.getPopularSearch().catch(() => []),
        api.getDubIndo("terbaru").catch(() => []),
        api.getDubIndo("terpopuler").catch(() => []),
    ]);

    // Combine all dramas and remove duplicates by bookId
    const allDramas = [
        ...latest,
        ...trending,
        ...fyp,
        ...popular,
        ...dubIndoNew,
        ...dubIndoPop,
    ];

    const uniqueDramas = Array.from(
        new Map(allDramas.map((drama) => [drama.bookId, drama])).values()
    );

    const dramaRoutes = uniqueDramas.map((drama) => ({
        url: `${baseUrl}/drama/${drama.bookId}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [...routes, ...dramaRoutes];
}
