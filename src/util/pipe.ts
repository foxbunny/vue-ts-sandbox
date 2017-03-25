/**
 * Performs left-to-right function composition
 */
const pipe = (...fns: Function[]): Function =>
  fns.reduce((f, g) => (...args: any[]) => g(f(...args)))

export default pipe
