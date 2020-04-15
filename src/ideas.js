import React, { Component } from 'react'
import {withAlert} from 'react-alert'
import Nav from './nav'
import { Card, Row, Col, Input} from 'antd'
import{CaretDownFilled, CaretUpFilled, MessageOutlined} from '@ant-design/icons'
import Load2 from './loading2'


// const { Option } = Select;

class Ideas extends Component{
    constructor(props) {
        super(props);
        this.state={
          isLoggedIn: false,
          cards: [],
          loading: false
        }
    }

    // SELECT CSS
  onChange=(e)=>{
    e.persist()
    console.log(e)
  fetch(process.env.REACT_APP_BASEURL+'app/search_published_ideas/?text='+e.target.value,{
      method:'GET'
    })
    .then(res=>res.json())
    .then(data=>{
      if(!data){
        this.props.alert.show("Couldn't find any such entry")
      }else{
        this.setState({
          cards:data.message
        })
      }
    })
    .catch(error=>console.error(error))
  }

  componentDidMount() {
    this.setState({
      loading:true
    })
    fetch(process.env.REACT_APP_BASEURL+'app/published_ideas/', {
      method:'GET'
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      this.setState({
        cards:data.message
      })
      this.setState({
        loading:false
      })
    })
  }
  
  addVote=(vote, id, index)=>{

    let cardsVoted = this.state.cards;
    console.log('otherstuff',vote, id, index)
   let votebody = {
      'idea_id':id,
      'vote_type':vote
    }
    fetch(process.env.REACT_APP_BASEURL+'app/vote/',{
      method:'POST',
      headers: new Headers({
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      body:JSON.stringify(votebody)
    })
    .then(res=>{
      if(res.status===200 || res.status===201 ||res.status===202||res.status===203||res.status===204){
        cardsVoted[index].votes += vote 
        this.setState({
          cards: cardsVoted
        })
        return(res.json())
      }else{
        return(res.json())
      }
    })
    .then(data=>{
      if(data.message){
        this.props.alert.show(data.message)
      }
    })
    .catch(error=>console.error(error))
    // this.setState({
      
    // })
  }
  openSidea=(id)=>{
    this.props.history.push('/ideas/'+id)
  }

    render(){
      const {loading} = this.state
      var {cards} = this.state;
      let ideaz = cards.map((data, index)=>{
         console.log(index)
        let theDate = data.date_time.substring(0,10);
        return(
          <Card key={data.id} data-aos='fade-up'>
          <Row gutter={16}>
            <Col span={1} className="vote">
              <CaretUpFilled style={{color:'#2785FC'}} onClick={()=>{this.addVote(1, data.id, index)}} />
              <p>{data.votes}</p>
              <CaretDownFilled style={{color:'#2785FC'}} onClick={()=>{this.addVote(-1, data.id, index)}} />
            </Col>
            <Col span={22} className='card-cont'>
            <div><span style={{padding:'0px 20px 15px 0px', fontWeight:'bold'}}>{data.username} </span><span style={{paddingBottom:'15px', color:'lightgray'}}>{theDate}</span></div>
              <div><h2>{data.project_title}</h2></div>
              <div><p>{data.project_description}</p></div>
              <div onClick={()=>{this.openSidea(data.id)}} className="sideaOpener" ><p className="commentAdd"><MessageOutlined style={{color:'#2785FC', marginRight:'5px'}} />Discuss...></p></div>
            </Col>
          </Row>
        </Card>
        )
      })
      return(
      <div>
        <Nav active='ideas'/>
        <div className="main">
          <div className="countryCss">
            <Input placeholder="Search for ideas" onChange={this.onChange}/>
          </div>
          <div className="IdeaCards">
          {loading && <Load2 />}
            {ideaz}
          </div>
        </div>
      </div>)
    }
}

export default withAlert()(Ideas)
