const path = require('path');

module.exports = {
    entry: "./index.js",
    
    output: {
        path: path.resolve(__dirname, './bundle'),
        filename: "./bundle.js"
    },

    devServer: {
        hot: true,
        static: {
            directory: __dirname 
        },
        port: 3000,
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },

            {
                test: /\.(png|svg)/,
                type: 'asset/resource'
            }

        ]
    },

    resolve: {
        extensions: ['*', '.js', '.jsx', '.css']
    }
    
}