const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function (folder, ENV) {
    let plugins = [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        }),
        new OptimizeCssAssetsPlugin(),
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise',
            'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(ENV)
            }
        }),
        new HtmlWebpackPlugin({
            template: '../src/public/index.html',
            inject: 'body'
        })
    ];
    return {
        output: {
            filename: 'bundle.[hash].js',
            path: path.resolve(__dirname, folder),
            chunkFilename: 'bundle.js'
        },
        optimization: {
            minimize: process.env.NODE_ENV === 'production'
        },
        module: {
            rules: [{
                test: /.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            }, {
                test: /\.(svg|woff|woff2|eot|ttf|otf)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        esModule: false
                    }
                }]
            }, {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    }
                }]
            }]
        },
        plugins
    };
};
