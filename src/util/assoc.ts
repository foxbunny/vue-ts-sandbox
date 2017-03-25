import curried from './curried'

/**
 * Return a copy of an object with value assigned to specified key
 */
const assoc = curried((key: string, val: any, obj: any): any => ({
  ...obj,
  [key]: val
}))

export default assoc
