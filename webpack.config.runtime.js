const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: './runtime_dev/entry.js',
    output: {
        filename: './bullsEye_bundle.js',
        path: path.resolve(__dirname, 'runtime'),
    },
    optimization: {
        minimize: false
    },
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
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                path.resolve(__dirname, 'runtime_dev', 'styles.css'),
                path.resolve(__dirname, 'runtime_dev', 'component.js')
            ],
        })
    ]
};



