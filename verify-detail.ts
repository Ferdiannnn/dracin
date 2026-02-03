
import { api } from './lib/api';

async function verifyDetail() {
    console.log("Fetching latest to get a valid ID...");
    const latest = await api.getLatest();

    if (latest.length === 0) {
        console.error("Latest returned empty. Cannot proceed.");
        return;
    }

    const firstDrama = latest[0];
    console.log(`Found drama: ${firstDrama.bookName} (ID: ${firstDrama.bookId})`);

    console.log(`Fetching detail for ID: ${firstDrama.bookId}...`);
    try {
        const detail = await api.getDetail(firstDrama.bookId.toString());
        console.log("Detail result:", JSON.stringify(detail, null, 2));

        if (!detail) {
            console.error("Detail is null!");
        } else {
            console.log("Detail fetch successful.");
        }
    } catch (e) {
        console.error("Detail fetch failed:", e);
    }
}

verifyDetail();
