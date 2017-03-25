/**
 * Performs right-to-left function composition
 */
const compose = (...fns: Function[]): Function =>
  fns.reduce((f, g) => (...args: any[]) => f(g(...args)))

export default compose
