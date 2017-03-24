/**
 * VueJS webpack block
 *
 * @see https://github.com/vuejs/vue-loader
 */

const CSS_EXTS = ['css', 'less', 'sass', 'stylus']

function preHook(context) {
  const types = context.fileType.all()
  if ('application/x-vue' in types) return
  context.fileType.add('application/x-vue', /\.vue$/)
}

function extract(context, loader) {
  return require('extract-text-webpack-plugin').extract(
    context.webpackVersion.major === 1 ?
      loader
      : { use: loader, fallback: 'vue-style-loader' }
  )
}

function vue(options) {
  const {
    exclude = /\/node_modules\//,
    extractCSS = false,
  } = options || {}
  const opts = (opts => {
    Object.keys(options || {})
      .filter(k => !['exlude', 'extractCSS'].includes(k))
      .forEach(k => opts[k] = options[k])
    return opts
  })({})

  const extraOptions = (context) => {
    if (extractCSS) {
      opts.loaders = opts.loaders || {}
      const foundCSS = CSS_EXTS.filter(e => e in opts.loaders)
      if (foundCSS.length) {
        foundCSS.forEach(ext => {
          if (ext in opts.loaders) {
            const loader = opts.loaders[ext]
            opts.loaders[ext] = extract(context, loader)
          }
        })
      }
      else {
        opts.loaders.css = extract(context, 'css-loader')
      }
    }

    return opts
  }

  const vueBlock = (context) => {
    const settings = {
      resolve: {
        extensions: ['.vue']
      },
      module: {
        loaders: [
          {
            test: context.fileType('application/x-vue'),
            exclude: Array.isArray(exclude) ? exclude : [ exclude ],
            loader: 'vue-loader'
          }
        ]
      }
    }

    if (context.webpackVersion.major === 1) {
      settings.vue = extraOptions(context)
    }
    else {
      settings.module.loaders[0].options = extraOptions(context)
    }

    return settings
  }

  return Object.assign(vueBlock, {
    pre: preHook
  })
}

module.exports = vue
