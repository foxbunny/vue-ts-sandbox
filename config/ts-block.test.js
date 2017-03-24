const ts = require('./ts-block.js')
const mockContext = require('./test-helpers').mockContext


test('default options', () => {
  expect(typeof ts({})).toBe('function')
})

;[1, 2].forEach((webpackVer) => {
  test(`default options on webpack ${webpackVer}`, () => {
    const blockfn = ts({})
    expect(blockfn(mockContext(webpackVer))).toMatchSnapshot()
  })

  test(`arbitrary options on webpack ${webpackVer}`, () => {
    const blockfn = ts({ appendTsSuffixTo: [/\.vue$/] })
    expect(blockfn(mockContext(webpackVer))).toMatchSnapshot()
  })
})
