import type {
  ExtractTablesWithRelations,
  InferSelectModel
} from '@fisch0920/drizzle-orm'
import type { z } from 'zod'

import type * as schema from './schema'

export type Tables = ExtractTablesWithRelations<typeof schema>

export type User = z.infer<typeof schema.userSelectSchema>
export type RawUser = InferSelectModel<typeof schema.users>

export type Post = z.infer<typeof schema.postSelectSchema>
export type RawPost = InferSelectModel<typeof schema.posts>
