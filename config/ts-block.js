/**
 * TypeScript webpack block using ts-loader
 *
 * @see https://github.com/TypeStrong/ts-loader
 */

function pre (context) {
  const registeredTypes = context.fileType.all()
  if ('application/x-typescript' in registeredTypes) return
  context.fileType.add('application/x-typescript', /\.ts$/)
}

function ts(options) {
  return Object.assign((context) => ({
    resolve: {
      extensions: ['.ts']
    },
    module: {
      loaders: [
        {
          test: context.fileType('application/x-typescript'),
          loader: 'ts-loader',
          options: options
        }
      ]
    }
  }), { pre })
}

module.exports = ts
