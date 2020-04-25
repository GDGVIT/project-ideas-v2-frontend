import React, { Component } from 'react'
import {withAlert} from 'react-alert'
import Nav from './nav'
import { Card, Row, Col, BackTop, Button, Drawer} from 'antd'
import homecar from './assets/home-car.svg'
import hometop from './assets/home-top.svg'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Addidea from './addIdea'


class Home extends Component{
    constructor(props) {
        super(props);
        this.state={
          isLoggedIn: false,
          trending: [],
          mssg:'',
          visible:false
        }
    }

    componentDidMount() {
      fetch(process.env.REACT_APP_BASEURL+'app/published_ideas/?offset=0', {
        method:'GET'
      })
      .then(res=>res.json())
      .then(data=>{
        this.setState({
          trending:data.message,
        })
      })
      .catch(error=>{
        if(error){
          console.log(error)
          this.setState({
            mssg:"Seems like there aren't any published ideas yet :/",
          })
        }
      })
    }
    
    openSidea=(id)=>{
      this.props.history.push('/ideas/'+id)
    }
    onClose = () =>{
      this.setState({
            visible: false
      })
  }      
  openDrawer = () =>{
    this.setState({
          visible: true
    })
}

    render(){
      const {trending, mssg}=this.state
      var dataDisp = trending.length?(
        trending.map(data=>{
          let desc=''
          if(data.project_description.length>=170){
            desc = data.project_description.substring(0,170)+'...'
          }else{
            desc = data.project_description;
          }
          return(
            <Card data-aos="fade-right" key={data.id} onClick={()=>{this.openSidea(data.id)}}>
            <h3>
              {data.project_title}
            </h3>
            <p className="idea-desc">{desc}</p>
            <p style={{color:"#2785FC", marginTop:'20px'}}>
              {data.votes} Votes
            </p>
          </Card>
          )
        })
      ):(<div style={{textAlign:"center"}}>{mssg}</div>)
      return(
      <div>
      <BackTop />
      <img src={hometop} className="sideimg" alt="" />
      <Nav active='home'/>


        <div className="home">


          <div className="homeHeading">

            <h1>DSC Idea Hub</h1>
            <p>DSC VIT is all about working constructively to find solutions to real-life problems faced by communities. We would love to receive unique ideas from you. The best ones may be nominated as team projects! <br/><br/> "Everything Begins With An Idea." – Earl Nightengale</p>
            <AnchorLink offset='100' className='ant-btn ant-btn-primary' href="#procedure">Learn More</AnchorLink>
          </div>


          <div className="home-procedure" id="procedure">
            <h2 style={{color:'#2785FC', fontWeight:'bold', marginBottom:'40px'}}  data-aos='fade-up'>
              Ideation Procedure
            </h2>
            <div className="homecar-image">
              <img alt="ideation procedure" src={homecar}  data-aos='fade-up' />
            </div>
            <div className="homecar-desc"  data-aos='fade-up'> 
              <p>A good product goes through multiple stages. It starts from the ideation phase followed by regular modifications of the idea until it's feasible enough to build a solution based on it!</p>
            </div>
            <div>
            <Row>
            <Col span={12}>
              <Button type="primary" data-aos="fade-right" onClick={this.openDrawer}>
                Add Idea
              </Button>
            </Col>
              <Col span={12} data-aos="fade-right">
                <AnchorLink  className='ant-btn ant-btn-primary' href="#trending">Trending Ideas</AnchorLink>
              </Col>
            </Row>
            </div>
          </div>
          <div className="home-trending" id="trending">
            <h2 style={{color:'#2785FC', fontWeight:'bold', marginBottom:'40px'}}  data-aos='fade-up'>
              Trending Ideas
            </h2>
            <div className="trending-cards">
              {dataDisp}
            
            </div>
          </div>
          <div className="home-trending" style={{marginBottom:'50px', marginTop:'50px'}}>
            <h2 style={{color:'#2785FC', fontWeight:'bold', marginBottom:'40px'}}  data-aos='fade-up'>
              Ideas Made Real
            </h2>
            <div className="homecar-desc"  data-aos='fade-up'> 
              <p>A plethora of ideas were submitted in the past and we managed to convert them to successful projects which had the potential to help a lot of people around the globe.</p>
            </div>
          <div className="trending-cards">
              <Card data-aos="fade-left">
                <h3>
                  Idea
                </h3>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                <p style={{color:"#2785FC", marginTop:'20px'}}>
                  123 Upvotes
                </p>
              </Card>
              <Card data-aos="fade-left">
                <h3>
                  Idea
                </h3>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                <p style={{color:"#2785FC", marginTop:'20px'}}>
                  123 Upvotes
                </p>
              </Card>
              <Card data-aos="fade-left">
                <h3>
                  Idea
                </h3>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                <p style={{color:"#2785FC", marginTop:'20px'}}>
                  123 Upvotes
                </p>
              </Card>
          </div>
          </div>

        </div>
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
      )
    }
}

export default withAlert()(Home)
