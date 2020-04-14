import React, { Component } from 'react'
import {withAlert} from 'react-alert'
import Nav from './nav'
import { Card, Row, Col} from 'antd'


class Home extends Component{
    constructor(props) {
        super(props);
        this.state={
          isLoggedIn: false
        }
    }
    render(){
      return(
      <div>
      <Nav active='home'/>
        <div className="home">
          <div className="homeHeading">
            <h1>"Ideas Won't Keep. Something Must Be Done About Them."</h1>
            <p>~Alfred North Whitehead</p>
          </div>
          <Row gutter={16} className="ideaCards">
            <Col span={24}>
              <Card className="homeCard" data-aos='fade-up'>
                <Row gutter={16}>
                  <Col span={22} className='card-cont'>
                    <div><h2>We, at DSC VIT</h2></div>
                    <div><p>are determined to work with, and for the society.</p></div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <Card className="homeCard" data-aos='fade-up'>
                <Row gutter={16}>
                  <Col span={22} className='card-cont'>
                    <div><h2>We, at DSC VIT</h2></div>
                    <div><p>are determined to work with, and for the society.</p></div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <Card className="homeCard" data-aos='fade-up'>
                <Row gutter={16}>
                  <Col span={22} className='card-cont'>
                    <div><h2>We, at DSC VIT</h2></div>
                    <div><p>are determined to work with, and for the society.</p></div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <Card className="homeCard" data-aos='fade-up'>
                <Row gutter={16}>
                  <Col span={22} className='card-cont'>
                    <div><h2>We, at DSC VIT</h2></div>
                    <div><p>are determined to work with, and for the society.</p></div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <Card className="homeCard" data-aos='fade-up'>
                <Row gutter={16}>
                  <Col span={22} className='card-cont'>
                    <div><h2>We, at DSC VIT</h2></div>
                    <div><p>are determined to work with, and for the society.</p></div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <Card className="homeCard" data-aos='fade-up'>
                <Row gutter={16}>
                  <Col span={22} className='card-cont'>
                    <div><h2>We, at DSC VIT</h2></div>
                    <div><p>are determined to work with, and for the society.</p></div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      )
    }
}

export default withAlert()(Home)