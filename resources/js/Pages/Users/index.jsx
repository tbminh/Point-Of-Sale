import { Button, FloatButton, Modal, Space, Table, Typography, Form, message, Input, InputNumber, Popconfirm, Pagination, Select, Checkbox } from "antd"
import React, { useState, useEffect } from "react"
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './styles.scss'
import axios from "axios";
import { connect_string } from "../../Api";
const Users = () => {
    //#region Columns
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'fullName',
            key: 'fullName',
            width:150
        },
        {
            title: 'Tài khoản',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Quyền',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
            render: (value, record) => (
                <Space>
                    <Popconfirm
                        title="Xóa người dùng"
                        description="Bạn có chắc chắn muốn xóa người dùng?"
                        onConfirm={(value) => handleDelete(value, record)}
                        // onCancel={cancel}
                        okText="Đồng ý"
                        cancelText="Hủy"
                    >
                        < Button
                            type="primary"
                            danger
                            icon={< DeleteOutlined />}
                        />
                    </Popconfirm>

                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleShowModalEdit(record)
                        }} />
                </Space>
            ),


        },

    ];
    //#endregion

    //#region  Varialble
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [curentPage, setCurentPage] = useState(1)
    const [data, setData] = useState({})
    const [formCreate] = Form.useForm();
    const [formEdit] = Form.useForm();
    const { Search } = Input;
    //#endregion

    //#region useEffect
    useEffect(() => {
        handleGetAll()
    }, [])
    //#endregion

    //#region Logic
    const showModal = (modalName) => {
        if (modalName === 'create') {
            setIsModalOpen(true);
        }
        else {
            setIsModalEditOpen(true)
        }
    };

    const handleOk = (modalName) => {
        if (modalName === 'create') {
            formCreate.submit();
        }
        else {
            formEdit.submit();
        }
    };

    const handleCancel = (modalName) => {
        if (modalName === 'create') {
            setIsModalOpen(false);
        }
        else {
            setIsModalEditOpen(false)
        }
    };

    const handleShowModalEdit = (record) => {
        showModal('edit');
        const url = connect_string + 'get-user-detail/' + record.key
        axios.get(url).then(res => {
            setData(res.data[0]);
        })

    }

    const handleDelete = (value, record) => {
        const url = connect_string + 'delete-user/' + record.key
        axios.post(url).then(res => {
            if (res.data.message) {
                message.success('Xóa thành công');
                handleGetAll()
            }
        })

    }

    const handleGetAll = () => {
        setIsLoading(true)
        // const data = {
        //     page: page,
        //     product_name: product_name
        // }
        axios.get(connect_string + 'get-user').then(res => {
            const arr = res.data.list.map((item, index) => ({
                id: index + 1,
                fullName: item.full_name,
                phone: item.phone,
                role: item.role,
                userName: item.user_name,
                key: item.id
            }));
            setDataSource(arr)
            setIsLoading(false)
        })
    }

    const handleCreate = (values) => {
        const url = connect_string + 'add-user'
        const data = {
            role: values.myRole,
            full_name: values.myFullName,
            user_name: values.myUserName,
            password: values.myPassword,
            phone: values.myPhone
        }
        axios.post(url, data).then(res => {
            if (res.data.message) {
                message.success('Thêm thành công')
                handleGetAll()
                formCreate.resetFields()
            }
        }).catch(() => {
            message.error('Thêm thất bại')
        })
    }

    const handleEdit = (values) => {
        const url = connect_string + "update-user/" + values.myKey
        let data = {
            role: values.myRole,
            full_name: values.myFullName,
            user_name: values.myUserName,
            phone: values.myPhone
        }
        if(values.myPassword === true){
           data = {
            ...data,
            password: '12345678'
           } 
        }
        axios.post(url, data).then(res => {
            if (res.data) {
                const url = connect_string + 'get-user-detail/' + values.myKey
                axios.get(url).then(res => {
                    setData(res.data[0]);
                })
                handleGetAll()
                message.success("Cập nhật thành công")
            }
        }).catch(() => {
            message.error("Cập nhật thất bại")
        })
    }

    //#endregion


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Typography.Title style={{ fontSize: '30px' }}>Danh Sách Người Dùng</Typography.Title>
            <FloatButton
                shape="circle"
                type="primary"
                style={{ right: 20, bottom: 60 }}
                icon={<PlusOutlined
                    onClick={() => showModal('create')} />}
            />
            <ModalCreate
                form={formCreate}
                handleCancel={() => handleCancel('create')}
                handleCreateProduct={(value) => handleCreate(value)}
                handleOk={() => handleOk('create')}
                isModalOpen={isModalOpen} />
            <ModalEdit
                form={formEdit}
                handleCancel={() => handleCancel('edit')}
                handleCreateProduct={(value) => handleEdit(value)}
                handleOk={() => handleOk('edit')}
                isModalOpen={isModalEditOpen}
                data={data} />
            {/* <Search placeholder="Tìm kiếm...." onChange={handleSearch} enterButton /> */}
            {/* <Pagination
                className="pagination"
                defaultCurrent={1}
                total={totalPage}
                pageSize={5}
                style={{ display: 'flex', justifyContent: 'flex-end' }}
                showSizeChanger={false}
                onChange={(page) => { handleGetAll(page), setCurentPage(page) }} /> */}
            <Table
                loading={isLoading}
                style={{ width: '100vw' }}
                pagination={{ defaultPageSize: 5, position:['topRight ']}}
                dataSource={dataSource}
                columns={columns}
                scroll={{ x: '700px' }}
                />
        </div>
    )
}

