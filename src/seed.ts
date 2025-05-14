import { reset, seed } from 'drizzle-seed'

import { db, schema } from './db'

async function main() {
  console.log('Resetting database...')
  await reset(db as any, schema)

  console.log('Seeding database...')
  await seed(db as any, schema).refine(() => ({
    users: {
      count: 5,
      with: {
        posts: 2
      }
    }
  }))
}

await main()
await db.$client.end()
