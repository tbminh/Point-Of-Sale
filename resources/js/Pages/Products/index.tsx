import { Button, FloatButton, Modal, Space, Table, Typography } from "antd"
import React, { useState } from "react"
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './styles.scss'
const Products = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const dataSource = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        productName: `Món ${index + 1}`,
        price: 40000,
    }));


    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            width: 50,
        },
        {
            title: 'Tên món',
            dataIndex: 'productName',
            key: 'productName',
            width: 100,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: 100,
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
            render: () => (
                <Space>
                    < Button
                        type="primary"
                        danger
                        icon={< DeleteOutlined />}
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />} />
                </Space>
            ),
            width: 150,


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
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <Table
                style={{ width: '100vw' }}
                bordered={true}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                scroll={{ x: '600px', y: '60vh' }} />
        </div>
    )
}

export default Products

