module.exports = {
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
