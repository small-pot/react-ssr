import render from "./tools/render";
const path = require("path")
const express = require("express")
const proxy = require('http-proxy-middleware');
import React from 'react'
import Loadable from 'react-loadable';
import fs from 'fs'
const tpl=fs.readFileSync(path.join(__dirname,'dist/template.html'),'utf-8')
const app = express(),
    PORT = 8888 // 设置启动端口
app.use(express.static(path.join(__dirname,'dist')))
//app.use(proxy('/mnst', { target: `http://localhost:8002` }));
app.use((req, res,next) => {
    // const jsStr = `<script src="${mainfest["runtime.js"]}"></script><script src="${mainfest["vendor.js"]}"></script><script src="${mainfest["app.js"]}"></script>`
    // let cssStr = `<link href="${mainfest["app.css"]}" rel="stylesheet"/>`
    // if(mainfest['vendor.css']){
    //     cssStr+=`<link href="${mainfest["vendor.css"]}" rel="stylesheet"/>`
    // }
    render(req,res,tpl)
})
Loadable.preloadAll().then(() => {
    app.listen(PORT, function () {
        console.log("成功启动：localhost:" + PORT)
    })
});