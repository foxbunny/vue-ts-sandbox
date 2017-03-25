import { default as _path } from './path'
import assocPath from './assocPath'
import curried from './curried'

/**
 * Apply a function over a portion of an object
 *
 * The portion to operate on is specified using a path, which is an array of
 * strings, each string representing a key. If intermediate keys are not
 * present, they will be initialized to empty objects. Keys cannot be arrays.
 *
 * A function will receive as its argument the value of the last key, and is
 * expected to return an updated value that will be assgined to that key.
 *
 * Example:
 *
 *     const o = {foo: {bar: 12, baz: {x: 1, y: 3}}}
 *     patch(['foo', 'bar', 'baz'], (baz) => {
 *       // baz is {x: 1, y: 3}
 *       return {  // <-- must return a copy
 *         x: baz.x,
 *         y: 20
 *       }
 *     }, o) // => {foo: {bar: 12, baz: {x: 1, y: 20}}}
 *
 */
const patch = curried((path: string[], fn: Function, obj: any): any =>
  assocPath(path, fn(_path(path, obj)), obj)
)

export default patch
