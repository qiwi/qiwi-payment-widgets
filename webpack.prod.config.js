/*билд разделен по папкам виджетов в widgets*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: {
        'widget300x300': './src/widget300x300/main.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'widget300x300'),
        chunkFilename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /.js?$/,
            exclude: /node_modules/
        },{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif|woff|woff2)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }]
        }, {
            test: /\.(eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['widget300x300']),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/widget300x300/index.html',
            chunks: ['widget300x300'],
            inject: false,
        })
    ]
};