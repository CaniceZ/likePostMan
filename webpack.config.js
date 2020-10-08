const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const original = JSON.parse(process.env.npm_config_argv).original
const url = original[original.findIndex(item => item === '-url') + 1]
console.log(url)
module.exports = {
  entry:{
    index: './src/index.js' //['babel-polyfill', './src/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module:{
    rules:[
      {
        test: /\.js?$/, // jsx/js文件的正则
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use:{
          // loader 是 babel
          loader: 'babel-loader',
          options: {
            // babel 转义的配置选项
            babelrc: false,
            presets: [
              ["@babel/preset-env",{
                "useBuiltIns":"usage"
              }],
              // [require.resolve('@babel/preset-env'), {modules: false}]
            ],
            cacheDirectory: true
          }
        }
      }
    ]
  },
  plugins:[
    new HtmlWebPackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: true
    })
  ],
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 3000,
    proxy: {
      '/api': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    },
  }
}
