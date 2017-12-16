module.exports = () => {
    return {
        module: {
            rules: [
                { 
                    test: /\.hbs$/, 
                    loader: 'handlebars-loader'
                }
            ]
        }
    }
};