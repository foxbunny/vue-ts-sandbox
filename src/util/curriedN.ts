/**
 * Returns an auto-curried function with the arity of n
 */
const curriedN = (n: number, fn: Function, initialArgs: any[] = []): Function =>
  (...args: any[]) => ((allArgs) =>
    allArgs.length < n ?
      curriedN(n, fn, allArgs)
      : fn.apply(undefined, allArgs)
  )(initialArgs.concat(args))

export default curriedN
