import last from './last'
import init from './init'

/**
 * Returns a copy of an array with elements in reverse order
 *
 * The input array is not modified.
 *
 * Example:
 *
 *     reversed([1, 2, 3]) => [3, 2, 1]
 *
 */
const reversed = (x: any[]): any[] =>
  x.length ?
    [last(x)].concat(reversed(init(x)))
    : []

export default reversed
