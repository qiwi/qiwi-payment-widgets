/*в widgets с главным index.html также папки с виджетами*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    devtool: 'eval-source-map',
    entry: {
        'main': './src/main.js',
        'widget300x300': './src/widget300x300/main.js'
    },
    output: {
        filename: '[name]/bundle.js',
        path: path.resolve(__dirname, 'widgets'),
        publicPath: '../',
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['main'],
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'widget300x300/index.html',
            template: './src/widget300x300/index.html',
            chunks: ['widget300x300'],
            inject: false
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'widgets'),
        hot: true,
        port: 9280,
        publicPath: '/'
    }
};