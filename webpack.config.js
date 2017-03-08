const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: [
        './index.jsx',
        './styles/index.css',
        './html/index.html'
    ],
    output: {
        filename: 'js/app.js',
        path: './dist',
        sourceMapFilename: '[name].js.map',
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: "babel-loader",
            query: {
                presets: ['es2015', 'react'],
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?importLoaders=1&minimize=true!postcss-loader'
            })
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }, {
            test: /\.(html)$/,
            loader: 'file-loader?name=/[name].[ext]!html-minify-loader'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                'html-minify-loader': {
                    empty: true,
                    cdata: true,
                    comments: false,
                    dom: {lowerCaseAttributeNames: false}
                },
                postcss: [
                    require('postcss-import'),
                    require('postcss-cssnext'),
                    require('postcss-nested')
                ]
            }
        }),
        new ExtractTextPlugin({
            filename: './css/styles.css',
            disable: false,
            allChunks: true
        })
    ]
};
