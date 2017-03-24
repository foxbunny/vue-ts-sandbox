const mockContext = (webpackVersion = 1) => {
  const ctx = {
    fileType: jest.fn(),
    webpackVersion: {
      major: webpackVersion
    }
  }
  ctx.fileType.all = jest.fn()
  ctx.fileType.add = jest.fn()
  return ctx
}

module.exports = {
  mockContext
}
