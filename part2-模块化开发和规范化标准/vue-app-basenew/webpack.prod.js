const common = require('./webpack.commmon.js')
const merge  = require('webpack-merge')
const { ClearWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common,{
    mode: 'production',
    plugins: [
    //     new ClearWebpackPlugin(),
        new CopyWebpackPlugin(['public/*.ico'])
    ]




})