
import { api } from '@/lib/api';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
        return NextResponse.json({ error: 'Missing bookId parameter' }, { status: 400 });
    }

    try {
        const data = await api.getAllEpisodes(bookId);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch episodes' }, { status: 500 });
    }
}
