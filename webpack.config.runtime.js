const path = require('path');
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
    }
};



