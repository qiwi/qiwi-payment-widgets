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
            test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 37000
                }
            }]
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            use: [
                'file-loader'
            ]
        }]
    }
};