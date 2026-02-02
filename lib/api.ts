import { Drama, DramaResponse, DetailDrama, Episode } from "@/types/drama";

const BASE_URL = "https://api.sansekai.my.id/api/dramabox";

async function fetchAPI<T>(endpoint: string): Promise<T> {
    // Add timestamp to prevent caching at all levels (CDN, Browser, Next.js)
    const separator = endpoint.includes("?") ? "&" : "?";
    const bustUrl = `${BASE_URL}${endpoint}${separator}_t=${Date.now()}`;

    const res = await fetch(bustUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        // Log detailed error for debugging
        console.error(`[API Error] Failed to fetch ${endpoint}`);
        console.error(`Status: ${res.status} ${res.statusText}`);
        try {
            const errorBody = await res.text();
            console.error(`Response Body: ${errorBody}`);
        } catch (e) {
            console.error("Could not read error body");
        }

        throw new Error(`Failed to fetch data from ${endpoint} (Status: ${res.status})`);
    }

    return res.json();
}

export const api = {
    getLatest: async (page: number = 1): Promise<Drama[]> => {
        const res = await fetchAPI<Drama[]>(`/latest?page=${page}`);
        return Array.isArray(res) ? res : [];
    },

    getTrending: async (page: number = 1): Promise<Drama[]> => {
        const res = await fetchAPI<Drama[]>(`/trending?page=${page}`);
        return Array.isArray(res) ? res : [];
    },

    getFYP: async (page: number = 1): Promise<Drama[]> => {
        const res = await fetchAPI<Drama[]>(`/foryou?page=${page}`);
        return Array.isArray(res) ? res : [];
    },

    getPopularSearch: async (page: number = 1): Promise<Drama[]> => {
        const res = await fetchAPI<Drama[]>(`/populersearch?page=${page}`);
        return Array.isArray(res) ? res : [];
    },

    getSearch: async (query: string): Promise<Drama[]> => {
        const res = await fetchAPI<Drama[]>(`/search?query=${encodeURIComponent(query)}`);
        return Array.isArray(res) ? res : [];
    },

    getDubIndo: async (classify: string, page: number = 1): Promise<Drama[]> => {
        const res = await fetchAPI<Drama[]>(`/dubindo?classify=${classify}&page=${page}`);
        return Array.isArray(res) ? res : [];
    },

    getDetail: async (bookId: string): Promise<DetailDrama | null> => {
        try {
            const res = await fetchAPI<any>(`/detail?bookId=${bookId}`);
            // API might return mapped object or direct object, need to be careful.
            // Based on user request info: 200 OK.
            // Assuming standard response structure or direct object.
            // Let's assume it returns the DetailDrama object directly or wrapped.
            // Safe check:
            return res.data || res;
        } catch (error) {
            console.error("Error fetching detail:", error);
            return null;
        }
    },

    getAllEpisodes: async (bookId: string): Promise<Episode[]> => {
        try {
            const res = await fetchAPI<any[]>(`/allepisode?bookId=${bookId}`);

            if (!Array.isArray(res)) return [];

            return res.map((item: any) => {
                // Find best video quality (prefer 1080 -> 720 -> 540)
                let videoUrl = "";
                if (item.cdnList && item.cdnList.length > 0) {
                    // Usually the first CDN is fine, but let's look for videoPathList
                    const cdn = item.cdnList.find((c: any) => c.videoPathList && c.videoPathList.length > 0);
                    if (cdn) {
                        // Sort by quality descending
                        const sortedVideos = [...cdn.videoPathList].sort((a: any, b: any) => b.quality - a.quality);
                        videoUrl = sortedVideos[0]?.videoPath || "";
                    }
                }

                return {
                    id: parseInt(item.chapterId),
                    name: item.chapterName,
                    url: videoUrl,
                    image: item.chapterImg
                };
            });
        } catch (error) {
            console.error("Error fetching episodes:", error);
            return [];
        }
    }
};
