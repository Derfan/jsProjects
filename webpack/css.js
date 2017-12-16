module.exports = (paths) => {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include: paths,
                    loader: [
                        'style-loader',
                        'css-loader'
                    ]
                }
            ]
        }
    }
};