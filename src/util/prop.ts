import curried from './curried'

/**
 * Return a property matching the given key
 */
const prop = curried((key: string, obj: any): any => obj[key])

export default prop
