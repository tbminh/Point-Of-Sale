import { Button, FloatButton, Modal, Space, Table, Typography, Form, message, Input, InputNumber, Popconfirm, Pagination } from "antd"
import React, { useState, useEffect } from "react"
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './styles.scss'
import axios from "axios";
import { connect_string } from "../../Api";

const Products = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [curentPage, setCurentPage] = useState(1)
    const [data, setData] = useState({})
    const [formCreate] = Form.useForm();
    const [formEdit] = Form.useForm();


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

    useEffect(() => {
        handleGetAllProducts(1)
    }, [])

    const handleDeleteProduct = (value, record) => {
        const url = connect_string + 'delete-product/' + record.key
        axios.post(url).then(res => {
            if (res.data.message) {
                message.success('Xóa thành công');
                handleGetAllProducts(curentPage)
            }
        })

    }

    const handleGetAllProducts = (page) => {
        setIsLoading(true)
        const data = {
            page: page
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

    const handleCreateProduct = (values) => {
        const url = connect_string + 'add-product'
        const data = {
            product_name: values.myProducts,
            product_price: values.myPrice
        }
        axios.post(url, data).then(res => {
            if (res.data.message) {
                message.success('Thêm thành công')
                handleGetAllProducts(1)
                formCreate.resetFields()
            }
        }).catch(() => {
            message.error('Thêm thất bại')
        })
    }

    const handleEditProduct = (values) => {
        const url = connect_string + "update-product/" + values.myKey
        const data = {
            product_name: values.myProducts,
            product_price: values.myPrice
        }
        axios.post(url, data).then(res => {
            if (res.data) {
                handleGetAllProducts(curentPage)
                message.success("Cập nhật thành công")
            }
        }).catch(() => {
            message.error("Cập nhật thất bại")
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
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleShowModalEdit(record)
                        }} />
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
                    onClick={() => showModal('create')} />}
            />
            <ModalCreate
                form={formCreate}
                handleCancel={() => handleCancel('create')}
                handleCreateProduct={() => handleCreateProduct}
                handleOk={() => handleOk('create')}
                isModalOpen={isModalOpen} />
            <ModalEdit
                form={formEdit}
                handleCancel={() => handleCancel('edit')}
                handleCreateProduct={(value) => handleEditProduct(value)}
                handleOk={() => handleOk('edit')}
                isModalOpen={isModalEditOpen}
                data={data} />
            <Pagination
                className="pagination"
                defaultCurrent={1}
                total={totalPage}
                pageSize={5}
                style={{ float: 'right' }}
                showSizeChanger={false}
                onChange={(page) => { handleGetAllProducts(page), setCurentPage(page) }} />
            <Table
                loading={isLoading}
                style={{ width: '100vw', marginBottom: '10px' }}
                pagination={false}
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

function ModalEdit({ isModalOpen, handleOk, handleCancel, form, handleCreateProduct, data }) {
    const initialValues = {
        myProducts: data?.product_name || '',
        myPrice: data?.product_price ? parseInt(data.product_price) : 0,
        myKey: data?.id || ''
    };

    useEffect(() => {
        if (isModalOpen && data) {
            form.resetFields();
            form.setFieldsValue(initialValues);
        }
    }, [isModalOpen, data, initialValues, form]);

    return (
        <Modal title="Thông tin món ăn" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        // defaultValue={data[0]?.product_price}
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

