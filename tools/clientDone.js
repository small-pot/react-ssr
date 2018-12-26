const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const clientConfig = require('../webpack.dev.js')
const path=require('path')
const app = express()
export default function () {
    return new Promise((resolve, reject) => {
        const clientCompiler = webpack(clientConfig)
        app.use(webpackDevMiddleware(clientCompiler, {
            serverSideRender: true,
            //绑定中间件的公共路径,与webpack配置的路径相同
            publicPath: clientConfig.output.publicPath,
        }))
        clientCompiler.hooks.done.tap("done", stats => {
            console.log(5555,clientCompiler.outputPath)
            const info = stats.toJson();
            if (stats.hasWarnings()) {
                console.warn(info.warnings);
            }
            if (stats.hasErrors()) {
                return reject(info.errors)
            }
            const tpl=clientCompiler.outputFileSystem.readFileSync(path.join(clientCompiler.outputPath,'template.html'),'utf-8')
            resolve({app,tpl})
        });
    })
}