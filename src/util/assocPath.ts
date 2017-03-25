import path from './path'
import curried from './curried'

/**
 * Returns a clone of an object with value assigned to a leaf key
 *
 * The path to the leaf is given as an array of strings. Missing keys are filled
 * in with a blank object in order to complete the path to the leaf.
 *
 * Example:
 *
 *     const o = {foo: {bar: true}}
 *     assocPath(['foo', 'bar'], false, o) // => {foo: {bar: false}}
 */
const assocPath = curried((path: string[], val: any, obj: any): any => {
  if (path.length === 0) return val
  const [first, ...rest] = path
  return {...obj, [first]: assocPath(rest, val, obj[first] || {})}
})

export default assocPath
