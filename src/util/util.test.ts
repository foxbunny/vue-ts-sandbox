import * as util from './index'

test('util.init will return all array items except last', () => {
  expect(util.init([1, 2, 3])).toEqual([1, 2])
})

test('util.init will return empty array if array length is 1', () => {
  expect(util.init([1])).toEqual([])
})

test('util.init will return empty array if input is empty', () => {
  expect(util.init([])).toEqual([])
})

test('util.last will return the last element of an array', () => {
  expect(util.last([1, 2, 3])).toBe(3)
})

test('util.last will return the first element if array length is 1', () => {
  expect(util.last([1])).toBe(1)
})

test('util.last will return undefined if array is empty', () => {
  expect(util.last([])).toBe(undefined)
})

test('util.reversed will return a reversed copy of an array', () => {
  expect(util.reversed([1, 2, 3])).toEqual([3, 2, 1])
})

test('util.reversed will return an empty array if input is empty', () => {
  expect(util.reversed([])).toEqual([])
})

test('util.compose will compose functions right-to-left', () => {
  const fn1 = (x: number): number => x + 1
  const fn2 = (x: number): number => x / 2
  const fn3 = (x: number): number => x * 1.5
  const c1 = util.compose(fn1, fn2, fn3)
  const c2 = util.compose(fn3, fn2, fn1)
  expect(c1(3)).toBe(3.25)
  expect(c2(3)).toBe(3)
})

test('util.compose output will behave like a normal function if only one fn is supplied', () => {
  const fn = (x: number): number => x + 1
  const c1 = util.compose(fn)
  expect(c1(3)).toBe(4)
})

test('util.pipe will compose functions left-to-right', () => {
  const fn1 = (x: number): number => x + 1
  const fn2 = (x: number): number => x / 2
  const fn3 = (x: number): number => x * 1.5
  const c1 = util.pipe(fn1, fn2, fn3)
  const c2 = util.pipe(fn3, fn2, fn1)
  expect(c1(3)).toBe(3)
  expect(c2(3)).toBe(3.25)
})

test('util.pipe output will behave like a normal function if only one fn is supplied', () => {
  const fn = (x: number): number => x + 1
  const c1 = util.pipe(fn)
  expect(c1(3)).toBe(4)
})

test('util.always returns a function that always evaluates to same value', () => {
  const fn = util.always(true)
  expect(fn()).toBe(true)
  expect(fn(2)).toBe(true)
  expect(fn(12)).toBe(true)
})

test('util.memoized will memoize an unary function', () => {
  let count = 0
  const fn = (x: any) => {
    count += 1
    return x * x
  }
  const memoized = util.memoized(fn)
  expect(memoized(2)).toBe(4)
  expect(count).toBe(1)
  expect(memoized(2)).toBe(4)
  expect(count).toBe(1)
  expect(memoized(4)).toBe(16)
  expect(count).toBe(2)
  expect(memoized(4)).toBe(16)
  expect(count).toBe(2)
})

test('util.path will return a leaf key from nested objects', () => {
  expect(util.path(['foo', 'bar', 'baz'], {foo: {bar: {baz: 12}}})).toBe(12)
})

test('util.path will return undefined if intermediate structure is missing', () => {
  expect(util.path(['foo', 'bar', 'baz'], {})).toBe(undefined)
  expect(util.path(['foo', 'bar', 'baz'], {foo: {}})).toBe(undefined)
  expect(util.path(['foo', 'bar', 'baz'], {foo: 12})).toBe(undefined)
})

test('util.assocPath will assign a value to a specified leaf key in a nested object', () => {
  const o = {foo: {bar: {baz: 12}}}
  expect(util.assocPath(['foo', 'bar', 'baz'], 10, o))
    .toEqual({foo: {bar: {baz: 10}}})
})

test('util.assocPath will create intermediate sturcture if missing', () => {
  expect(util.assocPath(['foo', 'bar', 'baz'], 10, {}))
    .toEqual({foo: {bar: {baz: 10}}})
})

test('util.patch will patch an object with given value', () => {
  const o = {foo: {bar: {baz: 12}}}
  const o1 = util.patch(['foo', 'bar'], ((bar: any) => ({...bar, fam: 10})), o)
  expect(o1).toEqual({foo: {bar: {baz: 12, fam: 10}}})
})

test('util.patch will create intermediate structure if missing', () => {
  const o1 = util.patch(['foo', 'bar'], ((bar: any) => ({...bar, fam: 10})), {})
  expect(o1).toEqual({foo: {bar: {fam: 10}}})
})

test('util.curriedN will curry a function with n arguments', () => {
  const fn = (x: number, y: number, z: number) => x + y + z
  const c = util.curriedN(3, fn)
  expect(typeof c(1)).toBe('function')
  expect(typeof c(1, 2)).toBe('function')
  expect(typeof c(1)(2)).toBe('function')
  expect(c(1)(2)(3)).toBe(6)
  expect(c(1, 2)(3)).toBe(6)
  expect(c(1)(2, 3)).toBe(6)
  expect(c(1, 2, 3)).toBe(6)
})

test("util.curriedN will not care about function's actual arity", () => {
  const fn = (x: number, y: number, z: number = 0) => x + y + z
  const c = util.curriedN(2, fn)
  expect(c(1, 2)).toBe(3)
  expect(c(1)(2)).toBe(3)
  expect(c(1, 2, 3)).toBe(6)
})

test('util.curried will return a curried version of a function', () => {
  const fn = (x: number, y: number, z: number): number => x + y + z
  const c = util.curried(fn)
  expect(c(1)(2)(3)).toBe(6)
  expect(c(1, 2)(3)).toBe(6)
  expect(c(1)(2, 3)).toBe(6)
  expect(c(1, 2, 3)).toBe(6)
})

test('util.assoc will return a copy of an object with value assigned to given prop', () => {
  const o = {foo: 12, bar: 10, baz: 11}
  expect(util.assoc('bar', 12, o)).toEqual({foo: 12, bar: 12, baz: 11})
})

test('util.assoc will create a missing key', () => {
  expect(util.assoc('bar', 12, {})).toEqual({bar: 12})
})

test('util.merge will merge an object into another', () => {
  const o1 = {foo: 12}
  const o2 = {bar: 10}
  expect(util.merge(o1, o2)).toEqual({foo: 12, bar: 10})
})

test('util.merge will give precedence to first object when props conflict', () => {
  const o1 = {foo: 12, bar: 10}
  const o2 = {bar: 12, baz: 14}
  expect(util.merge(o1, o2)).toEqual({foo: 12, bar: 10, baz: 14})
  expect(util.merge(o2, o1)).toEqual({foo: 12, bar: 12, baz: 14})
})
