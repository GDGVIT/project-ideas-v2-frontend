import React, { Component } from 'react'
import { withAlert } from 'react-alert';
import {Button, Card, Row, Col} from 'antd'

class Admin extends Component{
    constructor(props) {
        super(props);
        this.state={
            unpubCards: [],
            rejCards:[],


        }
    }
    componentDidMount() {
        if(!localStorage.getItem("admintokenx12x12")){
            this.props.history.push('/adminloginx')
        }

        fetch(process.env.REACT_APP_BASEURL+'admin_app/unpublished_ideas/',{
            method: 'GET',
            headers: new Headers({
                'Authorization':localStorage.getItem('admintokenx12x12')
            })
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            this.setState({
                unpubCards: data.message
            })
        })
        .catch(err=>console.error(err))

        fetch(process.env.REACT_APP_BASEURL+'admin_app/rejected_ideas/',{
            method: 'GET',
            headers: new Headers({
                'Authorization':localStorage.getItem('admintokenx12x12')
            })
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            this.setState({
                rejCards: data.message
            })
        })
        .catch(err=>console.error(err))
        
    }

    logout = () =>{
        fetch(process.env.REACT_APP_BASEURL + "admin_app/logout/", {
            headers: new Headers({
                'Authorization': localStorage.getItem("admintokenx12x12")
                })
        })
        .then(response => response.json())
        .then(data => {
            localStorage.removeItem("admintokenx12x12")
            this.props.history.push("/adminloginx")
        })
        .catch(error => console.error(error))
    }
    
    reviewIdea = (iid, rtype) =>{
        let dataSent = {
            'idea_id': iid,
            'is_reviewed':rtype
        }
        fetch(process.env.REACT_APP_BASEURL + 'admin_app/unpublished_ideas/',{
            method: 'POST',
            headers: new Headers({
                'Authorization': localStorage.getItem("admintokenx12x12"),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(dataSent)
            
        })
        .then(res=>res.json())
        .then(data=>{
            this.props.alert.show(data.message)
            setTimeout(()=>{
                window.location.reload()
            }, 1500)
            // console.log(data)
        })
    }


    render(){
        const {unpubCards} = this.state;
        const {rejCards} = this.state;

        var cardz = unpubCards.map(data=>{
            return(
                <Card key={data.id} data-aos='fade-up'>
                    <Row gutter={16}>
                        <Col span={22} className='card-cont'>
                            <div><span style={{padding:'0px 20px 15px 0px', fontWeight:'bold'}}>{data.username} </span><span style={{paddingBottom:'15px', color:'lightgray'}}>{data.date_time}</span></div>
                            <div><h2>{data.project_title}</h2></div>
                            <div><p>{data.project_description}</p></div>
                            <div><p>{data.tags}</p></div>
                            <Button onClick={()=>{this.reviewIdea(data.id, 1)}} style={{marginRight:'10px'}}>Approve</Button>
                            <Button onClick={()=>{this.reviewIdea(data.id, 2)}}>Reject</Button>
                        </Col>
                    </Row>
              </Card>
            )
        })

        var rejc = rejCards.map(data=>{
            return(
                <Card key={data.id} data-aos='fade-up'>
                <Row gutter={16}>
                  <Col span={22} className='card-cont'>
                  <div><span style={{padding:'0px 20px 15px 0px', fontWeight:'bold'}}>{data.username} </span><span style={{paddingBottom:'15px', color:'lightgray'}}>{data.date_time}</span></div>
                    <div><h2>{data.project_title}</h2></div>
                    <div><p>{data.project_description}</p></div>
                    <div><p>{data.tags}</p></div>
                  </Col>
                </Row>
              </Card>
            )
        })

        return(
            <div style={{textAlign:'center'}}>
                <div className="admin">
                    <Button onClick={this.logout}>Logout</Button>
                </div>
                <h1>UNPUBLISHED IDEAS</h1>
                <div className="adminlogin">
                    {cardz}
                </div>
                <h1>Rejected ideas</h1>
                <div className="adminlogin"> 
                    {rejc}
                </div>
            </div>
        )
    }
}

export default withAlert()(Admin);