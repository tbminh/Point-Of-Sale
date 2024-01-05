import { Button, FloatButton, Modal, Space, Table, Typography, Form, message, Input, InputNumber, Popconfirm, Pagination } from "antd"
import React, { useState, useEffect } from "react"
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './styles.scss'
import axios from "axios";
import { connect_string } from "../../Api";

const Products = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        handleGetAllProducts()
    }, [])

    const handleDeleteProduct = (value, record) => {
        const url = connect_string + 'delete-product/' + record.key
        axios.post(url).then(res => {
            if (res.data.message) {
                message.success('Xóa thành công');
                handleGetAllProducts()
            }
        })

    }

    const handleGetAllProducts = () => {
        setIsLoading(true)
        axios.get(connect_string + 'get-product').then(res => {
            const arr = res.data.list.map((item, index) => ({
                id: index + 1,
                productName: item.product_name,
                price: item.product_price,
                key: item.id
            }))
            setDataSource(arr)
            setIsLoading(false)
        })
    }

    const handleCreateProduct = (values) => {
        const url = connect_string + 'add-product'
        const data = {
            product_name: values.myProducts,
            product_price: values.myPrice
        }
        axios.post(url, data).then(res => {
            if (res.data.message) {
                message.success('Thêm thành công')
                handleGetAllProducts()
                form.resetFields()
            }
        }).catch(() => {
            message.error('Thêm thất bại')
        })
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên món',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (value) => {
                const formattedPrice = Number(value).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                });
                return formattedPrice;
            },
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
            render: (value, record) => (
                <Space>
                    <Popconfirm
                        title="Xóa món ăn"
                        description="Bạn có chắc chắn muốn xóa món ăn?"
                        onConfirm={(value) => handleDeleteProduct(value, record)}
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
                        icon={<EditOutlined />} />
                </Space>
            ),


        },

    ];

    return (
        <div style={{ marginTop: '10px' }}>
            <Typography.Title style={{ fontSize: '30px' }}>Danh Sách Món Ăn</Typography.Title>
            <FloatButton
                shape="circle"
                type="primary"
                style={{ right: 20, bottom: 60 }}
                icon={<PlusOutlined
                    onClick={showModal} />}
            />
            <ModalCreate form={form} handleCancel={handleCancel} handleCreateProduct={handleCreateProduct} handleOk={handleOk} isModalOpen={isModalOpen} />
            <Pagination className="pagination" defaultCurrent={1} total={500} pageSize={5} style={{ float: 'right' }}  showSizeChanger={false}/>
            <Table
                loading={isLoading}
                style={{ width: '100vw', marginBottom:'10px' }}
                pagination={false}
                // bordered={true}
                dataSource={dataSource}
                columns={columns}
                scroll={{ x: '600px', y: '60vh' }} />
        </div>
    )
}

function ModalCreate({ isModalOpen, handleOk, handleCancel, form, handleCreateProduct }) {
    return (
        <Modal title="Thêm món ăn" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                    label='Tên món ăn: '
                    name={'myProducts'}
                    rules={[
                        {
                            required: true,
                            type: "string",
                            message: "Vui lòng nhập tên món ăn"
                        }
                    ]}>
                    <Input placeholder='Nhập tên món ăn' />
                </Form.Item>
                <Form.Item
                    label='Giá (VND): '
                    name={'myPrice'}
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            message: "Vui lòng nhập giá tiền"
                        }
                    ]}>
                    <InputNumber
                        placeholder='Nhập giá món ăn'
                        style={{ width: '100%' }}
                        min={0}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        parser={(value) => value!.replace(/\./g, '')}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Products

