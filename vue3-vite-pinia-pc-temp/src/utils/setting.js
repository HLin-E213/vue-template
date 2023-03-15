// 项目配置文件
module.exports = {
  title: '测试demo',
  publicPath: '/test',
  port: '8068',
  cdn: {
    // 忽略打包的第三方库
    externals: {},
    // 通过cdn方式使用
    pro: {
      js: [],
      css: []
    },
    dev: {
      js: [],
      css: []
    }
  }
}
