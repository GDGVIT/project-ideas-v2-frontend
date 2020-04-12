import React, { Component } from 'react'
import {withAlert} from 'react-alert'
import Nav from './nav'


class Home extends Component{
    constructor(props) {
        super(props);
        this.state={
          isLoggedIn: false
        }
    }
    render(){
      return(
      <div>
      <Nav active='home'/>
        <div >
          <h2>THIS WILL BE THE HOME PAGE</h2>
        </div>
      </div>
      )
    }
}

export default withAlert()(Home)