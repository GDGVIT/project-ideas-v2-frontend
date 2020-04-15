import React from 'react';
import { Form, Input, Button} from 'antd';
import { useAlert } from 'react-alert';


const Adminlogin = (props) =>{
    const alert = useAlert();

    const tailLayout = {
        wrapperCol: { offset: 10, span: 16 },
      };
      
    const onFinish = values => {
        return fetch(process.env.REACT_APP_BASEURL+"admin_app/login/", {
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(values), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      })
      .then(response => {
        if(response.status === 200 || response.status===201 || response.status===202){
        return response.json();
        }else{
            alert.show(response.statusText);
        }
        })
        .then(data => {
            alert.show(data.message)
            if(data){
                localStorage.setItem("admintokenx12x12", 'Token '+data.Admin.token);
                props.history.push({
                    pathname: '/adminx',
                    search:"",
                    state: "Token "+data.Admin.token
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    return(
    <div className="adminlogin">
    <h3>
        Login
    </h3>
        <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' },
                {type: 'email', message: 'Input a valid email'}
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item  {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>  
    </div>
    );
};

export default Adminlogin;