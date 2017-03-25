/**
 * Returns a copy of an array excluding the last item
 *
 * The input array is not modified
 *
 * @param x {Array}
 */
const init = (x: any[]): any[] =>
  x.slice(0, x.length - 1)

export default init
