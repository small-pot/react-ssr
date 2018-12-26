import React from 'react'
import { HashRouter } from "react-router-dom";

export default class Hash extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isMounted:false
        }
    }
    componentDidMount() {
        this.setState({
            isMounted:true
        })
    }
    render(){
        return this.state.isMounted?<HashRouter>{this.props.component}</HashRouter>:null
    }
}