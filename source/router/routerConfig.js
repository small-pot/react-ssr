import React from 'react'
// import Loadable from 'react-loadable';
// const loading=()=>null
const context = require.context('../pages', true, /index\.js$/);
const config={}
context.keys().forEach(pathname=>{
    const item=context(pathname).default
    config[item.path]=item;
})
export default config
// export default {
//     '/':{
//         name:'abc',
//         title:'官网主页',
//         keywords:'官网关键字',
//         description:'官网描述',
//         Component:Loadable({
//             loader:()=>import('../pages/abc'),
//             loading
//         }),
//         reducer:require('../pages/abc/reducer').default,
//         getSyncDate:require('../pages/abc/getSyncData').default
//     },
//     '/guide':{
//         name:'guide',
//         title:'guide主页',
//         keywords:'guide关键字',
//         description:'guide描述',
//         Component:Loadable({
//             loader:()=>import('../pages/guide'),
//             loading
//         }),
//         reducer:require('../pages/guide/reducer').default,
//     }
// }