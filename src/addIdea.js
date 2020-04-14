import React from 'react'
import {Form, Input, Button} from 'antd'
import { useAlert } from 'react-alert'

const Addidea = (props) =>{
    const {alert} = useAlert()

    const onFinish =(values)=>{
        console.log(values)
        fetch(process.env.REACT_APP_BASEURL+'app/post_ideas/', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            alert.show(data.message)
        })
        .catch(error=>console.error(error))
    }
    return(
        <div className='formholder'>
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
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Addidea