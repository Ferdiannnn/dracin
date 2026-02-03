
import { api } from './lib/api';

async function inspectData() {
    const latest = await api.getLatest();
    if (latest.length > 0) {
        console.log("--- LATEST ITEM [0] ---");
        console.log(JSON.stringify(latest[0], null, 2));

        const id = latest[0].bookId;
        console.log(`\n--- FETCHING EPISODES FOR ID: ${id} ---`);

        // Use raw fetch to see raw response
        const res = await fetch(`https://www.magma-api.biz.id/dramabox/allepisode?bookId=${id}`);
        const json = await res.json();
        console.log(JSON.stringify(json, null, 2).substring(0, 2000)); // Limit output
    }
}

inspectData();
