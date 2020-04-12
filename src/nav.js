import React, { Component } from 'react'
import {Menu, Drawer} from 'antd'
import {NavLink, withRouter} from 'react-router-dom'
import dsc from './assets/dsclogo.png';
import Addidea from './addIdea'

class Nav extends Component{
    constructor(props){
        super(props);
        this.state={
            current: props.active,
            isLoggedIn: false,
            visible: false
        }
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

    }

    handleClick = e => {
        // console.log('click ', e);
        if(e.key === "dsc"){
            window.location='http://www.dscvit.com';
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
        }).then(response => {
            if(response.status === 200 || response.status===201 || response.status===202){
                return response.json();
            }else{
                if(response.status===406){
                    alert.show("Unauthorized user")
                    this.props.history.push("/login")
                }
            }
        }).then(data=>{
            alert.show(data.message)
        })
        .catch(error=>{
            console.error(error);
            
        })


          localStorage.removeItem("token");

            this.props.history.push("/");
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
          console.log("user wants to login")
      }

    render(){
        var {isLoggedIn} = this.state
        var prolog = isLoggedIn?(
            <Menu.Item className="profile l" onClick={this.logout} key="Profile">
                <p>Hey Ash</p>
            </Menu.Item>
        ):(
            <Menu.Item className="profile l" onClick={this.logIn} key="Profile">
                <p>Login</p>
            </Menu.Item>
        );
        return(
           
            <div>
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
                        width={window.innerWidth}
                        zIndex="1001"
                    >
                        <Addidea />
                </Drawer>
            </div>
        );
    }
}

export default withRouter(Nav);