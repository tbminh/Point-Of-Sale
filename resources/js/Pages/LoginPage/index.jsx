import { Form, Input, Button, Typography, Divider } from "antd";
import React, { useState } from "react"
import { GoogleOutlined, FacebookOutlined, InstagramOutlined } from "@ant-design/icons"
import './styles.scss';
import axios from 'axios';
import { connect_string } from '../../Api';
import { useNavigate } from "react-router-dom"
const LoginPage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleLogin = async (values) => {
        setLoading(true)
        try {
            const response = await axios.post(connect_string + 'login', {
                user_name: values.myUserName,
                password: values.myPassword,
            });
            const userData = response.data.user;
            sessionStorage.setItem('user_data', JSON.stringify(userData));

            //console.log('Đăng nhập thành công', response.data);
            document.cookie = `token=${response.data.authorization.token}; path=/;`;
        } catch (error) {
            // Xử lý lỗi khi có
        } finally {
            setLoading(false)
            navigate('/tables-order');
        }
    }

    return (
        <div className="appBg">
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                className="loginForm"
                onFinish={handleLogin}>
                <Typography.Title>Đăng Nhập</Typography.Title>
                <Form.Item label="Tài khoản" name={"myUserName"}>
                    <Input placeholder="Enter your name"></Input>
                </Form.Item>
                <Form.Item label="Mật khẩu" name={"myPassword"}>
                    <Input.Password placeholder="Enter your password"></Input.Password>
                </Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                    Gửi
                </Button>
                <Divider style={{ borderColor: "black" }}>Login with</Divider>
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