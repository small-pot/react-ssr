import React from 'react'
import './abc.less'
import http from '../../utils/http'
import { HashRouter,Switch, Route } from "react-router-dom";
import Hash from '../../components/common/Hash'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { DatePicker } from 'antd';

class Hello extends React.Component{
    constructor(props){
        super(props)
        console.log('hello')
    }
    componentDidMount(){
        http({
            method:'get',
            url:'/getTime.htm'
        }).then(res=>{
        })
    }
    timeChange(val){
        console.log(val)
    }
    render(){
        return <div style={{color:'red'}}>
            <img src={require('../../img/gg.jpg')} alt=""/>
            <div>time:{new Date(this.props.abc).toLocaleDateString()}</div>
            <DatePicker onChange={val=>this.timeChange(val)}/>
            <Hash component={
                <Switch>
                    <Route path={'/abc'} component={()=><div>我是abc组件</div>} />
                    <Route path={'/ttt'} component={()=><div>我是ttt组件</div>} />
                </Switch>
                }/>
        </div>
    }
}
export default connect(state=>{
    return state
})(Hello)