/*билд разделен по папкам виджетов в widgets*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mainConfig = require('./webpack.config.js');
/*const CleanWebpackPlugin = require('clean-webpack-plugin');*/


module.exports = function(scriptsPath, folder, env) {
    const config = {
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, folder),
            chunkFilename: 'bundle.js'
        },
        plugins: [
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
                    'NODE_ENV': JSON.stringify(env)
                }
            }),
            new HtmlWebpackPlugin({
                template: path.join(scriptsPath, folder,'/index.html'),
                inject: 'body'
            })
        ]
    };

    return Object.assign({}, config, mainConfig);
};