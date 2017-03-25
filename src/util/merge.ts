import curried from './curried'

/**
 * Merge two objects together and return a new objects
 *
 * The objects are merged left to right: first object's properties will take
 * precendence in case of conflict.
 */
const merge = curried((over: any, base: any): any => ({
  ...base,
  ...over
}))

export default merge
