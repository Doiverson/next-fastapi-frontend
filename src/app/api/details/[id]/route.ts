import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/details/${params.id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    const json = await response.json();
    return NextResponse.json(json);
}
