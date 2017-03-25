/**
 * Memoizes an unary function
 */
const memoized = (fn: UnaryFunction): Function => ((memory: any) =>
  (x: any): any =>
    x in memory ?
      memory[x]
      : memory[x] = fn(x)
)({})

export default memoized

export declare type UnaryFunction = (x: any) => any
