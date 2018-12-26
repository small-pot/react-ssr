const path = require("path")
const express = require("express")
const webpack = require("webpack")
const proxy = require('http-proxy-middleware');
const webpackDevMiddleware = require("webpack-dev-middleware")
const clientConfig = require('./webpack.dev.js')
import Loadable from 'react-loadable';
const app = express()
const PORT = 9999
// let flag=true;
// const clientCompiler = webpack(clientConfig)
// app.use(webpackDevMiddleware(clientCompiler, {
//     serverSideRender: true,
//     //绑定中间件的公共路径,与webpack配置的路径相同
//     publicPath: clientConfig.output.publicPath,
// }))
// let j;
// clientCompiler.hooks.done.tap("done", stats => {
//     const info = stats.toJson();
//     if (stats.hasWarnings()) {
//         console.warn(info.warnings);
//     }
//     if (stats.hasErrors()) {
//         console.error(info.errors);
//     }
//     console.log(55555)
//     app.use(proxy('/API', { target: `http://192.168.20.151:9000`,changeOrigin: true }))
//     app.use('/static', express.static(path.join(__dirname, 'source/static')))
//     const render=require('./tools/render.js').default
//     const json=require('./dist/react-loadable');
//     console.log(j==json)
//     j=json
//     app.use((req, res, next) => {
//         const jsStr = `<script src="/app.js"></script>`
//         const cssStr = `<link href="/app.css" rel="stylesheet"/>`
//         render(req,res,json,jsStr,cssStr)
//     })
//     flag&&Loadable.preloadAll().then(() => {
//         app.listen(PORT, function () {
//             console.log("成功启动：localhost:" + PORT)
//         })
//         flag=false
//     });
// });
export default function () {
    return new Promise((resolve, reject) => {
        const app = express()
        const clientCompiler = webpack(clientConfig)
        app.use(webpackDevMiddleware(clientCompiler, {
            serverSideRender: true,
            //绑定中间件的公共路径,与webpack配置的路径相同
            publicPath: clientConfig.output.publicPath,
        }))
        clientCompiler.hooks.done.tap("done", stats => {
            const info = stats.toJson();
            if (stats.hasWarnings()) {
                console.warn(info.warnings);
            }
            if (stats.hasErrors()) {
                //console.error(info.errors);
                return reject(info.errors)
            }
            resolve(app)
        });
    })
}