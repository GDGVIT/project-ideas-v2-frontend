import React, { Component } from 'react'
import {Menu, Drawer, message} from 'antd'
import {NavLink, withRouter} from 'react-router-dom'
import Addidea from './addIdea';
import Load from './loader'
import firebase from "firebase/app";
import 'firebase/auth';
import { ReCaptcha } from 'react-recaptcha-v3';
import Profile from './profile';
import glogo from './assets/glogo.png';
import dsc from './assets/angleDSC.png';


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
            visibleProfile: false,
            visibleEdit: false,
            loading: false,
            currentUser: '',
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
                isLoggedIn:true,
                currentUser: localStorage.getItem('user')
            })
            
        }
        firebase.auth().getRedirectResult().then((result)=> {

            if (result.credential) {
                this.setState({
                    loading:true
                })
                var user = result.user;
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
             
                        if(data.User){
                            localStorage.setItem("token", 'Token '+data.User.token)
                            localStorage.setItem("user", user.displayName)
                            this.setState({
                                isLoggedIn: true,
                                currentUser: user.displayName
                            })
                            message.info('Logged in')
                            if(localStorage.getItem('server')){
                                const regDevBod = {
                                    "registration_id":localStorage.getItem('server')
                                }

                                fetch(`${process.env.REACT_APP_BASEURL}app/register_device/`,{
                                    method:'POST',
                                    headers: new Headers({
                                        "Authorization": localStorage.getItem('token'),
                                        "Content-Type":"application/json"
                                    }),
                                    body: JSON.stringify(regDevBod)
                                })
                                .then(res=>res.json())
                                .then(data=>{
                                    console.log(data)
                                })
                                .catch(err=>console.error(err))

                            }

                        }else{
                            message.info(data.error)
                        }
       
                    }else{
                        message.info("Something's wrong")
                    }
                    this.setState({
                        loading: false,
                    })
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
        fetch(process.env.REACT_APP_BASEURL+'app/logout/', {
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
      
      setlogin=()=>{
        this.setState({
            isLoggedIn: false
        })
        window.location.reload()
    }

      addIdea=()=>{
          this.setState({
              visible:true
          })
      }
      
      onClose = () =>{
          this.setState({
                visible: false,
                visibleProfile: false,
                visibleEdit: false
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
            <Menu.Item className="profile l" key="Profile" onClick={()=>{this.setState({visibleProfile:true})}}>
                    <p>{this.state.currentUser}</p>
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
                        <Addidea closeThis={this.onClose}/>
                </Drawer>
                <Drawer
                        placement="right"
                        closable={true}
                        onClose={this.onClose}
                        visible={this.state.visibleProfile}
                        width={window.innerWidth<400?(window.innerWidth):(400)}
                        zIndex="1001"
                        title="Profile"
                        destroyOnClose={true}
                    >
                        <Profile closeThis={this.onClose} setlogin={this.setlogin} />
                </Drawer>

            </div>
        );
    }
}

export default withRouter(Nav);