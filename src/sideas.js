import React, { Component } from 'react'
import {withAlert} from 'react-alert'
import Nav from './nav'
import {Select, Card, Row, Col, Input} from 'antd'
import{CaretDownFilled, CaretUpFilled, MessageOutlined} from '@ant-design/icons'


const { Option } = Select;

class Sideas extends Component{
    constructor(props) {
        super(props);
        this.state={
          isLoggedIn: false
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
        console.log(this.props.match.params)
    }
    render(){
      return(
      <div>
        <Nav active='ideas'/>
        <div className="main">
          <div className="countryCss">
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
          </div>
          <div className="IdeaCards">
            <Card key='1'>
              <Row gutter={16}>
                <Col span={1} className="vote">
                  <CaretUpFilled style={{color:'#2785FC'}} />
                  <p>32</p>
                  <CaretDownFilled style={{color:'#2785FC'}} />
                </Col>
                <Col span={22} className='card-cont'>
                  <div><p>Ashutosh</p></div>
                  <div><h2>Idea - id: {this.props.match.params.ideaID}</h2></div>
                  <div><h3>lorem ipsum dolor sit amet ne khai kheer jisme cocaine mili hui thi. Ab woh tihar jail mei pyaaj roti khaata hai.lorem ipsum dolor sit amet ne khai kheer jisme cocaine mili hui thi. Ab woh tihar jail mei pyaaj roti khaata hai.lorem ipsum dolor sit amet ne khai kheer jisme cocaine mili hui thi. Ab woh tihar jail mei pyaaj roti khaata hai.lorem ipsum dolor sit amet ne khai kheer jisme cocaine mili hui thi. Ab woh tihar jail mei pyaaj roti khaata hai.lorem ipsum dolor sit amet ne khai kheer jisme cocaine mili hui thi. Ab woh tihar jail mei pyaaj roti khaata hai.lorem ipsum dolor sit amet ne khai kheer jisme cocaine mili hui thi. Ab woh tihar jail mei pyaaj roti khaata hai.lorem ipsum dolor sit amet ne khai kheer jisme cocaine mili hui thi. Ab woh tihar jail mei pyaaj roti khaata hai.lorem ipsum dolor sit amet ne khai kheer jisme cocaine mili hui thi. Ab woh tihar jail mei pyaaj roti khaata hai.lorem ipsum dolor sit amet ne khai kheer jisme cocaine mili hui thi. Ab woh tihar jail mei pyaaj roti khaata hai.</h3></div>
                  <div> <Input placeholder="Add a comment" prefix={<MessageOutlined style={{color:'#2785FC', marginRight:'5px'}} />} /> </div>
                </Col>
              </Row>
              <hr />  
              <div>  
              <Row gutter={16} className="mainReply">
                <Col span={1} className="vote">
                </Col>
                <Col span={22} className='card-cont '>
                  <div><span style={{padding:'0px 20px 15px 0px', fontWeight:'bold'}}>Ashutosh </span><span style={{paddingBottom:'15px', color:'lightgray'}}>13 April 2020</span></div>
                  <div><h3>Yo this the reply r u ok lorem</h3></div>
                  <div> <Input placeholder="Add a comment" prefix={<MessageOutlined style={{color:'#2785FC', marginRight:'5px'}} />} /> </div>
                </Col>
              </Row>
              <Row gutter={16} className="subReply">
                <Col span={1} className="vote">
                </Col>
                <Col span={22} className='card-cont '>
                  <div><span style={{padding:'0px 20px 15px 0px', fontWeight:'bold'}}>Ashutosh </span><span style={{paddingBottom:'15px', color:'lightgray'}}>13 April 2020</span></div>
                  <div><h3>Yo this the reply r u ok lorem</h3></div>
                </Col>
              </Row>
              <hr />  
              </div>
            </Card>
          </div>
        </div>
      </div>)
    }
}

export default withAlert()(Sideas)