function ModalCreate({ isModalOpen, handleOk, handleCancel, form, handleCreateProduct }) {
    const [selectedRole, setSelectedRole] = useState('employee');
    return (
        <Modal title="Thêm người dùng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                className='createForm'
                onFinish={handleCreateProduct}>
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
                <Form.Item
                    label='Mật khẩu: '
                    name={'myPassword'}
                    rules={[
                        {
                            required: true,
                            type: "string",
                            message: "Vui lòng nhập mật khẩu"
                        }
                    ]}>
                    <Input.Password placeholder='Nhập mật khẩu' />
                </Form.Item>
                <Form.Item
                    label='Quyền: '
                    name={'myRole'}
                    initialValue={selectedRole}
                    rules={[
                        {
                            required: true,
                            type: "string",
                            message: "Vui lòng chọn quyền"
                        }
                    ]}>
                    <Select
                        // defaultValue="Người dùng"
                        style={{ width: 120 }}
                        options={[
                            { value: 'admin', label: 'Admin' },
                            { value: 'manager', label: 'Quản lý' },
                            { value: 'employee', label: 'Người dùng' },
                        ]}
                        onChange={(value) => setSelectedRole(value)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

function ModalEdit({ isModalOpen, handleOk, handleCancel, form, handleCreateProduct, data }) {
    const initialValues = {
        myRole: data.role || 'employee',
        myFullName: data.full_name || '',
        myUserName: data.user_name || '',
        myPhone: data.phone || '',
        myKey: data?.id || ''
    };

    useEffect(() => {
        if (isModalOpen && data) {
            form.resetFields();
            form.setFieldsValue(initialValues);
        }
    }, [isModalOpen, data, initialValues, form]);

    return (
        <Modal title="Thông tin người dùng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={initialValues ? initialValues : {}}
                autoComplete="off"
                className='createForm'
                onFinish={handleCreateProduct}
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
                <Form.Item
                    name="myPassword"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Cập nhật lại mật khẩu</Checkbox>
                </Form.Item>
                <Form.Item
                    label='Quyền: '
                    name={'myRole'}
                    rules={[
                        {
                            required: true,
                            type: "string",
                            message: "Vui lòng chọn quyền"
                        }
                    ]}>
                    <Select
                        // defaultValue="Người dùng"
                        style={{ width: 120 }}
                        options={[
                            { value: 'admin', label: 'Admin' },
                            { value: 'manager', label: 'Quản lý' },
                            { value: 'employee', label: 'Người dùng' },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Users

