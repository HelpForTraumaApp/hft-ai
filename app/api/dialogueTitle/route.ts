import { NextResponse } from 'next/server';
import { createDialogueTitle, updateDialogueTitle, selectAllDialogueTitles, deleteDialogueTitle } from '@/lib/actions/dialoguetitles';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = await createDialogueTitle(body);
        return NextResponse.json({ result });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to create dialogue title.' }, { status: 400 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const result = await updateDialogueTitle(body);
        return NextResponse.json({ result });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to update dialogue title.' }, { status: 400 });
    }
}

export async function GET(req: Request) {
    try {
        const data = await selectAllDialogueTitles();
        return NextResponse.json({ data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to get dialogue title.' }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const result = await deleteDialogueTitle(body);
        return NextResponse.json({ result });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to delete dialogue title.' }, { status: 400 });
    }
}