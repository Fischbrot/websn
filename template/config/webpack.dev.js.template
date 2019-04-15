const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common.js')

let websnConfig

try {
  websnConfig = require('./websn.config.json')
} catch (err) {
  console.error('No websn.config.json found.')

  process.exit(1)
}

const htmlWebpackPlugins = []

for (const htmlFile of websnConfig.input.htmlFiles) {
  htmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      filename: htmlFile,
      template: path.resolve(__dirname, websnConfig.input.base, htmlFile)
    })
  )
}

module.exports = merge(common, {
  plugins: [
    new WriteFileWebpackPlugin({
      test: new RegExp(
        `.${websnConfig.devServer.reloadOnChange.join('|')}$`, 'i'
      )
    }),
    ...htmlWebpackPlugins,
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, websnConfig.output.base),
    watchContentBase: true,
    host: websnConfig.devServer.host,
    disableHostCheck: websnConfig.devServer.disableHostCheck,
    port: websnConfig.devServer.port,
    open: websnConfig.devServer.open,
    hot: websnConfig.devServer.hot,
    overlay: websnConfig.devServer.overlay,
    stats: {
      entrypoints: false,
      modules: false
    }
  }
})
