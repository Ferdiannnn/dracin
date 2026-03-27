import { Drama, DramaResponse, DetailDrama, Episode } from "@/types/drama";

const BASE_URL = "https://db.hafizhibnusyam.my.id";

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

    const json = await res.json();
    // API returns wrapped object { success: true, data: [...] }
    if (json && json.data) {
        return json.data;
    }
    return json;
}

function mapToDrama(item: any): Drama {
    if (!item) return item;
    // Map Hafiz API to existing fields
    return {
        bookId: parseInt(item.id) || item.bookId || 0,
        bookName: item.title || item.name || item.bookName || "",
        coverWap: item.cover_image || item.cover || item.coverWap || "",
        cover: item.cover_image || item.cover || "",
        introduction: item.introduction || "",
        chapterCount: item.episode_count || item.chapterCount || 0,
        tags: Array.isArray(item.tags) 
            ? item.tags.map((t: any) => typeof t === "string" ? t : t.tagName || t)
            : [],
        protagonist: item.protagonist || "",
        id: item.id,
        name: item.title || item.name,
        playCount: item.playCount,
        cornerName: item.cornerName,
        cornerColor: item.cornerColor,
    } as Drama;
}

export const api = {
    getVip: async (page: number = 1): Promise<Drama[]> => {
        // Fallback to must-sees 
        const res = await fetchAPI<any[]>(`/api/dramas/must-sees?page=${page}`);
        return Array.isArray(res) ? res.map(mapToDrama) : [];
    },

    getRandom: async (): Promise<Drama[]> => {
        const res = await fetchAPI<any[]>(`/api/dramas/hidden-gems`);
        return Array.isArray(res) ? res.map(mapToDrama) : (res ? [mapToDrama(res)] : []);
    },

    getLatest: async (page: number = 1): Promise<Drama[]> => {
        const res = await fetchAPI<any[]>(`/api/dramas/must-sees?page=${page}`);
        return Array.isArray(res) ? res.map(mapToDrama) : [];
    },

    getTrending: async (page: number = 1): Promise<Drama[]> => {
        const res = await fetchAPI<any[]>(`/api/dramas/trending?page=${page}`);
        return Array.isArray(res) ? res.map(mapToDrama) : [];
    },

    getFYP: async (page: number = 1): Promise<Drama[]> => {
        const res = await fetchAPI<any[]>(`/api/dramas/hidden-gems?page=${page}`);
        return Array.isArray(res) ? res.map(mapToDrama) : [];
    },

    getPopularSearch: async (page: number = 1): Promise<Drama[]> => {
        const res = await fetchAPI<any[]>(`/api/dramas/trending?page=${page}`);
        return Array.isArray(res) ? res.map(mapToDrama) : [];
    },

    getSearch: async (query: string): Promise<Drama[]> => {
        const res = await fetchAPI<any[]>(`/api/search?keyword=${encodeURIComponent(query)}`);
        return Array.isArray(res) ? res.map(mapToDrama) : [];
    },

    getDubIndo: async (classify: string, page: number = 1): Promise<Drama[]> => {
        const res = await fetchAPI<any[]>(`/api/dramas/indo?page=${page}`);
        return Array.isArray(res) ? res.map(mapToDrama) : [];
    },

    getDetail: async (bookId: string): Promise<DetailDrama | null> => {
        try {
            // New API actually supports getting details by ID!
            const res = await fetchAPI<any>(`/api/dramas/${bookId}`);
            if (res) {
                return mapToDrama(res) as DetailDrama;
            }
            return null;
        } catch (error) {
            console.error("Error fetching detail:", error);
            return null;
        }
    },

    getAllEpisodes: async (bookId: string, totalEpisodes: number = 0): Promise<Episode[]> => {
        try {
            let allEpisodes: any[] = [];
            
            if (totalEpisodes > 0) {
                // Fetch sequentially to prevent Cloudflare / API rate-limit connect timeouts
                for (let i = 1; i <= totalEpisodes; i += 6) {
                    const bustUrl = `${BASE_URL}/api/chapters/video?book_id=${bookId}&episode=${i}&_t=${Date.now()}`;
                    try {
                        const rawRes = await fetch(bustUrl, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            cache: "no-store",
                        });
                        if (!rawRes.ok) break;
                        
                        const json = await rawRes.json();
                        const data = Array.isArray(json?.data) ? json.data : [];
                        const extras = Array.isArray(json?.extras) ? json.extras : [];
                        
                        const currentBatch = [...data, ...extras];
                        if (currentBatch.length === 0) break;
                        
                        allEpisodes = [...allEpisodes, ...currentBatch];
                    } catch (err) {
                        console.error(`Error fetching episode batch starting at ${i}:`, err);
                        // If one fails due to timeout, break the loop to return whatever we have so far
                        break;
                    }
                }
            } else {
                // Fallback to sequential fetching by sniffing the max current episode
                let currentEpisode = 1;
                let hasMore = true;
                let maxRequests = 100;

                while (hasMore && maxRequests > 0) {
                    const bustUrl = `${BASE_URL}/api/chapters/video?book_id=${bookId}&episode=${currentEpisode}&_t=${Date.now()}`;
                    try {
                        const rawRes = await fetch(bustUrl, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            cache: "no-store",
                        });
                        
                        if (!rawRes.ok) break;

                        const json = await rawRes.json();
                        const data = Array.isArray(json?.data) ? json.data : [];
                        const extras = Array.isArray(json?.extras) ? json.extras : [];
                        const currentBatch = [...data, ...extras];
                        
                        if (currentBatch.length === 0) {
                            hasMore = false;
                            break;
                        }
                        
                        allEpisodes = [...allEpisodes, ...currentBatch];
                        const maxChapterIndex = Math.max(...currentBatch.map((item: any) => parseInt(item.chapter_index) || 0));
                        
                        if (currentBatch.length < 6 || isNaN(maxChapterIndex) || maxChapterIndex === 0) {
                            hasMore = false;
                        } else {
                            currentEpisode = maxChapterIndex + 1;
                        }
                    } catch (err) {
                        console.error(`Error in sequential fetch loop at episode ${currentEpisode}:`, err);
                        break;
                    }
                    maxRequests--;
                }
            }

            if (allEpisodes.length === 0) return [];

            // Deduplicate by chapter_index
            const uniqueEpisodes = new Map();
            for (const item of allEpisodes) {
                const id = parseInt(item.chapter_index) || 0;
                if (!uniqueEpisodes.has(id)) {
                    uniqueEpisodes.set(id, item);
                }
            }

            return Array.from(uniqueEpisodes.values()).map((item: any) => {
                let videoUrl = "";
                // Expected format: item.stream_url = [{quality: 1080, url: '...'}]
                if (item.stream_url && item.stream_url.length > 0) {
                    const sortedVideos = [...item.stream_url].sort((a: any, b: any) => b.quality - a.quality);
                    videoUrl = sortedVideos[0]?.url || "";
                }

                return {
                    id: parseInt(item.chapter_index) || 0,
                    name: `Episode ${item.chapter_index}`,
                    url: videoUrl,
                };
            }).sort((a, b) => a.id - b.id);
        } catch (error) {
            console.error("Error fetching episodes:", error);
            return [];
        }
    }
};
