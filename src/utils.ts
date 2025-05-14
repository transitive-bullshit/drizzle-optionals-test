export function assert(
  expr: unknown,
  message = 'Internal assertion failed'
): asserts expr {
  if (expr) {
    return
  }

  throw new Error(message)
}
