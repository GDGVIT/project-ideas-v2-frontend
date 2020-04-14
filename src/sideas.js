import React, { Component } from 'react'
import {withAlert} from 'react-alert'
import Nav from './nav'
import { Card, Row, Col, Input, Form} from 'antd'
import{CaretDownFilled, CaretUpFilled, MessageOutlined} from '@ant-design/icons'



class Sideas extends Component{
    constructor(props) {
        super(props);
        this.state={
          isLoggedIn: false,
          idea: [],
          comment:[]
        }
    }
  
  onChange=(value)=>{
    console.log(value)
  }

    onBlur=()=>{
      console.log('blur');
    }
    
  onFocus=()=>{
      console.log('focus');
    }
    
  onSearch=(val)=>{
      console.log('search:', val);
    }
  componentDidMount=()=>{
        fetch(process.env.REACT_APP_BASEURL+'app/view_idea/'+this.props.match.params.ideaID+'/',{
          method:'GET'
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          this.setState({
            idea: data.message
          })
        })
        .catch(error=>console.error(error))

        fetch(process.env.REACT_APP_BASEURL+'app/comment/'+this.props.match.params.ideaID+'/',{
            method:'GET'
          })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
            this.setState({
              comment: data.message
            })
        })
        .catch(error=>console.error(error))
       
    }

    addVote=(vote, id)=>{

      let cardsVoted = this.state.idea;
      cardsVoted.votes += vote 
      this.setState({
        idea: cardsVoted
      })
      console.log('otherstuff',vote, id)
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
addComment=(id, e, pid)=>{
  let votebody={
    'idea_id':id,
    'body':e.body,
    'parent_comment_id':pid
  }
  fetch(process.env.REACT_APP_BASEURL+'app/comment/',{
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
}
  
    render(){
      var {comment} = this.state;
      var coms = comment.map(data=>{
        let theDate = data.date_time.substring(0,10);
        var reps = data.child_comments.length>0?(data.child_comments.map(child=>{
          let repDate = child.date_time.substring(0,10);
          return(
            <Row gutter={16} className="subReply" key={child.id}>
            <Col span={1} className="vote">
            </Col>
            <Col span={22} className='card-cont '>
              <div><span style={{padding:'0px 20px 15px 0px', fontWeight:'bold'}}>{child.username} </span><span style={{paddingBottom:'15px', color:'lightgray'}}>{repDate}</span></div>
              <div><h3>{child.body}</h3></div>
            </Col>
          </Row>
          )
        })
        ):(<div></div>);
        return(
          <div key={data.id}>  
          <Row gutter={16} className="mainReply">
            <Col span={1} className="vote">
            </Col>
            <Col span={22} className='card-cont '>
              <div><span style={{padding:'0px 20px 15px 0px', fontWeight:'bold'}}>{data.username} </span><span style={{paddingBottom:'15px', color:'lightgray'}}>{theDate}</span></div>
              <div><h3>{data.body}</h3></div>
              <div> 
              <Form className="sikebich" onFinish={(val)=>{this.addComment(data.id, val, data.parent_comment_id)}}>
                    <Form.Item
                      name="body"
                    >
                      <Input placeholder="Add a comment" prefix={<MessageOutlined style={{color:'#2785FC', marginRight:'5px'}} />} /> 
                    </Form.Item>
                  </Form>
               </div>
            </Col>
          </Row>
          {reps}
          <hr />  
          </div>
        )
      })
      return(
      <div>
        <Nav active='ideas'/>
        <div className="main">
          {/* <div className="countryCss">
            <Select
                showSearch
                placeholder="Search for ideas"
                optionFilterProp="children"
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
              <Option key='1' value='bandersnatch'>Bandersnatch</Option>
              <Option key='2' value='bandersnatch'>Bandersnatch</Option>
              <Option key='3' value='bandersnatch'>Bandersnatch</Option>
              <Option key='4' value='bandersnatch'>Bandersnatch</Option>
            </Select>
          </div> */}
          <div className="IdeaCards">
            <Card key={this.state.idea.id}>
              <Row gutter={16}>
                <Col span={1} className="vote">
                  <CaretUpFilled style={{color:'#2785FC'}} onClick={()=>{this.addVote(1, this.state.idea.id)}} />
                  <p>{this.state.idea.votes}</p>
                  <CaretDownFilled style={{color:'#2785FC'}} onClick={()=>{this.addVote(-1, this.state.idea.id)}} />
                </Col>
                <Col span={22} className='card-cont'>
                  <div><p>{this.state.idea.username}</p></div>
                  <div><h2>{this.state.idea.project_title}</h2></div>
                  <div><h3>{this.state.idea.project_description}</h3></div>
                  <div> 
                  <Form name="parentComment" className="sikebich" onFinish={(val)=>{this.addComment(this.state.idea.id, val, this.state.idea.parent_comment_id)}}>
                    <Form.Item
                      name="body"
                    >
                      <Input placeholder="Add a comment" prefix={<MessageOutlined style={{color:'#2785FC', marginRight:'5px'}} />} /> 
                    </Form.Item>
                  </Form>
                  </div>  
                </Col>
              </Row>
              <hr />  
             {coms}
            </Card>
          </div>
        </div>
      </div>)
    }
}

export default withAlert()(Sideas)
