import React, { Component } from 'react'
import {withAlert} from 'react-alert'
import Nav from './nav'
import { Card, Row, Col, BackTop} from 'antd'
import homecar from './assets/home-car.svg'
import hometop from './assets/home-top.svg'
import AnchorLink from 'react-anchor-link-smooth-scroll'


class Home extends Component{
    constructor(props) {
        super(props);
        this.state={
          isLoggedIn: false,
          trending: [],
          mssg:''
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

    render(){
      const {trending, mssg}=this.state
      var dataDisp = trending.length?(
        trending.map(data=>{
          let desc=''
          if(data.project_description.length>=195){
            desc = data.project_description.substring(0,195)+'...'
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
            <p>~"DSC VIT is all about working constructively to find solutions to real-life problems faced by communities. We would love to receive unique ideas from you. The best ones may be nominated as team projects! <br/> Everything Begins With An Idea." – Earl Nightengale</p>
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
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.</p>
            </div>
            <div>
            <Row>
              <Col span={24} data-aos="fade-up">
                <AnchorLink  className='ant-btn ant-btn-primary' href="#trending">Trending Ideas</AnchorLink>
              </Col>
            </Row>
            </div>
          </div>
          <div className="home-trending" id="trending">
            <h2 style={{color:'#2785FC', fontWeight:'bold', marginBottom:'40px'}}  data-aos='fade-up'>
              Trending Ideas
            </h2>
            <div className="homecar-desc"  data-aos='fade-up'> 
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.</p>
            </div>
            <div className="trending-cards">
              {dataDisp}
            
            </div>
          </div>
          <div className="home-trending">
            <h2 style={{color:'#2785FC', fontWeight:'bold', marginBottom:'40px'}}  data-aos='fade-up'>
              Ideas made real
            </h2>
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
      </div>
      )
    }
}

export default withAlert()(Home)