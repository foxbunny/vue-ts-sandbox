import curriedN from './curriedN'

/**
 * Returns an auto-curried function
 *
 * Example:
 *
 *     const fn = curried((x, y, z) => x + y + z)
 *     fn(1, 2, 3) // => 6
 *     const add12 = fn(1, 2) // => function
 *     add12(3) // => 6
 *
 */
const curried = (fn: Function): Function =>
  curriedN(fn.length, fn)

export default curried
