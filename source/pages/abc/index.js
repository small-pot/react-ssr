import React from 'react'
import './abc.less'
import http from '#/http'
import { HashRouter,Switch, Route } from "react-router-dom";
import Hash from '../../components/common/Hash'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { DatePicker } from 'antd';
import moment from '#/moment'

class Hello extends React.Component{
    static propTypes={
        time:PropTypes.string
    }
    constructor(props){
        super(props)
    }
    componentDidMount(){
        http({
            method:'get',
            url:'/getTime.htm'
        }).then(res=>{
        })
    }
    timeChange(moment,time){
        this.props.dispatch({type:'getTime',time})
    }
    render(){
        return <div className='abc'>
            <img src={require('../../img/gg.jpg')} alt=""/>
            <div onClick={()=>console.log(8888)}>time:{this.props.time}</div>
            <DatePicker onChange={(moment,val)=>this.timeChange(moment,val)} value={moment(this.props.time)}/>
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
    return {
        time:state.time
    }
})(Hello)