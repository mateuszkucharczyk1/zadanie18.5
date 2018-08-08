const path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let OptimizeJsPlugin = require('optimize-js-plugin');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let env = process.env.NODE_ENV || 'development';

let plugins =
    [new HtmlWebpackPlugin({
        template: 'client/index.html',
        filename: 'index.html',
        inject: 'body'
      })
    ];
//webpack.config.js

  module.exports = (env) => {
    if (env === 'production') {
      plugins.push(
            new webpack.optimize.UglifyJsPlugin(),
            new OptimizeJsPlugin({
                    sourceMap: false
            })
        )
    }

    return {
      entry:  [
      		'react-hot-loader/patch',
      		'./client/index.js'
      ],
      output: {
              filename: './bundle.js',
              path: path.resolve(__dirname, 'public'),
      },
        module: {
                rules: [
                    {
                        test: /\.js$/,
                        loader: "babel-loader"
                    },
                {
                  test: /\.css$/,
                  use: [
                      {loader: 'style-loader'},
                      {
                        loader: 'css-loader',
                        options: {
                          modules: true
                        }
                      }
                  ]
                },
                {
                  test: /\.scss$/,
                  use: [
                      {loader: 'style-loader'},
                      {
                        loader: 'css-loader',
                        options: {
                          modules: true
                        }
                      },
                      {
                        loader: 'sass-loader',
                        }
                  ]
              }
          ]
      },
      devServer: {
              	proxy: {
              		'/socket.io': {
              			target: 'http://localhost:3000',
              			ws: true
              		}
              }
          },
      plugins: plugins
    }
  };
