import { z } from 'zod'

function getCuidSchema(idLabel: string) {
  return z.string().cuid2({ message: `Invalid ${idLabel}` })
}

export const cuidSchema = getCuidSchema('id')
export const userIdSchema = getCuidSchema('user id')
export const consumerIdSchema = getCuidSchema('consumer id')
