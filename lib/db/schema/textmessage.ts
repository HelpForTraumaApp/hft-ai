import { nanoid } from '@/lib/utils';
import { pgTable, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { dialogueTitle } from './dialoguetitles';

export const textmessage = pgTable(
  'textmessage',
  {
    id: varchar('id', { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    user_id: varchar('user_id').notNull(),
    title_id: varchar('title_id', { length: 191 })
      .notNull()
      .references(() => dialogueTitle.id, {
        onDelete: 'cascade',
      }),
    isSelf: boolean('isSelf').notNull(),
    msgData: varchar('msgData').notNull(),
    timeStamp: timestamp('timeStamp').defaultNow().notNull(),
  }
);
