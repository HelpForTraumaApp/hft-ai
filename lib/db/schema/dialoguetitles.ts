import { nanoid } from '@/lib/utils';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const dialogueTitle = pgTable(
  'dialogueTitle',
  {
    id: varchar('id', { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()), 
    ghost: varchar('ghost', { length: 191 }).notNull(), 
    title: varchar('title', { length: 255 }).notNull(),
  }
);