import { Button, Image, Form, Input, Space, Typography } from "antd"
import { EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react"
import './styles.scss'
import { connect_string, userData } from "../../Api";
const MyInfomation = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        if (userData) {
            const url = connect_string + 'get-user-detail/' + userData.id;
            axios.get(url).then(res => {
                const fetchedData = res.data[0];
                setData({
                    myKey: fetchedData.id || '',
                    myFullName: fetchedData.full_name || '',
                    myPhone: fetchedData.phone || '',
                    myUserName: fetchedData.user_name || '',
                });

            });
        }
    }, [])


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', }}>
            <Typography.Title style={{ fontSize: '30px' }}>Thông tin người dùng</Typography.Title>
            <div className="Info">
                <div className="bgimg">
                </div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: '700px', width: '70%' }}
                    initialValues={data|| {}}
                    autoComplete="off"
                    className='createForm'
                // onFinish={handleCreateProduct}
                >
                    <Form.Item
                        name="myKey"
                        noStyle
                    >
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item
                        label='Tên người dùng: '
                        name={'myFullName'}
                        rules={[
                            {
                                required: true,
                                type: "string",
                                message: "Vui lòng nhập tên người dùng"
                            }
                        ]}>
                        <Input placeholder='Nhập tên người dùng' />
                    </Form.Item>
                    <Form.Item
                        label='SĐT: '
                        name={'myPhone'}
                        rules={[
                            {
                                required: true,
                                type: "string",
                                message: "Vui lòng nhập số điện thoại"
                            }
                        ]}>
                        <Input addonBefore="+84" placeholder='Nhập số điện thoại' />
                    </Form.Item>
                    <Form.Item
                        label='Tài khoản: '
                        name={'myUserName'}
                        rules={[
                            {
                                required: true,
                                type: "string",
                                message: "Vui lòng nhập tài khoản"
                            }
                        ]}>
                        <Input placeholder='Nhập tài khoản' />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default MyInfomation