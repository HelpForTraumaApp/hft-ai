import { nanoid } from '@/lib/utils';
import { pgTable, varchar, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const places = pgTable(
    'places',
    {
        id: varchar('id', { length: 191 })
            .primaryKey()
            .$defaultFn(() => nanoid()),
        user_id: varchar('user_id').notNull(),
        scene_data: jsonb('scene_data').notNull(),
        created_at: timestamp('created_at').defaultNow().notNull(),
        updated_at: timestamp('updated_at').defaultNow().notNull(),
    }
);