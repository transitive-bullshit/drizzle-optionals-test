import { relations } from '@fisch0920/drizzle-orm'
import { index, pgTable, text } from '@fisch0920/drizzle-orm/pg-core'
import { z } from 'zod'

import { users, userSelectSchema } from './user'
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
  cuid2,
  id,
  timestamps
} from './utils'

export const posts = pgTable(
  'posts',
  {
    id,
    ...timestamps,

    userId: cuid2()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

    content: text().notNull(),
    image: text()
  },
  (table) => [
    index('post_userId_idx').on(table.userId),
    index('post_createdAt_idx').on(table.createdAt),
    index('post_updatedAt_idx').on(table.updatedAt)
  ]
)

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id]
  })
}))

export const postSelectSchema = createSelectSchema(posts)
  .extend({
    user: z.lazy(() => userSelectSchema).optional()
  })
  .strip()

export const postInsertSchema = createInsertSchema(posts)
  .pick({
    userId: true,
    content: true,
    image: true
  })
  .strict()

export const postUpdateSchema = createUpdateSchema(posts)
  .pick({
    content: true,
    image: true
  })
  .strict()
