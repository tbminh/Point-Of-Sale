import React, { useEffect, useState } from 'react'
import { Card, Space, Typography, List, Modal, Input, Button, Divider } from 'antd';
import { PlusOutlined, MinusOutlined, SearchOutlined } from "@ant-design/icons"
import './styles.scss'
import axios from 'axios';
import { connect_string } from "../../Api";
const ProductsOrder = () => {
    const imgProducts = "../../../../images/pho.jpg"
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [dataListOrder, setDataListOrder] = useState([])
    useEffect(() => {
        getAllProduct()
    }, [])

    const getAllProduct = () => {
        setLoading(true)
        const url = connect_string + "get-product-order"
        // const data ={
        //     product_name: ""
        // }
        axios.post(url).then(res => {
            setDataSource(res.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    const addToOrders = (value) => {
        setDataListOrder( item => item + value)
    }
    return (
        <div className="productsOrder">
            <List
                loading={loading}
                grid={{
                    gutter: 20,
                    xs: 2,
                    sm: 3,
                    md: 5,
                    lg: 5,
                    xl: 6,
                    xxl: 8,
                }}
                dataSource={dataSource}
                renderItem={(item, index) => (
                    <List.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <CardItem src={imgProducts} data={item} onClick={addToOrders} />
                    </List.Item>
                )}
            >
            </List>
            <div className='listOrder' >
                <Typography.Text
                    ellipsis={true}
                    style={{ fontSize: '17px', fontWeight: 500, color: 'white' }}
                >
                    Danh sách order
                </Typography.Text>
                <Typography.Text
                    ellipsis={true}
                    style={{ fontSize: '17px', fontWeight: 500, color: 'white' }}
                >
                    100.000 đ
                </Typography.Text>
            </div>
        </div>
    )
}

const CardItem = ({ src, data, onClick }) => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <>
            <Card
                hoverable
                style={{
                    width: 200,
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                }}
                cover={<img alt="example" src={src} />}
            >
                <Card.Meta
                    title={
                        <>
                            <Typography.Text
                                ellipsis={true}
                                style={{ fontSize: '15px', fontWeight: 500, color: 'black' }}
                            >
                                {data.product_name}

                            </Typography.Text>
                        </>
                    }
                    description={
                        <Typography.Paragraph
                            ellipsis={{
                                rows: 2,
                                // expandable: true,
                                // symbol: 'more',
                                // tooltip: true
                            }}
                            style={{ height: 'max-content', display: 'flex', flexDirection: 'column' }}>
                            <Typography.Text style={{ fontSize: '17px', fontWeight: 'bold' }}>
                                {
                                    Number(data.product_price).toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })
                                }
                            </Typography.Text>
                            <Divider style={{ background: 'gray', margin: '16px 0' }} />
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: 'rgb(61, 75, 100)',
                                borderRadius: '20px',
                                gap: 10,
                                padding: 5,
                                marginBottom: '20px'
                            }}>
                                <Button
                                    onClick={increaseQuantity}
                                    size='small'
                                    shape='circle'
                                    style={{ color: 'black', }}
                                    icon={<PlusOutlined />} />
                                <Input
                                    size="middle"
                                    value={quantity}
                                    style={{ background: 'transparent', border: 'none', textAlign: 'center', color: 'white' }}
                                    disabled />
                                <Button
                                    onClick={decreaseQuantity}
                                    size='small'
                                    shape='circle'
                                    style={{ color: 'black', }}
                                    icon={<MinusOutlined />} />
                            </div>
                            <Typography
                                onClick={() => onClick(data)}
                                style={{
                                    textAlign: 'right',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#522103'
                                }}>
                                Thêm
                            </Typography>
                        </Typography.Paragraph>
                    }
                >
                </Card.Meta>

            </Card>
        </>
    )
}



export default ProductsOrder