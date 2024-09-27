import { NextResponse } from 'next/server';
import { createMessage, deleteMessage, selectMessagesByTitleId } from '@/lib/actions/dialoguemessages';
import { getAuth } from '@/lib/auth';

export async function POST(req: Request) {
    const user_id = await getAuth();
    try {
        let body = await req.json();
        body.user_id = user_id;
        body.is_text = false;
        const data = await createMessage(body);
        return NextResponse.json({ data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to create text message.' }, { status: 400 });
    }
}

export async function GET(req: Request) {
    const user_id = await getAuth();
    if (user_id !=null) {
        try {
            const { searchParams } = new URL(req.url);
            const title_id = searchParams.get('title_id');
            if (!title_id) {
                return NextResponse.json({ message: 'title_id is required' }, { status: 400 });
            }
            const is_text = false;
            const data = await selectMessagesByTitleId({title_id, user_id, is_text});
            return NextResponse.json({ data });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: 'Failed to get text message.' }, { status: 400 });
        }
    } else {
        return NextResponse.json({ message: 'Invalid User.' }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const data = await deleteMessage(body);
        return NextResponse.json({ data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to delete text message.' }, { status: 400 });
    }
}
