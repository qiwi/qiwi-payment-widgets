module.exports = {
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
    }
};