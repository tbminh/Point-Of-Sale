import { Card, Space, Typography, List, Modal, Popconfirm, message, Input, InputNumber, Button, Divider } from 'antd';
import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from 'react';
import './styles.scss'
import { connect_string } from '../../Api';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const TablesOrder = () => {
    const imgOrder = "../../../../images/dinner-table.png"
    const imgNoOrder = "../../../../images/table.png"
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        handleGetAllTable()
    }, [])

    const handleGetAllTable = () => {
        setLoading(true)
        const url = connect_string + "get-table-order"
        axios.get(url).then(res => {
            const arr = res.data.map((item, index) => ({
                src: item.table_status === 1 ? imgOrder : imgNoOrder,
                title: item.table_name,
                id: item.id,
                data: item
            }))
            setDataSource(arr)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div >
            <List
                loading={loading}
                loadMore
                grid={{
                    xs: 2,
                    sm: 3,
                    md: 5,
                    lg: 7,
                    xl: 9,
                    xxl: 11,
                }}
                dataSource={dataSource}
                renderItem={(item, index) => (
                    <List.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <CardItem src={item.src} title={item.title} data={item} />
                    </List.Item>
                )}
            >
            </List>
        </div>
    )
}

const CardItem = ({ src, title, data }) => {
    const navigate = useNavigate()
    const userData = JSON.parse(sessionStorage.getItem('user_data'))
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listOrderDetail, setListOrderDetail] = useState([])
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (value) => {
        setIsModalOpen(false);
        navigate("/tables-order")
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const confirm = (e) => {
        const url = connect_string + "create-order"
        const data_table = {
            table_id: data.id,
            user_id: userData.id
        }
        axios.post(url, data_table).then(res => {
            navigate("/products-order", { state: data })
        }).catch(() => {
            message.error("Tạo order thất bại")
        })
    };

    const getOrderDetail = () => {
        const url = connect_string + "get-order-detail/" + data.id
        axios.get(url).then(res => {
            setListOrderDetail(res.data)
        })
    }

    const handleOrder = () => {
        if (data.data.table_status === 1) {
            getOrderDetail()
            showModal()
        }

    }
    return (
        <>
            {
                data.data.table_status === 0 ?
                    (
                        <Popconfirm
                            title={"THÊM ORDER: " + data.data.table_name}
                            description="Bạn có chắc chắn muốn thêm order?"
                            onConfirm={confirm}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Card
                                //onClick={handleOrder}
                                hoverable
                                style={{
                                    // background: data.data.table_status === 1 ? 'RED' : 'green',
                                    width: 128,
                                    padding: 20,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '20px',
                                    // boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
                                }}
                                cover={<img alt="example" src={src} />}
                            >
                                <Card.Meta
                                    title={
                                        <>
                                            <Typography.Paragraph
                                                ellipsis={true}
                                                style={{ fontSize: '20px', fontWeight: 700, color: 'black' }}
                                            >
                                                {title}
                                            </Typography.Paragraph>
                                        </>
                                    }
                                >
                                </Card.Meta>

                            </Card>

                        </Popconfirm>
                    )
                    :
                    <Card
                        onClick={handleOrder}
                        hoverable
                        style={{
                            // background: data.data.table_status === 1 ? 'RED' : 'green',
                            width: 128,
                            padding: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '20px',
                            // boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
                        }}
                        cover={<img alt="example" src={src} />}
                    >
                        <Card.Meta
                            title={
                                <>
                                    <Typography.Paragraph
                                        ellipsis={true}
                                        style={{ fontSize: '20px', fontWeight: 700, color: 'black' }}
                                    >
                                        {title}
                                    </Typography.Paragraph>
                                </>
                            }
                        >
                        </Card.Meta>
                    </Card>
            }
            <ModalTableOrderDetail open={isModalOpen} onOk={handleOk} onCancel={handleCancel} tableName={data.data.table_name} listOrderDetail={listOrderDetail} />
        </>
    )
}

const ModalTableOrderDetail = ({ open, onOk, onCancel, tableName, listOrderDetail }) => {
    const [quantityDict, setQuantityDict] = useState({});
    const increaseQuantity = (itemId) => {
        setQuantityDict((prevDict) => ({
            ...prevDict,
            [itemId]: (prevDict[itemId] || 0) + 1,
        }));
    };

    const decreaseQuantity = (itemId) => {
        if (quantityDict[itemId] > 1) {
            setQuantityDict((prevDict) => ({
                ...prevDict,
                [itemId]: prevDict[itemId] - 1,
            }));
        }
    };

    const initializeQuantityDict = () => {
        const initialQuantities = {};
        listOrderDetail.forEach((item) => {
            initialQuantities[item.id] = Number(item.quantity) || 0;
        });
        setQuantityDict(initialQuantities);
    };

    useEffect(() => {
        initializeQuantityDict();
    }, [listOrderDetail]);


    return (
        <Modal title={tableName} open={open} onOk={onOk} onCancel={onCancel}>
            <Button
                style={{ background: '#e07926', float: 'inline-end' }}
                type="primary"
                icon={<PlusOutlined />}
            //onClick={() => addToOrders(item, quantityDict[item.id] || 1)}
            >
                Thêm
            </Button>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={listOrderDetail || []}
                style={{ width: '100%' }}
                renderItem={(item) => (
                    <List.Item key={item.id} style={{ width: '100%' }}>
                        <List.Item.Meta
                            title={
                                <Typography.Text mark >{'item.product_name'}</Typography.Text>
                            }
                            description={
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    marginTop:'15px'
                                }}>
                                    <div className='inputQuantity' style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        background: 'rgb(61, 75, 100)',
                                        borderRadius: '15px',
                                        padding: 1
                                    }}>
                                        <Button
                                            onClick={() => decreaseQuantity(item.id)}
                                            size='small'
                                            shape='circle'
                                            icon={<MinusOutlined />} />
                                        <InputNumber
                                            style={{ width: '50px', background: 'transparent', border: 'none', color: 'white !important' }}
                                            value={quantityDict[item.id] || Number(item.quantity)}
                                            min={1}
                                            disabled
                                        />
                                        <Button
                                            onClick={() => increaseQuantity(item.id)}
                                            size='small'
                                            shape='circle'
                                            icon={<PlusOutlined />} />
                                    </div>
                                    <Typography.Text mark>
                                        {
                                            Number(item.price
                                            ).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })

                                        }
                                    </Typography.Text>
                                    <Button onClick={() => deleteItem(item)} size='small' type="primary" danger shape="circle" icon={<CloseOutlined />} />
                                    <Divider style={{ background: '#643006', marginTop: '10px', marginBottom: '10px' }} />
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
            <Input placeholder="Ghi chú" style={{ border: '1px solid black' }} />
        </Modal>
    )
}
export default TablesOrder;
