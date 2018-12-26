import clientDone from './tools/clientDone'
import Loadable from 'react-loadable'
import proxy from 'http-proxy-middleware'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackConfig from './webpack.devServer'
import MFS from 'memory-fs'
import vm from 'vm'
const PORT=9999
const mfs=new MFS()
// let compiler;
// function serverDone() {
//     return new Promise((resolve, reject) => {
//         compiler=webpack(webpackConfig,function () {
//             resolve(compiler)
//         })
//         compiler.outputFileSystem=mfs;
//     })
// }
// Promise.all([clientDone(),serverDone()]).then(result=>{
//     const compiler=result[1]
//     const app=result[0];
//     app.use(proxy('/API', { target: `http://192.168.20.151:9000`,changeOrigin: true }))
//     app.use('/static', express.static(path.join(__dirname, 'source/static')))
//     let flag=true;
//     let str;
//     compiler.watch({},(err,stats)=>{
//         if(err) return console.error(err);
//         console.log('sever compile done')
//         const renderStr=mfs.readFileSync(path.join(webpackConfig.output.path,webpackConfig.output.filename),'utf-8')
//         console.log(str===renderStr)
//         str=renderStr
//         const sandbox={
//             console,
//             module,
//             require
//         }
//         vm.runInNewContext(renderStr,sandbox)
//         const render=sandbox.module.exports.default;
//         app.use((req, res, next) => {
//             const jsStr = `<script src="/app.js"></script>`
//             const cssStr = `<link href="/app.css" rel="stylesheet"/>`
//             render(req,res,jsStr,cssStr)
//         })
//         Loadable.preloadAll().then(() => {
//             flag&&app.listen(PORT, function () {
//                 console.log("成功启动：localhost:" + PORT)
//                 flag=false;
//             })
//         });
//     })
// })
clientDone().then(({app,tpl})=>{
    let flag=true
    let str;
    const compiler=webpack(webpackConfig)
    compiler.outputFileSystem=mfs;
    compiler.watch({},(err,stats)=>{
        if(err) return console.error(err)
        console.log('compiler done')
        const renderStr=mfs.readFileSync(path.join(webpackConfig.output.path,webpackConfig.output.filename),'utf-8');
        str=renderStr;
        const sandbox = {
            console,
            module,
            require
        }
        vm.runInNewContext(renderStr, sandbox)
        app.use((req, res, next) => {
            const render = sandbox.module.exports.default;
            // const jsStr = `<script src="/app.js"></script>`
            // const cssStr = `<link href="/app.css" rel="stylesheet"/>`
            render(req,res,tpl)
        })
        Loadable.preloadAll().then(() => {
            flag&&app.listen(PORT, function () {
                console.log("成功启动：localhost:" + PORT)
                flag=false
            })
        });
    })
    app.use(proxy('/API', { target: `http://192.168.20.151:9000`,changeOrigin: true }))
    app.use('/static', express.static(path.join(__dirname, 'source/static')))
}).catch(err=>console.error(err))