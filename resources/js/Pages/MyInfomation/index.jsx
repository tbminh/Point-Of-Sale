import { Button, Image, Form, Input, Space, Typography, message, Modal } from "antd"
import { EditOutlined, ReloadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react"
import './styles.scss'
import { connect_string } from "../../Api";
import axios from "axios";
const MyInfomation = () => {
    const [key, setKey] = useState(null)
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [userName, setUserName] = useState('')
    const [role, setRole] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const userData = JSON.parse(sessionStorage.getItem('user_data'))
    useEffect(() => {
        handleGetDetailUser()
    }, [])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleGetDetailUser = () => {
        const url = connect_string + 'get-user-detail/' + userData.id;
        axios.get(url).then(res => {
            const fetchedData = res.data[0];
            setKey(fetchedData.id)
            setFullName(fetchedData.full_name)
            setPhone(fetchedData.phone)
            setUserName(fetchedData.user_name)
            setRole(fetchedData.role)
        });
    }

    const handleFullNameChange = (event) => {
        setFullName(event.target.value)
    }
    const handlePhoneChange = (event) => {
        setPhone(event.target.value)
    }

    const handleEditDetail = () => {
        const url = connect_string + "update-user/" + key
        const data = {
            full_name: fullName,
            phone: phone,
            role: role
        }
        axios.post(url, data).then(res => {
            if (res.data) {
                handleGetDetailUser()
                message.success("Cập nhật thành công")
            }
        }).catch(() => {
            message.error("Cập nhật thất bại")
        })
    }

    const checkPassword = (_, value) => {
        const newPassword = form.getFieldValue('newPassword');
        if (value && newPassword && value !== newPassword) {
            return Promise.reject(new Error('Mật khẩu mới và Nhập lại mật khẩu mới không khớp!'));
        } else {
            return Promise.resolve();
        }
    };

    const handleChangePassword = (value) => {
        const url = connect_string + 'update-password/' + key
        const data = {
            old_password: value.oldPassword,
            new_password: value.newPassword
        }
        axios.post(url, data).then(res => {
            message.success("Cập nhật thành công")
            sessionStorage.removeItem('user_data');
            setIsModalOpen(false)
        }).catch(() => {
            message.error("Mật khẩu cũ không đúng")
        })

    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%', }}>
            <Typography.Title style={{ fontSize: '30px' }}>Thông tin người dùng</Typography.Title>
            <div className="Info">
                <div className="bgimg"></div>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Input type="hidden" value={key} />
                    <Typography.Text style={{ fontWeight: 'bold' }}>Tên người dùng</Typography.Text>
                    <Input placeholder='Nhập tên người dùng' value={fullName} onChange={handleFullNameChange} />
                    <Typography.Text style={{ fontWeight: 'bold' }}>Số điện thoại</Typography.Text>
                    <Input addonBefore="+84" placeholder='Nhập số điện thoại' value={phone} onChange={handlePhoneChange} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 30 }}>
                        <Button type="primary" icon={<EditOutlined />} onClick={handleEditDetail}>Cập nhật</Button>
                        <Button type="primary" ghost icon={<ReloadOutlined />} onClick={() => showModal()}>Đổi mật khẩu</Button>
                    </div>
                </Space>
            </div>
            <div></div>
            <Modal title="Đổi mật khẩu" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    form={form}
                    autoComplete="off"
                    initialValues={{ remember: true }}
                    onFinish={handleChangePassword}
                >
                    <Form.Item
                        label="Mật khẩu cũ"
                        name={"oldPassword"}
                        rules={[
                            {
                                required: true,
                                type: "string",
                                message: "Vui lòng nhập mật khẩu cũ"
                            }
                        ]}>
                        <Input.Password placeholder="Nhập mật khẩu cũ" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name={"newPassword"}
                        rules={[
                            {
                                required: true,
                                type: "string",
                                message: "Vui lòng nhập mật khẩu mới"
                            }
                        ]}>
                        <Input.Password placeholder="Nhập mật khẩu mới" />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu mới"
                        name={"confirmNewPassword"}
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                                type: "string",
                                message: "Vui lòng nhập lại mật khẩu mới"
                            },
                            {
                                validator: checkPassword,
                            },
                        ]}>
                        <Input.Password placeholder="Nhập lại mật khẩu mới" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}


export default MyInfomation