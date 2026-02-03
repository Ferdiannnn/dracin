
import { api } from '@/lib/api';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }

    try {
        const data = await api.getSearch(query);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to search drama' }, { status: 500 });
    }
}
