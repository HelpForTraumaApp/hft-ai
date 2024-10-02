import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { createPlace, updatePlace, selectAllPlaces } from '@/lib/actions/places'


export async function GET(req: Request) {
    const user_id = await getAuth();

    // Check if user_id is null or empty
    if (!user_id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const result = await selectAllPlaces(user_id);
    return NextResponse.json({ result });
}

export async function POST(req: Request) {
    const user_id = await getAuth();
    let body = await req.json();
    body.user_id = user_id;
    const result = await createPlace(body);
    return NextResponse.json({ result });
}

export async function PUT(req: Request) {
    const user_id = await getAuth();
    let body = await req.json();
    body.user_id = user_id;
    const result = await updatePlace(body);
    return NextResponse.json({ result });
}
