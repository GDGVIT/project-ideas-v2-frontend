import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {BrowserRouter, Route, withRouter, Switch} from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Home from './home'
import Ideas from './ideas'
import Sidea from './sideas'

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

class App extends Component{
  constructor(props) {
      super(props);
      this.state={
        isLoggedIn: false
      }
  }
  render(){
    return(

      <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...options}>
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/ideas' component={Ideas} />
              <Route exact path='/ideas/:ideaID' component={Sidea} />
            </Switch>
          </div>
        </AlertProvider>
      </BrowserRouter>

    )
  }
}

export default App;
