const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {ReactLoadablePlugin} = require('react-loadable/webpack');
const htmlPlugin=require('html-webpack-plugin')
const isPro = process.env.NODE_ENV === 'production';


const cssLoader = [
    {
        loader: 'css-loader',
        options: {
            javascriptEnabled: true,
            importLoaders: 1,
            minimize: isPro
        }
    },
    {loader: "postcss-loader"}
];

function use(loaders) {
    //return [isPro ? MiniCssExtractPlugin.loader : {loader: 'style-loader'}, ...loaders]
    return [MiniCssExtractPlugin.loader, ...loaders]
}

module.exports = {
    entry: {app: './source/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'source'),
            'SERVERHTTP': path.resolve(__dirname, 'tools/serverHttp.js'),
            "HTTP": path.resolve(__dirname, 'source/utils/http')
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                //include: [path.join(__dirname, 'source')],
                use: use(cssLoader)
            },
            {
                test: /\.less$/,
                //include: [path.join(__dirname, 'source')],
                use: use([
                    ...cssLoader,
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    }])
            },
            {
                //图片加载器，可以将较小的图片转成base64，减少http请求，将小于8192byte的图片转成base64码
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'img/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ReactLoadablePlugin({
            filename: './dist/react-loadable.json',
        }),
        new htmlPlugin({
            template:'./source/template.html',
            filename: "template.html"
        })
    ]
};