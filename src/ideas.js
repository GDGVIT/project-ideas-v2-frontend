import React, { Component } from 'react'
import {withAlert} from 'react-alert'
import Nav from './nav'
import {Select, Card, Row, Col, Input} from 'antd'
import{CaretDownFilled, CaretUpFilled, MessageOutlined} from '@ant-design/icons'


const { Option } = Select;

class Ideas extends Component{
    constructor(props) {
        super(props);
        this.state={
          isLoggedIn: false,
          cards: []
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
    fetch(process.env.REACT_APP_BASEURL+'app/published_ideas/', {
      method:'GET'
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      this.setState({
        cards:data.message
      })
    })
  }
  
  addVote=(vote, id, index)=>{

    let cardsVoted = this.state.cards;
    cardsVoted[index].votes += vote 
    this.setState({
      cards: cardsVoted
    })
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
    .then(res=>res.json())
    .then(data=>{
      this.props.alert.show(data.message)
    })
    // this.setState({
      
    // })
  }
  openSidea=(id)=>{
    this.props.history.push('/ideas/'+id)
  }

    render(){
      var {cards} = this.state;
      let ideaz = cards.map((data, index)=>{
         console.log(index)
        let theDate = data.date_time.substring(0,10);
        return(
          <Card key={data.id}>
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
            {ideaz}
          </div>
        </div>
      </div>)
    }
}

export default withAlert()(Ideas)
