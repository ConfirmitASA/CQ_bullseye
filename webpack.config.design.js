const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {index: './dev_design/index.jsx'},
    output: {
        filename: './[name].bundle.js',
        path: path.resolve(__dirname, 'design'),
    },
    optimization: {
        minimize: false
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.json$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'json-loader'
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                // modules = false generates 'normal' css class nemaes, but could lead to name conflicts //
                use: ['style-loader', {loader: 'css-loader', options: {modules: false}}],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(html)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attributes: false,
                        // attributes: {
                        //     list: [
                        //         {
                        //             tag: 'link',
                        //             attribute: 'href',
                        //             type: 'src'
                        //         }
                        //     ]
                        // }
                    }
                }
            }

        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './dev_design/index.html',
            filename: './index.html'
        })
        ,
        new CopyPlugin({
            patterns: [
                path.resolve(__dirname, 'dev_design', 'custom-question.js'),
                path.resolve(__dirname, 'dev_design', 'customSettingsStyles.css'),
                path.resolve(__dirname, 'dev_design', 'design.js')
            ],
        })
    ]
};



