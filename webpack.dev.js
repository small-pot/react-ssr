const webpack=require('webpack');
const config=require('./webpack.base.config')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const babelConfig=require('./tools/clentBabelConfig')
const webpackConfig =merge(config,{
    mode:'development',
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: babelConfig
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new webpack.NamedModulesPlugin()
    ]
});
module.exports=webpackConfig
