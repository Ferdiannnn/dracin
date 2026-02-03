
import { api } from '@/lib/api';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const classify = searchParams.get('classify') || 'terbaru';
    const page = parseInt(searchParams.get('page') || '1');

    try {
        const data = await api.getDubIndo(classify, page);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch Dubbing Industry dramas' }, { status: 500 });
    }
}
