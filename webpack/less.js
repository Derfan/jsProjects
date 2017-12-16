module.exports = (paths) => {
    return {
        module: {
            rules: [
                {
                    test: /\.less$/,
                    include: paths,
                    loader: [
                        'style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                }
            ]
        }
    }
};