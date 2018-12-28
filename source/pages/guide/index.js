import Loadable from 'react-loadable'
export default {
    path:'/guide',
    name: 'guide',
    title: 'guide主页',
    keywords: 'guide关键字',
    description: 'guide描述',
    Component: Loadable({
        loader: () => import('./guide'),
        loading:()=>null
    }),
    reducer: require('./reducer').default,
}