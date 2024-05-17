import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/`);
    const json = await response.json();
    return NextResponse.json(json);
}

export async function POST(request: NextRequest) {
    const response = await fetch('http://localhost:8000/posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(await request.json()),
    });
    const json = await response.json();
    return NextResponse.json(json);
}
