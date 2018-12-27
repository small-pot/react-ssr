import React from 'react'
import routerConfig from "./router/routerConfig";
import createStore from "./store/createStore";
import getReducer from './store/getReducer'

export default function (pathName,App,initState) {
    const reducer=routerConfig[pathName]&&routerConfig[pathName].reducer||{}
    // let Entry;
    // if(getReducer){
    //     Entry=getReducer((loaded)=>{
    //         const store=createStore(loaded.default,{txt:123456})
    //         return <App store={store} />
    //     })
    // }else{
    //     const store=createStore({},{txt:123456})
    //     Entry=()=><App store={store} />
    // }
    const store=createStore(reducer,initState)
    return ()=><App store={store} />
}