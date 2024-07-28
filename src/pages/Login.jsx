import React, { useContext, useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { apiUrl } from '../utils/api'

function Login() {
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        axios.post(`${apiUrl}/apiAuth/login`, values)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                message.success('Login successful');
                navigate('/');
            }).catch(error => {
                message.error('Login failed!');
                setLoading(false);
            })

    }
    return (
        <Form name='login' onFinish={onFinish}>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input placeholder='Email'></Input>
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password placeholder='Password'></Input.Password>
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' loading={loading}>Login</Button>
            </Form.Item>
        </Form>
    )
}

export default Login