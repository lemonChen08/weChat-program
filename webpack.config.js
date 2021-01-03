const path = require('path');
const glob = require('glob')
const VueloaderPlugin = require('vue-loader/lib/plugin');
const NODE_ENV = process.env.NODE_ENV;
//将css文件抽出来生成一个单独的文件
const miniCssPlugin = require("mini-css-extract-plugin");
//动态引入相应的js文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = NODE_ENV === 'production'; //生产环境

module.exports = {
    mode: NODE_ENV,
    entry: './src/main.js',
    output: {
        filename: 'bundle@[chunkhash].js'
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.vue', ".js", ".json", ".jsx", ".css"],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }, 
    module: {
        rules: [
            {
                test: /\.vue$/,
                include: [path.resolve(__dirname, 'src')],
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src')],
                loader: 'babel-loader'
            },
            // CSS, and Sass
            {
                test: /\.(scss|css)$/,
                use: [isProd ? miniCssPlugin.loader : 'style-loader', 'css-loader','postcss-loader', 'sass-loader']
            },
            // less
            {
                test: /\.less$/,
                use: [ isProd ? miniCssPlugin.loader : 'style-loader', 'css-loader', 'less-loader']
            },
            // Images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[base]'
                }
            },
            // Fonts and SVGs
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            }
        ]
    },
    plugins: [
        //vue模块加载插件
        new VueloaderPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new miniCssPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    //开发环境设置
    devServer: {
        port: 8080,
        host: '127.0.0.1',
        compress: true,
        allowedHosts: [
            ".welaipay.com"
        ],
        proxy: {
            '/api': {
                target: `127.0.0.1`,
                changeOrigin: true, // needed for virtual hosted sites
                pathRewrite: {
                    '^api':''
                }
            }
        }
    },
    //优化
    optimization: {
        //代码分块，减少重复模块打包
        splitChunks: {
             chunks: 'all'   //对所有的chunk生效
        }
    }
}