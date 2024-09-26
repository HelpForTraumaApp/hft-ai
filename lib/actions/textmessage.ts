'use server';

import { db } from '../db';
import { textmessage } from '../db/schema/textmessage';
import { z } from 'zod';
import { eq, and } from 'drizzle-orm';

// Schema validation for input data
const insertTextMessageSchema = z.object({
    title_id: z.string(),
    isSelf: z.boolean(),
    message: z.string(),
    user_id: z.string(),
});

const updateTextMessageSchema = z.object({
    id: z.string(),
    updatedMessage: z.string().optional(),
});

const deleteTextMessageSchema = z.object({
    id: z.string(),
});

const selectTextMessagesByTitleIdSchema = z.object({
    title_id: z.string(),
    user_id: z.string(),
});

export const createTextMessage = async (input: { title_id: string; isSelf: boolean; message: string; user_id: string }) => {
    try {
        const data = insertTextMessageSchema.parse(input);
        const [newDialogueTitle] = await db
            .insert(textmessage)
            .values({ title_id: data.title_id, isSelf: data.isSelf, msgData: data.message, user_id: data.user_id })
            .returning();
        return newDialogueTitle;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};

export const updateTextMessage = async (input: { id: string; updatedMessage: string }) => {
    try {
        const data = updateTextMessageSchema.parse(input);
        const [updatedRow] = await db
            .update(textmessage)
            .set({ msgData: data.updatedMessage })
            .where(eq(textmessage.id, data.id))
            .returning();
        return updatedRow ? 0 : -1;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};

export const deleteTextMessage = async (input: { id: string }) => {
    try {
        const data = deleteTextMessageSchema.parse(input);

        const deletedRowCount = await db
            .delete(textmessage)
            .where(eq(textmessage.id, data.id))
            .returning();

        return deletedRowCount;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};

export const selectTextMessagesByTitleId = async (input: { title_id: string; user_id: string }) => {
    try {
        const data = selectTextMessagesByTitleIdSchema.parse(input);

        const messages = await db
            .select()
            .from(textmessage)
            .where(and(eq(textmessage.title_id, data.title_id), eq(textmessage.user_id, data.user_id)));

        return messages;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};