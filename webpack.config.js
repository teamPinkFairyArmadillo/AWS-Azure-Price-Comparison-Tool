const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: [
        './client/index.js',
      ],
      //output is that we're bunding our webpack at bundle.js
      output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js',
      },
    //   devtool: 'eval-source-map',
        mode: 'development',
        devServer: {
          host: 'localhost',
          port: 8080,
  
          proxy: {
            '/api/': {
              target: 'http://localhost:3000/',
              secure: false,
            },
            '/assets/': {
              target: 'http://localhost:3000/',
              secure: false,
            },
          },
        },
        module: {
          rules: [
            {
              test: /.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react']
              }
              },
              
            },
            {
              test: /.(css|scss)$/,
              exclude: /node_modules/,
              use: ['style-loader', 'css-loader', 'postcss-loader'],
            }
          ],
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: './client/index.html',
          }),
          
        ],
        resolve: {
          // Enable importing JS / JSX files without specifying their extension
          extensions: ['.js', '.jsx'],
        },
}