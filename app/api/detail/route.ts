
import { api } from '@/lib/api';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
        return NextResponse.json(
            { error: 'Missing bookId parameter' },
            { status: 400 }
        );
    }

    try {
        const detail = await api.getDetail(bookId);

        if (!detail) {
            return NextResponse.json(
                { error: 'Drama not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(detail);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
