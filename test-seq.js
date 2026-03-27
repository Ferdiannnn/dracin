async function testFetch() {
    const bookId = '42000003050'; // Dewa Judi
    let currentEpisode = 1;
    let allEpisodes = [];
    let hasMore = true;
    let max = 20;

    console.log("Starting sequential fetch...");
    while (hasMore && max > 0) {
        console.log(`Fetching from episode ${currentEpisode}`);
        try {
            const r = await fetch(`https://db.hafizhibnusyam.my.id/api/chapters/video?book_id=${bookId}&episode=${currentEpisode}&_t=${Date.now()}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
            });
            if (!r.ok) {
                console.log("Failed", r.status);
                break;
            }
            const json = await r.json();
            const data = Array.isArray(json?.data) ? json.data : [];
            const extras = Array.isArray(json?.extras) ? json.extras : [];
            const batch = [...data, ...extras];
            if (batch.length === 0) break;
            
            allEpisodes = [...allEpisodes, ...batch];
            const maxIndex = Math.max(...batch.map(item => parseInt(item.chapter_index) || 0));
            if (batch.length < 6 || isNaN(maxIndex) || maxIndex === 0) {
                hasMore = false;
            } else {
                currentEpisode = maxIndex + 1;
            }
        } catch (e) {
            console.error("Error", e.message);
            break;
        }
        max--;
    }
    console.log(`Fetched ${allEpisodes.length} items`);
    // dedup
    const uniqueEpisodes = new Map();
    for (const item of allEpisodes) {
        const id = parseInt(item.chapter_index) || 0;
        if (!uniqueEpisodes.has(id)) {
            uniqueEpisodes.set(id, item);
        }
    }
    console.log(`Unique: ${uniqueEpisodes.size}`);
}
testFetch();
