module.exports = {
  extract: function () {
    return {
      extractTextPluginMock: true,
      args: [].slice.call(arguments)
    }
  }
}
