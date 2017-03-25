/**
 * Returns a function that always evaluates to the same value
 *
 * Note that the value is evaluated during the call to always(), so this is
 * not the same as using anonymous functions.
 */
const always = (x: any) => (...any: any[]) => x

export default always
