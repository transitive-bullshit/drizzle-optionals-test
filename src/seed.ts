import { reset, seed } from 'drizzle-seed'

import { db, eq, schema } from './db'
import { assert } from './utils'

async function main() {
  console.log('Resetting database...')
  await reset(db as any, schema)

  console.log('Seeding database...')
  await seed(db as any, schema).refine((f) => ({
    users: {
      columns: {
        name: f.default({ defaultValue: null })
      },
      count: 5,
      with: {
        posts: 2
      }
    }
  }))

  const users = await db.query.users.findMany()
  let user0 = users[0]!
  assert(user0)

  console.log(user0)

  user0 = (
    await db
      .update(schema.users)
      .set({
        name: 'foo bar'
      })
      .where(eq(schema.users.id, user0.id))
      .returning()
  )[0]!
  console.log(user0)

  user0 = (
    await db
      .update(schema.users)
      .set({
        name: null
      })
      .where(eq(schema.users.id, user0.id))
      .returning()
  )[0]!

  console.log(user0)
}

await main()
await db.$client.end()
