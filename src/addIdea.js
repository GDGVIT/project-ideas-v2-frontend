import React, {useState} from 'react'
import {Form, Input, Button} from 'antd'
import { withAlert } from 'react-alert'
import Load2 from './loading2' 

const Addidea = (props) =>{
    const [loading, setLoad] = useState(false)

    const onFinish =(values)=>{
        setLoad(true)
        console.log(values)
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
            }else{
                props.alert.show("Something went wrong")
            }    
            return(res.json())
        })
        .then(data=>{
            console.log(data)
        })
        .catch(error=>console.error(error))
    }
    return(
        <div className='formholder'>
        {loading && <Load2 />}
        <h2>Add an Idea</h2>
            <Form onFinish={onFinish} name="IdeaForm">
                <h2>Title</h2>
                <Form.Item name='project_title' rules={[{ required: true, message: 'You can not leave this epmty!' }]}>
                    <Input placeholder='Describe your idea in a short and concise manner.'/>
                </Form.Item>
                <h2>Description</h2>
                <Form.Item name='project_description' rules={[{ required: true, message: 'Please can not leave this empty!' }]}>
                    <Input.TextArea rows={4} placeholder='Give details about your idea, write about what you want to implement, cover all the details.'/>
                </Form.Item>
                <h2>Tags</h2>
                <Form.Item name='tags' rules={[{ required: true, message: 'You can not leave this epmty!' }]}>
                    <Input placeholder='The category of idea, separated by a comma (if multiple).'/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default withAlert()(Addidea);