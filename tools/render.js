import React from 'react'
//import tpl from "./tpl";
import routerConfig from '../source/router/routerConfig'
import {renderToStaticMarkup} from 'react-dom/server'
import {getBundles} from "react-loadable/webpack"
import Loadable from "react-loadable"
import url from 'url'
import App from '../source/entry-server'
import stats from '../dist/react-loadable'


function getResource(modules){
    let bundles = getBundles(stats, modules);
    const js=bundles.filter(opt => opt.file.endsWith('.js')).map(opt => `<script src="${opt.publicPath}"></script>`).join('')
    const css=bundles.filter(opt => opt.file.endsWith('.css')).map(opt => `<link href="${opt.publicPath}" rel="stylesheet"/>`).join('')
    return {js,css}
}
export default async function (req,res,tpl) {
    const pathname=url.parse(req.url).pathname;
    const item =routerConfig[pathname]
    if(!item) {
        return
    }
    let data={};
    if(item.getSyncDate){
        data[item.name]=await item.getSyncDate(req)
    }
    let modules = [];
    const html = renderToStaticMarkup(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <App location={req.url} context={{}} initState={data}/>
        </Loadable.Capture>
    )
    console.log(html)
    const {js,css}=getResource(modules)
    const result=tpl
        .replace('{{title}}',item.title)
        .replace('{{description}}',item.description)
        .replace('{{keywords}}',item.keywords)
        .replace('</head>',css+'</head>')
        .replace('<!--react-entry-->',html)
        .replace('</body>',js+'</body>')
    //res.send(tpl(item, html,JSON.stringify(data),jsStr+js, cssStr+css))
    console.log(result)
    res.send(result)
}