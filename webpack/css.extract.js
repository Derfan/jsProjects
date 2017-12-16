const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = paths => {
    return {
        module: {
            rules: [
                {
                    test: /\.less$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: ['css-loader', 'less-loader'],
                    }),
                },
                {
                    test: /\.css$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader',
                    }),
                },
            ],
        },
        plugins: [
            new ExtractTextPlugin('css/[name].css'),
        ],
    };
};