import { NextResponse } from 'next/server';
import { createTextMessage, updateTextMessage, deleteTextMessage, selectTextMessagesByTitleId } from '@/lib/actions/textmessage';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = await createTextMessage(body);
        return NextResponse.json({ data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to create text message.' }, { status: 400 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const data = await updateTextMessage(body);
        return NextResponse.json({ data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to update text message.' }, { status: 400 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const title_id = searchParams.get('title_id');
        if (!title_id) {
            return NextResponse.json({ message: 'title_id is required' }, { status: 400 });
        }
        const data = await selectTextMessagesByTitleId({title_id});
        return NextResponse.json({ data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to get text message.' }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const data = await deleteTextMessage(body);
        return NextResponse.json({ data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to delete text message.' }, { status: 400 });
    }
}