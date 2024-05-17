import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const response = await fetch('http://localhost:8000/');
    const json = await response.json();
    return NextResponse.json(json);
}
