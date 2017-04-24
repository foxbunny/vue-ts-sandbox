// Karma configuration
var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    // Paths
    basePath: '',
    files: [
      {pattern: 'src/**/*.test.ts', watch: false},
    ],
    exclude: [
    ],

    // Module processing
    preprocessors: {
      // Process all *test* modules with webpack (it will handle dependencies)
      'src/**/*.test.ts': ['webpack', 'sourcemap'],
    },

    // Targets
    browsers: ['PhantomJS'],

    // Reporters
    reporters: ['dots'],
    logLevel: config.LOG_INFO,
    colors: true,

    // Test framework configuration
    frameworks: ['mocha'],

    // Runner configuration
    port: 9876,
    autoWatch: true,
    singleRun: true,
    concurrency: Infinity,

    // Webpack config
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only',
    },
  });
};
