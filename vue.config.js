const path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'views': '@/views',
        'service': '@/apiService',
        'utils': '@/utils',
      }
    }
  },
  pluginOptions:{
    'style-resources-loader': {
        preProcessor:'less',
        patterns: [
          //配置定义全局less变量的文件路径(这里不能使用别名路径)
          path.resolve(__dirname,'./src/assets/css/base.less')
        ]
    }
  }
}