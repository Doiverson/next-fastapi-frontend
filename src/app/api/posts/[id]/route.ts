import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const response = await fetch(`http://localhost:8000/posts/${params.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const json = await response.json();
    return NextResponse.json(json);
}
