const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const handlebars = require('./webpack/handlebars');
const devserver = require('./webpack/devserver');
const babel = require('./webpack/babel');
const jsUglify = require('./webpack/js.uglify');
const less = require('./webpack/less');
const css = require('./webpack/css');
const extractCss = require('./webpack/css.extract');
const images = require('./webpack/images');

const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};

const common = merge([
    {
        entry: {
            'index': PATHS.source + '/app.js'
        },
        output: {
            path: PATHS.build,
            filename: 'js/[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
                template: PATHS.source + '/template/index.hbs'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            })
        ]
    },
    babel(),
    handlebars(),
    images()
]);

module.exports = env => {
    if (env === 'production') {
        return merge([
            common,
            jsUglify(),
            extractCss()
        ]);
    }
    if (env === 'development') {
        return merge([
            common,
            {
                devtool: 'eval',
            },
            devserver(),
            less(),
            css()
        ]);
    }
};