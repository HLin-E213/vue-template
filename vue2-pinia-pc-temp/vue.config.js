const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')
const isProduction = process.env.NODE_ENV !== 'development'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 代码混淆
const CompressionWebpackPlugin = require('compression-webpack-plugin') // gzip 压缩
const setting = require('./src/utils/setting.js')
// 判断当前环境
const isRobots = ['test'].includes(process.env.ENV)

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  css: {
    extract: true // css拆分ExtractTextPlugin插件，默认true - 骨架屏需要为true
  },
  configureWebpack: (config) => {
    // 调整webpack配置
    if (isProduction) {
      config.externals = setting?.cdn?.externals
      //警告 webpack 的性能提示
      config.performance = {
        hints: 'warning',
        //入口起点的最大体积 整数类型（以字节为单位）
        maxEntrypointSize: 50000000,
        //生成文件的最大体积 整数类型（以字节为单位 300k）
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js')
        }
      }
      if (isRobots) {
        config.plugins.push(
          new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, './robots/robots.txt'),
              to: './',
              ignore: ['.*']
            }
          ])
        )
      }
      // 为生产环境修改配置...
      config.plugins.push(
        //生产环境自动删除console
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true, // 是否删除debugger
              drop_console: true, // 是否删除console
              pure_funcs: ['console.log'] // 移除console
            },
            warnings: false
          },
          sourceMap: false,
          parallel: true,
          cache: true
        })
      )
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240, // 只有大小大于该值的资源会被处理
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件 本地测试不要删除，服务器要配置支持 gizp 压缩
        })
      )
    }
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(true) // 修复热更新失效
    config.resolve.alias.set('@', resolve('src'))
    // 开启图片压缩
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        disable: true,
        bypassOnDebug: true
      })
      .end()
    // 生产环境配置
    if (isProduction) {
      // 删除预加载
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
      // 压缩代码
      config.optimization.minimize(true)
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
      })
    }
    // 生产环境注入cdn
    config.plugin('html').tap((args) => {
      args[0].title = setting?.title
      if (process.env.NODE_ENV !== 'development') {
        args[0].cdn = setting?.cdn?.pro
      } else {
        args[0].cdn = setting?.cdn?.dev
      }
      return args
    })
  },
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
  publicPath: process.env.NODE_ENV === 'production' ? '/' : './',
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: 'dist',
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: 'assets',
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  // filenameHashing: true,
  /* 代码保存时进行eslint检测 */
  lintOnSave: true,
  /* webpack-dev-server 相关配置 */
  devServer: {
    /* 自动打开浏览器 */
    open: false,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '0.0.0.0',
    port: setting?.port,
    https: false,
    hotOnly: false,
    disableHostCheck: true
    /* 使用代理 */
    // proxy: {}
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: false,
    // 开启 CSS source maps?
    // sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // 引入全局变量样式
        prependData: '@import "@/styles/variables.scss";'
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  }
}
