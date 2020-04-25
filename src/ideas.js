import React, { Component } from 'react'
import {withAlert} from 'react-alert'
import Nav from './nav'
import { Card, Row, Col, Input, Pagination, Tag} from 'antd'
import {CaretDownFilled, CaretUpFilled, MessageOutlined} from '@ant-design/icons'
import Load2 from './loading2'


// const { Option } = Select;

class Ideas extends Component{
    constructor(props) {
        super(props);
        this.state={
          isLoggedIn: false,
          cards: [],
          loading: false,
          mssg:'',
          total:1,
          current:1,
          search:null,
          al:true
        }
    }

    // SELECT CSS
  onChange=(e)=>{
    e.persist()
    // console.log(e)
    this.setState({
      search: e.target.value
    })
  fetch(process.env.REACT_APP_BASEURL+'app/search_published_ideas/?text='+e.target.value+'&offset=0',{
      method:'GET'
    })
    .then(res=>res.json())
    .then(data=>{
      if(!data){
        this.props.alert.show("Couldn't find any such Idea")
      }else{
        this.setState({
          cards:data.message,
          total: data.total_pages
        
        })
      }
    })
    .catch(error=>console.error(error))
  }

  componentDidMount() {
    // console.log(document.querySelector('.main').offsetHeight)
    // console.log(window.innerHeight)
    this.setState({
      loading:true
    })
    fetch(process.env.REACT_APP_BASEURL+'app/published_ideas/?offset=0', {
      method:'GET'
    })
    .then(res=>res.json())
    .then(data=>{
      // console.log(data)
      this.setState({
        cards:data.message,
        loading:false,
        total:data.total_pages
      })

      // console.log(this.state)
    })
    .catch(error=>{
      if(error){
        console.log(error)
        this.setState({
          mssg:"Seems like there aren't any published ideas yet :/",
          loading:false
        })
      }
    })
  }
  
  addVote=(vote, id, index)=>{

    let cardsVoted = this.state.cards;
    // console.log('otherstuff',vote, id, index)
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
        if(this.state.al){
        this.props.alert.show(data.message)
        this.setState({
          al:false
        })
          setTimeout(()=>{
            this.setState({
              al:true
            })
          },5000)
        }
      }
    })
    .catch(error=>console.error(error))
    // this.setState({
      
    // })
  }
  openSidea=(id)=>{
    this.props.history.push('/ideas/'+id)
  }

  changePage=(page)=>{
    // console.log(page)
    // this.setState({
    //   current:page
    // })
    this.setState({
      loading:true
    })
    if(this.state.search){
      fetch(process.env.REACT_APP_BASEURL+'app/search_published_ideas/?text='+this.state.search+'&offset='+(page-1),{
        method:'GET'
      })
      .then(res=>res.json())
      .then(data=>{
        if(!data){
          this.props.alert.show("Couldn't find any such Idea")
        }else{
          this.setState({
            cards:data.message,
            total: data.total_pages,
              loading:false
          })
        }
      })
      .catch(error=>{
        if(error){
          console.log(error)
          this.setState({
            mssg:"Seems like there aren't any published ideas yet :/",
            loading:false
          })
        }
      })
    }else{
      fetch(process.env.REACT_APP_BASEURL+'app/published_ideas/?offset='+(page-1), {
        method:'GET'
      })
      .then(res=>res.json())
      .then(data=>{
        // console.log(data)
        this.setState({
          cards:data.message
        })
        this.setState({
          loading:false
        })
      })
      .catch(error=>{
        if(error){
          console.log(error)
          this.setState({
            mssg:"Seems like there aren't any published ideas yet :/",
            loading:false
          })
        }
      })
    }

  }
    render(){
      const {loading} = this.state
      var {cards} = this.state;
      let ideaz = cards.length>0?(cards.map((data, index)=>{
        //  console.log(index)
        let theDate = data.date_time.substring(0,10);
        let desc
        if(data.project_description.length>=250){
          desc = data.project_description.substring(0,250)+'...'
        }else{
          desc = data.project_description;
        }
        let splitTags = data.tags.split(' ')
        // console.log(splitTags)
        let tags = splitTags.map(tag=>{
          return(<Tag color="blue" key={tag}>{tag}</Tag>)
        })
        return(
          <Card key={data.id} data-aos='fade-up'>
          <Row gutter={16}>
            <Col span={1} className="vote">
              <CaretUpFilled style={{color:'#2785FC'}} onClick={()=>{this.addVote(1, data.id, index)}} />
              <p>{data.votes}</p>
              <CaretDownFilled style={{color:'#2785FC'}} onClick={()=>{this.addVote(-1, data.id, index)}} />
            </Col>
            <Col span={22} className='card-cont'>
            <div><span style={{padding:'0px 20px 15px 0px', fontWeight:'bold'}}>{data.username} </span><span style={{paddingBottom:'15px', color:'gray'}}>{theDate}</span></div>
              <div><h2>{data.project_title}</h2></div>
              <div><p>{desc}</p></div>
              <div>{tags}</div>
              <div onClick={()=>{this.openSidea(data.id)}} className="sideaOpener" ><p className="commentAdd"><MessageOutlined style={{color:'#2785FC', marginRight:'5px'}} />discuss...</p></div>
            </Col>
          </Row>
        </Card>
        )
      })):(<div style={{textAlign:'center'}}>{this.state.mssg}</div>);
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
          <div className="paginationDiv">
          <Pagination defaultCurrent={1} pageSize={5} total={this.state.total*5} onChange={(page)=>this.changePage(page)}/>
          </div>
        </div>
      </div>)
    }
}

export default withAlert()(Ideas)
