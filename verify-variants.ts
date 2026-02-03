
import { api } from './lib/api';

async function deepVerify() {
    const latest = await api.getLatest();
    if (latest.length > 0) {
        console.log("Full Drama Object:", JSON.stringify(latest[0], null, 2));

        const id = latest[0].bookId;
        console.log(`\nTesting ID: ${id}`);

        // Test Endpoint Variants
        const variants = ['detail', 'details', 'book', 'info', 'movie', 'query'];

        // We can't easily test arbitrary fetch here without defining it, but we can assume fetchAPI handles it if we modify it temporarily or just use a raw fetch helper test.
        // Let's rely on api methods if I added a helper, but I didn't export a generic fetcher.
        // I'll simulate it by modifying `api.getDetail` loop? No, that's messy.

        // I'll just use the raw fetch here since I'm in a script (assuming fetch is available in this env, node 18+ has fetch)
    }
}

async function tryFetch(path: string) {
    const BASE = "https://www.magma-api.biz.id/dramabox";
    const url = `${BASE}${path}`;
    console.log(`Trying ${url}...`);
    try {
        const res = await fetch(url);
        console.log(`Status: ${res.status}`);
        if (res.ok) {
            const txt = await res.text();
            console.log("Body preview:", txt.substring(0, 100));
        }
    } catch (e) {
        console.log("Error:", e);
    }
}

async function run() {
    const latest = await api.getLatest();
    if (latest.length === 0) return;
    const id = latest[0].bookId;

    await tryFetch(`/detail?bookId=${id}`);
    await tryFetch(`/details?bookId=${id}`);
    await tryFetch(`/book?bookId=${id}`);
    await tryFetch(`/movie?bookId=${id}`);

    // Check allepisode
    await tryFetch(`/allepisode?bookId=${id}`);
}

run();
