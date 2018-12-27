import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import Loadable from 'react-loadable';
import Routes from './router/routes'
import {Provider} from 'react-redux'
import 'antd/dist/antd.less'
import './index.less'
import createEntry from './createEntry'
const pathName=location.pathname;
const App=({store})=>{
    return (
        <Provider store={store}>
            <BrowserRouter><Routes /></BrowserRouter>
        </Provider>
    )
}
const Entry=createEntry(pathName,App,window.INITSTATE)
document.cookie='id=12345'
window.main=()=>{
    Loadable.preloadReady().then(() => {
        ReactDom.render(
            <Entry />,
            document.getElementById('root')
        )
    });
}