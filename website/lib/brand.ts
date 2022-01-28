/**
 * Allows for typing of other types, like primitives, so they don't get misused.
 *
 * Usage:
 * type X = Brand<string, 'X'>
 * const x: X = 'someVal' as X
 *
 * function a(foo: X) {}
 * function b(foo: string) {}
 *
 * a(x) // works
 * b(x) // works
 * a('plain string') // fails
 */
export type Brand<K, V> = K & { __brand: V }
