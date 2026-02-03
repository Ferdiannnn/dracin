
import { api } from './lib/api';

async function verifySearch() {
    console.log("Fetching latest to get a valid ID and Name...");
    const latest = await api.getLatest();

    if (latest.length === 0) {
        console.error("Latest returned empty.");
        return;
    }

    const firstDrama = latest[0];
    const bookId = firstDrama.bookId;
    const bookName = firstDrama.bookName;
    console.log(`Target: ${bookName} (ID: ${bookId})`);

    console.log("\n1. Testing Search by ID...");
    const searchById = await api.getSearch(bookId.toString());
    console.log(`Search by ID count: ${searchById.length}`);
    if (searchById.length > 0) console.log("First match:", searchById[0].bookName);

    console.log("\n2. Testing Search by Name...");
    const searchByName = await api.getSearch(bookName);
    console.log(`Search by Name count: ${searchByName.length}`);
    if (searchByName.length > 0) console.log("First match:", searchByName[0].bookName);

}

verifySearch();

