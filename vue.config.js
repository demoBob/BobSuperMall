const path = require('path')
module.exports = {
  devServer:{
    open: false, // 编译完成是否打开网页
    host:'0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false
  },
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