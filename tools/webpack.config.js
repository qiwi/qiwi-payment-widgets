const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function (folder, ENV) {
    let plugins = [
        new ExtractTextPlugin('[name].[hash].css'),
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
    if (process.env.NODE_ENV === 'production') {
        plugins.unshift(new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }));
    }
    return {
        output: {
            filename: 'bundle.[hash].js',
            path: path.resolve(__dirname, folder),
            chunkFilename: 'bundle.js'
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
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }, {
                test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000
                    }
                }]
            }, {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    'file-loader'
                ]
            }]
        },
        plugins
    };
};
