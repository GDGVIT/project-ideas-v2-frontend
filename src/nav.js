import React, { Component } from 'react'
import {Menu, Drawer, Dropdown} from 'antd'
import {NavLink, withRouter} from 'react-router-dom'
import dsc from './assets/dsclogo.png';
import Addidea from './addIdea';
import Load from './loader'
import firebase from "firebase/app";
import 'firebase/auth';
import { ReCaptcha } from 'react-recaptcha-v3';
import glogo from './assets/glogo.png'


var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

var recaptok = '';

class Nav extends Component{
    constructor(props){
        super(props);
        this.state={
            current: props.active,
            isLoggedIn: false,
            visible: false,
            loading: false
        }
    }
    
    verifyCallback = (recaptchaToken) => {
        // Here you will get the final recaptchaToken!!!  
        // console.log(recaptchaToken, "<= your recaptcha token")
        recaptok = recaptchaToken;
    }
    componentDidMount(){

        if(this.props.location.pathname === '/'){
            this.setState({
                current: 'home'
            })
        }else{
            this.setState({
                current: this.props.location.pathname  
            })
        }

        if(localStorage.getItem('token')){
            this.setState({
                isLoggedIn:true
            })
        }

        firebase.auth().getRedirectResult().then((result)=> {

            if (result.credential) {

                this.setState({
                    loading:true
                })
    
              // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // console.log(token)
                var user = result.user;
                // console.log(user)
                let dataSent = {
                    "username":user.displayName,
                    "platform":0,
                    "email":user.email,
                    "platform_name":'google',
                    'social_user_id':user.uid,
                    "g-recaptcha-response": recaptok

                }
                fetch(process.env.REACT_APP_BASEURL+'app/login_signup/',{
                    method:'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body:JSON.stringify(dataSent)
                })
                .then(res=>res.json())
                .then(data =>{
                    // console.log(data)
                    if(data){
                        this.setState({
                            isLoggedIn:true,
                            loading: false
                        })
                        localStorage.setItem("token", 'Token '+data.User.token)
                        localStorage.setItem("user", user.displayName)
                    }
                })
                .catch(error=>console.error(error))
            // ...
            }

            // The signed-in user info.
          }).catch(function(error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // console.log(error)
            // The email of the user's account used.
            // var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...
          });

    }

    handleClick = e => {
        // console.log('click ', e);
        if(e.key === "dsc"){
            window.location='http://www.dscvit.com';
        }else if(e.key ==='Profile' || e.key === 'ideaAdd'){
            // console.log('Please add a good idea! This will be reviewed by us :))')
        }else{
            this.setState({
            current: e.key,
            });
        }
      };
      logout=()=>{
        fetch('https://project-ideas-v2-backend.herokuapp.com/app/logout/', {
            headers: new Headers({
                'Authorization': localStorage.getItem("token")
                }),
        }).then(response => response.json())
        .then(data=>{
            localStorage.removeItem("token");
            this.setState({isLoggedIn:false})
        })
        .catch(error=>{
            if(error){
                console.error(error);
            }
        })



      }
      addIdea=()=>{
          this.setState({
              visible:true
          })
      }
      
      onClose = () =>{
          this.setState({
                visible: false
          })
      }
      logIn=()=>{
        firebase.auth().signInWithRedirect(provider);
      }

      lmenu = (
        <Menu>
          <Menu.Item onClick={this.logout}>
            <p>Logout</p>
          </Menu.Item>
        </Menu>
      );
    render(){
        const {loading} = this.state
        var {isLoggedIn} = this.state
        var prolog = isLoggedIn?(
            <Menu.Item className="profile l" key="Profile">
                <Dropdown overlay={this.lmenu}>
                    <p>Hey, {localStorage.getItem("user")}</p>
                </Dropdown>
            </Menu.Item>
        ):(
            <Menu.Item className="profile l" onClick={this.logIn} key="Profile">
                <p>Login <img src={glogo} alt="Google logo" /></p>
            </Menu.Item>
        );
        return(
           
            <div>
            <ReCaptcha
            sitekey="6Lcwf-UUAAAAAOQBtsfwGEjG4Y6iEkmQqbDy1uAz"
            action='/'
            verifyCallback={this.verifyCallback}
            />
            {loading && <Load />}
                <Menu onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal">
                    <Menu.Item key="dsc" className="navz">
                        <img src={dsc} alt="dsc-vit home"></img>
                    </Menu.Item>
                    <Menu.Item key="home">
                        <NavLink to="/">Home</NavLink>
                    </Menu.Item>
                    <Menu.Item key="ideas">
                        <NavLink to="/ideas">Ideas</NavLink>
                    </Menu.Item>
                    {prolog}
                    <Menu.Item className="profile" onClick={this.addIdea} key="ideaAdd">
                        <p style={{fontWeight:'bold'}}>Add an Idea</p>
                    </Menu.Item>
                </Menu>
                <Drawer
                        placement="right"
                        closable={true}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        width={window.innerWidth<400?(window.innerWidth):(400)}
                        zIndex="1001"
                    >
                        <Addidea />
                </Drawer>

            </div>
        );
    }
}

export default withRouter(Nav);