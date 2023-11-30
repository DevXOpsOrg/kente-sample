/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './lib/index.ts',
    cli: './lib/cli.ts',
  },
  devtool: 'cheap-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
    },
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    globalObject: 'this',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, './dist')],
    }),
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: '**/*',
    //       to: './templates',
    //       context: 'src/templates',
    //       globOptions: {
    //         dot: true,
    //         gitignore: true,
    //       },
    //     },
    //     {
    //       from: '**/*',
    //       to: './maintenance',
    //       context: 'maintenance',
    //       noErrorOnMissing: true,
    //     },
    //   ],
    // }),
  ],
  target: 'node',
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.handlebars$/, loader: 'handlebars-loader' },
    ],
  },
  optimization: {
    minimize: false,
  },
};
