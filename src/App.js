import React, {Component} from 'react';
import 'antd/dist/antd.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Home from './home'
import Ideas from './ideas'
import Sidea from './sideas'
import firebase from "firebase/app";
import firebaseConfig from './firebase.config';
import { loadReCaptcha } from 'react-recaptcha-v3'
import AOS from 'aos';
import 'aos/dist/aos.css';

firebase.initializeApp(firebaseConfig);

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
  componentDidMount() {
    loadReCaptcha("6Lcwf-UUAAAAAOQBtsfwGEjG4Y6iEkmQqbDy1uAz");
    AOS.init()
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
