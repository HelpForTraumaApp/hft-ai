import { nanoid } from '@/lib/utils';
import { pgTable, varchar, boolean } from 'drizzle-orm/pg-core';

export const dialogueTitle = pgTable(
  'dialogueTitle',
  {
    id: varchar('id', { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    user_id: varchar('user_id').notNull(),
    is_text: boolean('is_text').notNull(),
    ghost: varchar('ghost', { length: 191 }).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
  }
);