import React, { Component } from 'react'
import {withAlert} from 'react-alert'
import Nav from './nav'
import { Card, Row, Col, Input, Pagination, Tag , Select, DatePicker, message} from 'antd'
import {CaretDownFilled, CaretUpFilled, MessageOutlined} from '@ant-design/icons'
import Load2 from './loading2'


const { Option } = Select;
var alertFlag = true;

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
          al:true,
          def:1,
          pagKey:0,
          filter:'', //sort options are mvotes, latest and by date
          tag:'',
          date:''
        }
    }

    // SELECT CSS
  onChange=(e)=>{
    this.setState({
      search: e
    })

    let url = process.env.REACT_APP_BASEURL+'app/search_published_ideas/'
    let flag = 0
    if(e) {
      url += ('?text='+e)
      flag = 1
    }
    if(this.state.tag) {
      if(flag) {
        url += ('&tag='+this.state.tag)
      }else {
        url += ('?tag='+this.state.tag)
        flag = 1
      }
    }
    if(this.state.filter) {
      if(flag) {
        if(this.state.filter==='new' || this.state.filter==='old'){
          url += ('&sort='+this.state.filter)
        }else if(this.state.filter==='desc'){
          url += ('&votes='+this.state.filter)
        }
      }else {
        if(this.state.filter==='new' || this.state.filter==='old'){
          url += ('?sort='+this.state.filter)
        }else if(this.state.filter==='desc'){
          url += ('?votes='+this.state.filter)
        }
        flag = 1
      }
    }
    if(this.state.date) {
      if(flag) {
        url += ('&date='+this.state.date)
      }else{
        url += ('?date='+this.state.date)
      }
    }

    if(url !== process.env.REACT_APP_BASEURL+'app/search_published_ideas/'){
      fetch(url+'&offset=0',{
        method:'GET'
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data){
          this.setState({
            cards:data.message,
            total: data.total_pages
          })
        }
      })
      .catch(error=>{
        if(error) {
          if(alertFlag){
            message.error("No such ideas found",3)
            alertFlag = false
            setTimeout(()=>{
              alertFlag = true
            }, 3000)
          }
          this.setState({
            cards:[],
            total:0 
          })
        }
      })
    }else {
      this.getIdeas()
    }
      
  }


  handleFilter = (e) => {
    console.log(e)
    this.setState({
      filter:e
    }, () => {
      this.onChange(this.state.search)
    })


  }

    onChangeTag = (e) => {
      console.log(e.target.value)
      this.setState({
        tag:e.target.value
      }, () => {
        this.onChange(this.state.search)
      })
    }

    handleDate = (date, dateString) => {
      this.setState({
        date: dateString
      }, ()=>{this.onChange(this.state.search)})
    }

    getIdeas = () => {
      fetch(process.env.REACT_APP_BASEURL+'app/published_ideas/?offset=0', {
        method:'GET'
      })
      .then(res=>res.json())
      .then(data=>{
          this.setState({
            cards:data.message,
            loading:false,
            total:data.total_pages
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

  componentDidMount() {
    // console.log(document.querySelector('.main').offsetHeight)
    // console.log(window.innerHeight)
    this.setState({
      loading:true
    })

    if(sessionStorage.getItem('lastActivePage')){
      this.setState({
        def:parseInt(sessionStorage.getItem('lastActivePage')),
        pagKey:this.state.pagKey+1
      })
      this.changePage(parseInt(sessionStorage.getItem('lastActivePage')))
    }else{
      this.getIdeas()
    }
    
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
    sessionStorage.setItem('lastActivePage',page)

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
        console.log(data)
        this.setState({
          cards:data.message,
          total: data.total_pages,
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
        let splitTags = data.tags.split(',')
        // console.log(splitTags)
        let tags = splitTags.map(tag=>{
          if(tag){
            return(<Tag color="blue" key={tag}>{tag}</Tag>)
          }else{
            return ('')
          }
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
              <div>
                <span style={{padding:'0px 20px 15px 0px', fontWeight:'bold'}}>{data.username} </span>
                <span style={{paddingBottom:'15px', color:'gray'}}>{theDate}</span>
                {data.is_completed && <Tag color='green' style={{marginLeft:'10px'}}>Made Real</Tag>}
              </div>
              <div><h2>{data.project_title}</h2></div>
              <div><p>{desc}</p></div>
              <div>{tags}</div>
              <div onClick={()=>{this.openSidea(data.id)}} className="sideaOpener" ><p className="commentAdd"><MessageOutlined style={{color:'#2785FC', marginRight:'5px'}} />See more...</p></div>
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
            <Input className="search-by-text" placeholder="Search for ideas" onChange={(e)=>{this.onChange(e.target.value)}}/>
            <Input className="search-by-tag" placeholder="Search by tag" onChange={this.onChangeTag}/>
          </div>
          <div className="countryCss filterCss" style={{marginTop:'20px'}}>
            <div>
              <span>Show ideas from: </span>
              <DatePicker onChange={this.handleDate} />
            </div>
            <div>
              <span>Sort by: </span>
              <Select defaultValue="Most Votes" style={{ width: 120 }} onChange={this.handleFilter}>
                <Option value="desc">Most votes</Option>
                <Option value="new">Latest</Option>
                <Option value="old">Oldest</Option>
              </Select>
            </div>
          </div>
          <div className="IdeaCards">
          {loading && <Load2 />}
            {ideaz}
          </div>
          <div className="paginationDiv">
            <Pagination showQuickJumper={false} showSizeChanger={false} key={this.state.pagKey} defaultCurrent={this.state.def} pageSize={5} total={this.state.total*5} onChange={(page)=>this.changePage(page)}/>
          </div>
        </div>
      </div>)
    }
}

export default withAlert()(Ideas)
