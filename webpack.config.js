var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './static'),
        publicPath: '/static/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    }
                  // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    performance: {
        hints: false
    },
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // 解决后端路径问题
    module.exports.output.publicPath = './static/'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}else{
    module.exports.devServer={
        historyApiFallback: true,
        hot: true,
        inline: true,
        host:'0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://101.132.142.152:8080/yecz-test',
                pathRewrite: {'^/api' : ''},
                changeOrigin: true,
                secure: false
            }
        }
    },
    module.exports.devtool = '#eval-source-map'
}
