'use server';

import { db } from '../db';
import { dialoguemessages } from '../db/schema/dialoguemessages';
import { z } from 'zod';
import { eq, and } from 'drizzle-orm';

// Schema validation for input data
const insertTextMessageSchema = z.object({
    title_id: z.string(),
    isSelf: z.boolean(),
    message: z.string(),
    user_id: z.string(),
    is_text: z.boolean(),
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
    is_text: z.boolean(),
});

export const createMessage = async (input: { title_id: string; isSelf: boolean; message: string; user_id: string; is_text: boolean }) => {
    try {
        const data = insertTextMessageSchema.parse(input);
        const [newDialogueTitle] = await db
            .insert(dialoguemessages)
            .values({ title_id: data.title_id, isSelf: data.isSelf, msgData: data.message, user_id: data.user_id, is_text: data.is_text })
            .returning();
        return newDialogueTitle;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};

export const updateMessage = async (input: { id: string; updatedMessage: string }) => {
    try {
        const data = updateTextMessageSchema.parse(input);
        const [updatedRow] = await db
            .update(dialoguemessages)
            .set({ msgData: data.updatedMessage })
            .where(eq(dialoguemessages.id, data.id))
            .returning();
        return updatedRow ? 0 : -1;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};

export const deleteMessage = async (input: { id: string }) => {
    try {
        const data = deleteTextMessageSchema.parse(input);

        const deletedRowCount = await db
            .delete(dialoguemessages)
            .where(eq(dialoguemessages.id, data.id))
            .returning();

        return deletedRowCount;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};

export const selectMessagesByTitleId = async (input: { title_id: string; user_id: string; is_text: boolean }) => {
    try {
        const data = selectTextMessagesByTitleIdSchema.parse(input);

        const messages = await db
            .select()
            .from(dialoguemessages)
            .where(
                and(
                    eq(dialoguemessages.title_id, data.title_id),
                    eq(dialoguemessages.user_id, data.user_id),
                    eq(dialoguemessages.is_text, data.is_text)
                )
            );

        return messages;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};