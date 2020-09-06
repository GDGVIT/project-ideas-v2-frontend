import React, {useState} from 'react'
import {Form, Input, Button, Tag} from 'antd'
import { withAlert } from 'react-alert'
import Load2 from './loading2' 
// import {v4 as uuidv4} from 'uuid'
// import {WithOutContext as ReactTags} from 'react-tag-input'

const Addidea = (props) =>{

    const [loading, setLoad] = useState(false)
    const [al, setAl] = useState(true)
    const [tagz, setTags] = useState([])
    const [val, setVal] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const handleDelete = (i) => {
        // i.preventDefault()
        console.log(i)
        setTags(
            tagz.filter((tag, index) => index !== i)
        )
        console.log(tagz)

    }
 
   const handleAddition = () => {
       if(!tagz.includes(val.trim())){
        setTags([...tagz, val.trim()]);
        setVal('')
       }else{
        setVal('')
       }
    }
    const handleSpaceAddition = (e) =>{
        if(e.key===' '){
            if(!tagz.includes(val.trim())){
                setTags([...tagz, val.trim()]);
                setVal('')
               }else{
                setVal('')
               }
        }
    }


    const onFinish =()=>{
        let tagz_String = '' 
        tagz.forEach(element => {
            tagz_String += (element + ',')     
        });
        let values = {
            project_title: title,
            project_description: desc,
            tags: tagz_String
        }
        setLoad(true)
        console.log(values)
        if(values.project_title==='' || values.project_description==='' || values.tags===''){
            props.alert.show('You can not leave any of the fields empty!')
            setLoad(false)
        }else{
            fetch(process.env.REACT_APP_BASEURL+'app/post_ideas/', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }),
                body:JSON.stringify(values)
            })
            .then(res=>{
                if(res.status === 200){
                    setLoad(false)
                    props.alert.show("Idea submitted")
                    setVal('')
                    setTags([])
                    setTitle('')
                    setDesc('')
                    setTimeout(()=>{
                        props.closeThis()
                    }, 100)
                    
                }else if(res.status===403){
                    setLoad(false)
                        if(al){
                            props.alert.show('You need to log in to perform this action')
                            setAl(false)
                            setTimeout(()=>{
                                setAl(true)
                            },5000)
                            }
                }    
                return res.json()
            })
            .then(data=>{
                console.log(data)
            })
            .catch(error=>{
                if(error) {
                    props.alert.show('something went wrong')
                }
                setLoad(false)
            })
        }

    }

    // const handleInputChange = (v, type) =>{
    //     v.persist()
    //     console.log(v.target.value)
    //     if(v.target.value.length){
    //         if(type === "title"){
    //             setTitle(v.target.value.trim())
    //         }else{
    //             setDesc(v.target.value.trim())
    //         }
    //     }
    // }
    return(
        <div className='formholder'>
        {loading && <Load2 />}
        <h2>Add an Idea</h2>
            <Form name="IdeaForm">
                <h2>Title</h2>
                <Form.Item name='project_title' rules={[
                    { required: true, message: 'You can not leave this empty!' },
                        {max: 100, message:'max 100 characters only!'}

                    ]}>
                    <Input  value={title} placeholder='Describe your idea in a short and concise manner.' onChange={(v)=>{setTitle(v.target.value.trim())}}/>
                </Form.Item>
                <h2>Description</h2>
                <Form.Item name='project_description' 
                rules={[
                    { required: true, message: 'You can not leave this empty!' },
                    {max: 500, message:'max 500 characters only!'}
                    ]}
                >
                    <Input.TextArea value={desc} rows={4} onChange={(v)=>{setDesc(v.target.value.trim())}} placeholder='Give details about your idea, write about what you want to implement, cover all the details.'/>
                </Form.Item>
                <h2>Tags</h2>
                <Form.Item name='tags' 
                rules={[
                    { required: true, message: 'You can not leave this epmty!' },
                    {max: 50, message:'max 50 characters only!'}
                    ]}
                    >
                    <Input placeholder='Mention tags for your project'  value={val} onChange={(val)=>setVal(val.target.value)} onPressEnter={handleAddition} onKeyPress={handleSpaceAddition}/>
                    {tagz.map((tag, index)=>{
                        return(<Tag color="blue" key={tag} closable onClose={()=>{handleDelete(index)}}> {tag} </Tag>)
                    })}
                </Form.Item>

                <Form.Item>
                    <Button type='primary' onClick={onFinish}>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default withAlert()(Addidea);
