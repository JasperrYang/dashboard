module.exports = {
  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true
      },
      '/front': {
        target: 'http://edufront.lagou.com',
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        globalVars: {
          hack: 'true; @import "~@/styles/index.less";'
        }
      }
    }
  }
}
