const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    allowedHosts: 'all'
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: (() => {
            const plugins = []
            try {
              const pxToViewport = require('postcss-px-to-viewport-8-plugin')
              plugins.push(pxToViewport({
                viewportWidth: 750,
                viewportHeight: 667,
                unitPrecision: 3,
                viewportUnit: 'vw',
                selectorBlackList: ['.ignore'],
                minPixelValue: 1,
                mediaQuery: false
              }))
            } catch (e) {
              console.log('postcss-px-to-viewport-8-plugin not installed, skipping mobile adaptation')
            }
            return plugins
          })()
        }
      }
    }
  }
}) 
