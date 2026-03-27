async function testFetch() {
    const bookId = '42000003050'; // Dewa Judi
    const totalEpisodes = 74;
    const batchSize = 10;
    const urls = [];
    for (let i = 1; i <= totalEpisodes; i += 6) {
        urls.push(`https://db.hafizhibnusyam.my.id/api/chapters/video?book_id=${bookId}&episode=${i}&_t=${Date.now()}`);
    }
    
    let allEpisodes = [];
    console.log(`Starting fetch for ${urls.length} URLs`);
    
    for (let i = 0; i < urls.length; i += batchSize) {
        const batchUrls = urls.slice(i, i + batchSize);
        console.log(`Fetching batch ${i/batchSize + 1}...`);
        const results = await Promise.all(
            batchUrls.map(url => fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }).then(r => r.ok ? r.json() : null).catch(e => {
                console.error("Fetch error", e);
                return null;
            }))
        );
        
        for (const json of results) {
            if (!json) continue;
            const data = Array.isArray(json?.data) ? json.data : [];
            const extras = Array.isArray(json?.extras) ? json.extras : [];
            allEpisodes = [...allEpisodes, ...data, ...extras];
        }
    }
    
    console.log(`Total episodes fetched: ${allEpisodes.length}`);
    const uniqueEpisodes = new Map();
    for (const item of allEpisodes) {
        const id = parseInt(item.chapter_index) || 0;
        if (!uniqueEpisodes.has(id)) {
            uniqueEpisodes.set(id, item);
        }
    }
    console.log(`Total unique episodes: ${uniqueEpisodes.size}`);
    console.log("Episodes: ", Array.from(uniqueEpisodes.keys()).sort((a,b)=>a-b).join(', '));
}

testFetch();
