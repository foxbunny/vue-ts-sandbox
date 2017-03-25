import init from './init'
import last from './last'
import curried from './curried'

/**
 * Return a leaf key from an object nested at specified path
 *
 * Path is an array of keys which should be traversed, where the last item is
 * the leaf key. Any missing keys will be treated as an empty object, so there
 * will be no exception even if the intermediate structures are missing.
 */
const path = curried((keys: string[], obj: any) => {
  const parents = init(keys)
  const leaf = last(keys)
  return parents.reduce((o, k) => o[k] || {}, obj)[leaf]
})

export default path
