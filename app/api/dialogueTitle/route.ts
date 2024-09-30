import { NextResponse } from 'next/server';
import { createDialogueTitle, updateDialogueTitle, selectAllDialogueTitles, deleteDialogueTitle } from '@/lib/actions/dialoguetitles';
import { getAuth } from '@/lib/auth';

export async function POST(req: Request) {
    const user_id = await getAuth();
    let body = await req.json();
    body.user_id = user_id;
    const result = await createDialogueTitle(body);
    return NextResponse.json({ result });
}

export async function PUT(req: Request) {
    const body = await req.json();
    const result = await updateDialogueTitle(body);
    return NextResponse.json({ result });
}

export async function GET(req: Request) {
    const user_id = await getAuth();
    if (user_id != null) {
        const { searchParams } = new URL(req.url);
        const is_text: string = searchParams.get('is_text') ?? '';
        const body = { user_id, is_text };
        const data = await selectAllDialogueTitles(body);
        return NextResponse.json({ data });
    } else {
        return NextResponse.json({ message: 'Invalid User' }, { status: 400 });
    }
}

export async function DELETE(req: Request) {

    const body = await req.json();
    const result = await deleteDialogueTitle(body);
    return NextResponse.json({ result });
}