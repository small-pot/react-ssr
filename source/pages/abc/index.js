import Loadable from 'react-loadable'
export default {
    path:'/',
    name: 'abc',
    title: '官网主页',
    keywords: '官网关键字',
    description: '官网描述',
    Component: Loadable({
        loader: () => import('./abc'),
        loading:()=>null
    }),
    reducer: require('./reducer').default,
    getSyncDate: require('./getSyncData').default
}