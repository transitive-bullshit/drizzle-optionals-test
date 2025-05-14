import { expectTypeOf, test } from 'vitest'

import type { Post, RawPost, RawUser, User } from './types'

type UserKeys = keyof User
type PostKeys = Exclude<keyof Post, 'user'>

test('User select types are compatible', () => {
  expectTypeOf<RawUser>().toExtend<User>()

  expectTypeOf<User[UserKeys]>().toEqualTypeOf<RawUser[UserKeys]>()
})

test('Post select types are compatible', () => {
  expectTypeOf<RawPost>().toExtend<Post>()

  expectTypeOf<Post[PostKeys]>().toEqualTypeOf<RawPost[PostKeys]>()
})
