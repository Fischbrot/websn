const path = require('path')

const StyleLintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const DotenvPlugin = require('dotenv-webpack')

let websnConfig

try {
  websnConfig = require('./websn.config.json')
} catch (err) {
  console.error('No websn.config.json found.')

  process.exit(1)
}

let vendorCopy = []
const nodeModules = path.resolve(__dirname, './node_modules')

for (const copy of websnConfig.vendorCopy) {
  vendorCopy.push({
    context: `${nodeModules}/${copy.from}`,
    from: copy.files,
    to: copy.to
  })
}

module.exports = {
  entry: path.resolve(
    __dirname, websnConfig.input.base, websnConfig.input.entry
  ),
  output: {
    filename: websnConfig.output.scripts,
    path: path.resolve(__dirname, websnConfig.output.base)
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.scss'],
    alias: {
      '@@': path.resolve(__dirname, websnConfig.input.base)
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              includePaths: [
                path.resolve(
                  __dirname, websnConfig.input.base, websnConfig.input.styles
                )
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: false,
      watch: false
    }),
    new CopyWebpackPlugin([
      {
        context: websnConfig.input.base,
        from: '**/*',
        ignore: '**/*.{html,sass,scss,js,DS_Store}'
      },
      {
        context: websnConfig.input.base,
        from: '.**/*',
        ignore: '.**/*.{html,sass,scss,js,DS_Store}'
      },
      ...vendorCopy
    ]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new MiniCssExtractPlugin({
      filename: websnConfig.output.styles
    }),
    new StyleLintPlugin({
      syntax: 'scss'
    }),
    new DotenvPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  stats: {
    entrypoints: false,
    modules: false
  }
}
