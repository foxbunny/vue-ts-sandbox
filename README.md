# Vue TypeScript sandbox

This repository is a sandbox for Vue and TypeScript experiments.

Feel free to peruse any code you find in here.

## A few words on the build

The build is done using [webpack 2](https://webpack.js.org/), and configured
using [webpack-blocks](https://github.com/andywer/webpack-blocks).

Since webpack-blocks don't provide direct support for Vue components, I have
developed custom blocks for them. Vue does not play nice with
[awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader),
so I have also developed an alternative block for typescript using
[ts-loader](https://github.com/TypeStrong/ts-loader).

Both of the custom blocks are found in the `config` directory and have some test
coverage.

In order to convince ts-loader to load `.vue` files, I had to do two things:

- type definition file as well, which you can find in `src/vue.d.ts`
- .ts extension, added by ts-loader configuraiton option in `webpack.config.js`

The latter is required despite the fact that vue-loader is used.

## Additional reading

- [TypeScript support in Vue](https://vuejs.org/v2/guide/typescript.html)
- [Class components](https://github.com/vuejs/vue-class-component) (also
  includes a TypeScript example, which this repo is partly based on)
