import { NextResponse } from 'next/server';
import { createMessage, updateMessage, deleteMessage, selectMessagesByTitleId } from '@/lib/actions/dialoguemessages';
import { getAuth } from '@/lib/auth';

export async function POST(req: Request) {
    const user_id = await getAuth();
    let body = await req.json();
    body.user_id = user_id;
    body.is_text = true;
    const data = await createMessage(body);
    return NextResponse.json({ data });
}

export async function PUT(req: Request) {
    const body = await req.json();
    const data = await updateMessage(body);
    return NextResponse.json({ data });
}

export async function GET(req: Request) {
    const user_id = await getAuth();
    if (user_id != null) {
        const { searchParams } = new URL(req.url);
        const title_id = searchParams.get('title_id');
        if (!title_id) {
            return NextResponse.json({ message: 'title_id is required' }, { status: 400 });
        }
        const is_text = true;
        const data = await selectMessagesByTitleId({ title_id, user_id, is_text });
        return NextResponse.json({ data });
    } else {
        return NextResponse.json({ message: 'Invalid User.' }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    const body = await req.json();
    const data = await deleteMessage(body);
    return NextResponse.json({ data });
}
