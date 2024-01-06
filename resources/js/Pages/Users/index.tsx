import { Button, FloatButton, Modal, Space, Table, Typography, Form, message, Input, InputNumber, Popconfirm, Pagination } from "antd"
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
            title: 'Tên bàn',
            dataIndex: 'tableName',
            key: 'tableName',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'tableStatus',
            key: 'tableStatus',
            render: (value, record) => {
                let color = record === 0 ? 'green' : 'red'
                let data = record === 0 ? 'Có khách' : 'Chưa có khách'
                return (
                    <Button ghost style={{ color: color, borderColor: 'black' }} disabled>
                        {data}
                    </Button>
                )

            }
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
            render: (value, record) => (
                <Space>
                    <Popconfirm
                        title="Xóa bàn"
                        description="Bạn có chắc chắn muốn xóa bàn?"
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
        handleGetAll(1)
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
        const url = connect_string + 'get-product-detail/' + record.key
        axios.get(url).then(res => {
            setData(res.data[0]);
        })

    }

    const handleDelete = (value, record) => {
        const url = connect_string + 'delete-product/' + record.key
        axios.post(url).then(res => {
            if (res.data.message) {
                message.success('Xóa thành công');
                handleGetAll(curentPage)
            }
        })

    }

    const handleGetAll = (page, product_name?) => {
        setIsLoading(true)
        const data = {
            page: page,
            product_name: product_name
        }
        axios.post(connect_string + 'get-product', data).then(res => {
            const arr = Object.values(res.data).slice(0, -1).map((item: any, index) => ({
                id: index + 1,
                productName: item.product_name,
                price: item.product_price,
                key: item.id
            }));
            setTotalPage(res.data.total_pages)
            setDataSource(arr)
            setIsLoading(false)
        })
    }

    const handleCreate = (values) => {
        const url = connect_string + 'add-product'
        const data = {
            product_name: values.myProducts,
            product_price: values.myPrice
        }
        axios.post(url, data).then(res => {
            if (res.data.message) {
                message.success('Thêm thành công')
                handleGetAll(1)
                formCreate.resetFields()
            }
        }).catch(() => {
            message.error('Thêm thất bại')
        })
    }

    const handleEdit = (values) => {
        const url = connect_string + "update-product/" + values.myKey
        const data = {
            product_name: values.myProducts,
            product_price: values.myPrice
        }
        axios.post(url, data).then(res => {
            if (res.data) {
                const url = connect_string + 'get-product-detail/' + values.myKey
                axios.get(url).then(res => {
                    setData(res.data[0]);
                })
                handleGetAll(curentPage)
                message.success("Cập nhật thành công")
            }
        }).catch(() => {
            message.error("Cập nhật thất bại")
        })
    }

    const handleSearch = (value) => {
        const text = value.target.value
        handleGetAll(1, text)
    }

    //#endregion


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Typography.Title style={{ fontSize: '30px' }}>Danh Sách Bàn</Typography.Title>
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
                handleCreateProduct={() => handleCreate}
                handleOk={() => handleOk('create')}
                isModalOpen={isModalOpen} />
            <ModalEdit
                form={formEdit}
                handleCancel={() => handleCancel('edit')}
                handleCreateProduct={(value) => handleEdit(value)}
                handleOk={() => handleOk('edit')}
                isModalOpen={isModalEditOpen}
                data={data} />
            <Search placeholder="Tìm kiếm...." onChange={handleSearch} enterButton />
            <Pagination
                className="pagination"
                defaultCurrent={1}
                total={totalPage}
                pageSize={5}
                style={{ display: 'flex', justifyContent: 'flex-end' }}
                showSizeChanger={false}
                onChange={(page) => { handleGetAll(page), setCurentPage(page) }} />
            <Table
                loading={isLoading}
                style={{ width: '100vw' }}
                pagination={false}
                dataSource={dataSource}
                columns={columns}
                scroll={{ x: '600px' }} />
        </div>
    )
}

function ModalCreate({ isModalOpen, handleOk, handleCancel, form, handleCreateProduct }) {
    return (
        <Modal title="Thêm bàn" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                    label='Tên bàn: '
                    name={'myTableName'}
                    rules={[
                        {
                            required: true,
                            type: "string",
                            message: "Vui lòng nhập tên bàn"
                        }
                    ]}>
                    <Input placeholder='Nhập tên bàn' />
                </Form.Item>
            </Form>
        </Modal>
    )
}

function ModalEdit({ isModalOpen, handleOk, handleCancel, form, handleCreateProduct, data }) {
    const initialValues = {
        myTableName: data?.product_name || '',
        myKey: data?.id || ''
    };

    useEffect(() => {
        if (isModalOpen && data) {
            form.resetFields();
            form.setFieldsValue(initialValues);
        }
    }, [isModalOpen, data, initialValues, form]);

    return (
        <Modal title="Thông tin bàn" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                    label='Tên bàn: '
                    name={'myTableName'}
                    rules={[
                        {
                            required: true,
                            type: "string",
                            message: "Vui lòng nhập tên bàn"
                        }
                    ]}>
                    <Input placeholder='Nhập tên bàn' />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Users

