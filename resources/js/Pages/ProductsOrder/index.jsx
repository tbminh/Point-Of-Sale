import React, { useState } from 'react'
import { Card, Space, Typography, List, Modal, Input, Button, Divider } from 'antd';
import { PlusOutlined, MinusOutlined, SearchOutlined } from "@ant-design/icons"
import './styles.scss'
const ProductsOrder = () => {
    const imgProducts = "../../../../images/pho.jpg"
    const data = [
        {
            key: 1
        },
        {
            key: 2
        },
        {
            key: 4
        },
        {
            key: 5
        },
        {
            key: 6
        },
        {
            key: 7
        },
        {
            key: 8
        },
        {
            key: 9
        },
        {
            key: 10
        },
        {
            key: 11
        },


    ]
    
    return (
        <div className="productsOrder">
            <List
                grid={{
                    gutter: 20,
                    xs: 2,
                    sm: 3,
                    md: 5,
                    lg: 5,
                    xl: 6,
                    xxl: 8,
                }}
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <CardItem src={imgProducts} />
                    </List.Item>
                )}
            >
            </List>
        </div>
    )
}


const CardItem = ({ src }) => {
    const [quantity, setQuantity] = useState(1); // State lưu giữ giá trị của input

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
                                {"Phở Chó"}

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
                                    Number(500000).toLocaleString('vi-VN', {
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
                            <Typography style={{ textAlign: 'right', fontSize: '18px', fontWeight: 'bold', color: '#522103' }}>Thêm</Typography>
                        </Typography.Paragraph>
                    }
                >
                </Card.Meta>

            </Card>
        </>
    )
}


export default ProductsOrder