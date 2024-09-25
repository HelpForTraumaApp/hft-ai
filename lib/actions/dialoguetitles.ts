'use server';

import { db } from '../db';
import { dialogueTitle } from '../db/schema/dialoguetitles';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

// Define schema validation for input, updating, delete, select
const insertDialogueTitleSchema = z.object({
    ghost: z.string(),
    title: z.string(),
});

const updateDialogueTitleSchema = z.object({
    id: z.string(),
    ghost: z.string().optional(),
    title: z.string().optional(),
});

const deleteDialogueTitleSchema = z.object({
    id: z.string(),
});

const selectDialogueTitleByIdSchema = z.object({
    id: z.string(),
});

export const createDialogueTitle = async (input: { ghost: string; title: string }) => {
    try {
        const data = insertDialogueTitleSchema.parse(input);

        const [newDialogueTitle] = await db
            .insert(dialogueTitle)
            .values({ ghost: data.ghost, title: data.title })
            .returning();
        return newDialogueTitle;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};

export const updateDialogueTitle = async (input: { id: string; ghost?: string; title?: string }) => {
    try {
        const data = updateDialogueTitleSchema.parse(input);
        const [updatedRow] = await db
            .update(dialogueTitle)
            .set({ ghost: data.ghost, title: data.title })
            .where(eq(dialogueTitle.id, data.id))
            .returning();
        return updatedRow ? 0 : -1;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};

export const deleteDialogueTitle = async (input: { id: string }) => {
    try {
        const data = deleteDialogueTitleSchema.parse(input);

        const deletedRowCount = await db
            .delete(dialogueTitle)
            .where(eq(dialogueTitle.id, data.id))
            .returning();

        return deletedRowCount;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};

export const selectAllDialogueTitles = async () => {
    try {
        const dialogueTitles = await db.select().from(dialogueTitle);
        return dialogueTitles;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};

export const selectDialogueTitleById = async (input: { id: string }) => {
    try {
        const data = selectDialogueTitleByIdSchema.parse(input);

        const [dialogue] = await db
            .select()
            .from(dialogueTitle)
            .where(eq(dialogueTitle.id, data.id));

        return dialogue || 'Dialogue title not found.';
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};
