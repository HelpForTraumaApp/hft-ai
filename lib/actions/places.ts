'use server';

import { db } from '../db';
import { places } from '../db/schema/places';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';

// Define schema validation for input, updating, delete, select
const insertPlaceSchema = z.object({
    user_id: z.string(),
    name: z.string(),
    elements: z.array(z.object({}).catchall(z.unknown()).optional())
});

const updatePlaceSchema = z.object({
    user_id: z.string(),
    name: z.string(),
    elements: z.array(z.object({}).catchall(z.unknown()).optional())
});

const deletePlaceSchema = z.object({
    id: z.string(),
});

const selectAllPlacesSchema = z.object({
    user_id: z.string(),
});

export const createPlace = async (input: { user_id: string; name: string; elements: any; }) => {
    try {
        const data = insertPlaceSchema.parse(input);
        const [newPlace] = await db
            .insert(places)
            .values({ user_id: data.user_id, scene_data: { name: data.name, elements: data.elements } })
            .returning();
        return newPlace;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};

export const updatePlace = async (input: { user_id: string; name?: string; elements?: any; }) => {
    try {
        const data = updatePlaceSchema.parse(input);
        const [updatedRow] = await db
            .update(places)
            .set({ scene_data: { name: data.name, elements: data.elements } })
            .where(eq(places.user_id, data.user_id))
            .returning();
        return updatedRow ? 0 : -1;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};

export const deletePlace = async (input: { id: string }) => {
    try {
        const data = deletePlaceSchema.parse(input);
        const deletedRowCount = await db
            .delete(places)
            .where(eq(places.id, data.id))
            .returning();
        return deletedRowCount;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};

export const selectAllPlaces = async (user_id: string) => {
    try {
        const placesData = await db
            .select()
            .from(places)
            .where(eq(places.user_id, user_id));
        return placesData;
    } catch (error) {
        return error instanceof Error && error.message.length > 0
            ? error.message
            : 'Error, please try again.';
    }
};
