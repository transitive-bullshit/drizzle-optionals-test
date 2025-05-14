import { relations } from '@fisch0920/drizzle-orm'
import {
  index,
  pgTable,
  text,
  uniqueIndex
} from '@fisch0920/drizzle-orm/pg-core'

import { posts } from './post'
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
  id,
  timestamps,
  username,
  userRoleEnum
} from './utils'

export const users = pgTable(
  'users',
  {
    id,
    ...timestamps,

    username: username().notNull().unique(),
    role: userRoleEnum().default('user').notNull(),

    email: text().unique(),
    password: text(),
    name: text()
  },
  (table) => [
    uniqueIndex('user_email_idx').on(table.email),
    uniqueIndex('user_username_idx').on(table.username),
    index('user_createdAt_idx').on(table.createdAt),
    index('user_updatedAt_idx').on(table.updatedAt)
  ]
)

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts)
}))

export const userSelectSchema = createSelectSchema(users)
  .omit({
    password: true
  })
  .strip()

export const userInsertSchema = createInsertSchema(users)
  .pick({
    username: true,
    email: true,
    password: true,
    name: true
  })
  .strict()

export const userUpdateSchema = createUpdateSchema(users)
  .pick({
    password: true,
    name: true
  })
  .strict()
