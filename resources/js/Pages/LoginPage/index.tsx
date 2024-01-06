import {Form, Input, Button, Typography, Divider} from "antd";
import React, { useState } from "react"
import { GoogleOutlined,FacebookOutlined,InstagramOutlined } from "@ant-design/icons"
import './styles.scss';
import axios from 'axios';
import {connect_string} from '../../Api';
import { useNavigate } from "react-router-dom"
const LoginPage = () => {
    const navigate = useNavigate()

    const handleLogin = async (values) => {
        const response = await axios.post(connect_string + 'login', {
            user_name: values.myUserName,
            password: values.myPassword,
        });
        console.log('Đăng nhập thành công', response.data);
        navigate('/admin/dashboard')
    }
    
    return (
        <div className="appBg">
            <Form className="loginForm" onFinish={handleLogin}>
                <Typography.Title>Đăng Nhập</Typography.Title>
                <Form.Item label="UserName" name={"myUserName"}>
                    <Input placeholder="Enter your name"></Input>
                </Form.Item>
                <Form.Item label="Password" name={"myPassword"}>
                    <Input.Password placeholder="Enter your password"></Input.Password>
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Gửi
                </Button>
                <Divider style={{borderColor: "black"}}>Login with</Divider>
                <div className="socialLogin">
                    <GoogleOutlined />
                    <FacebookOutlined />
                    <InstagramOutlined />
                </div>
            </Form>
        </div>
    )
}

export default LoginPage