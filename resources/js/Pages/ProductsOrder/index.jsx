import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Card, Space, Typography, List, Modal, Input, Button, Divider, InputNumber, message } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined } from "@ant-design/icons"
import './styles.scss'
import axios from 'axios';
import { connect_string } from "../../Api";
import { useLocation } from 'react-router-dom';

const ProductsOrder = () => {
    //#region Variabel
    const imgProducts = "../../../../images/pho.jpg"
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [dataListOrder, setDataListOrder] = useState([])
    const [totalProductPrice, setTotalProductPrice] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [quantityDict, setQuantityDict] = useState({});
    const [total, setTotal] = useState(0)

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

    //#endregion

    //#region  useEffect + useMeno
    useEffect(() => {
        getAllProduct()
    }, [])


    //#endregion

    //#region Func Logic
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChangePrice = (value, item) => {
        setDataSource((prevList) =>
            prevList.map((product) =>
                product.id === item.id ? { ...product, product_price: value } : product
            )
        );
    };

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

    const addToOrders = (value, quantity) => {
        const temp = {
            ...value,
            quantity: quantity
        }
        setDataListOrder(prevOrders => [...prevOrders, temp]);
        message.success("Thêm thành công")
    }

    const handleTotalChange = (value) => {
        setTotal(value)
    }

    const searchProduct = (event) => {
        setLoading(true)
        const url = connect_string + "get-product-order"
        const data = {
            product_name: event.target.value
        }
        axios.post(url, data).then(res => {
            setDataSource(res.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    //#endregion

    return (
        <div className="productsOrder">
            <Input placeholder="Tìm kiếm" onChange={searchProduct} />
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
                            cover={<img alt="example" src={imgProducts} />}
                        >
                            <Card.Meta
                                title={
                                    <>
                                        <Typography.Text
                                            ellipsis={true}
                                            style={{ fontSize: '15px', fontWeight: 500, color: 'black' }}
                                        >
                                            {item.product_name}

                                        </Typography.Text>
                                    </>
                                }
                                description={
                                    <Typography.Paragraph
                                        ellipsis={{
                                            rows: 2,
                                        }}
                                        style={{ height: 'max-content', display: 'flex', flexDirection: 'column' }}>
                                        <div className='input-container'>
                                            <InputNumber
                                                style={{ fontSize: '17px', fontWeight: 'bold', width: '100%' }}
                                                value={item.product_price}
                                                min={0}
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                                parser={(value) => value.replace(/\./g, '')}
                                                onChange={(value) => onChangePrice(value, item)}
                                            />
                                        </div>
                                        <Divider style={{ background: 'gray', margin: '16px 0' }} />
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            background: 'rgb(61, 75, 100)',
                                            borderRadius: '15px',
                                            gap: 10,
                                            padding: 2,
                                            marginBottom: '15px'
                                        }}>
                                            <Button
                                                onClick={() => decreaseQuantity(item.id)}
                                                size='small'
                                                shape='circle'
                                                style={{ color: 'black', }}
                                                icon={<MinusOutlined />} />
                                            <Input
                                                size="middle"
                                                value={quantityDict[item.id] || 1}
                                                style={{ background: 'transparent', border: 'none', textAlign: 'center', color: 'white' }}
                                                disabled />
                                            <Button
                                                onClick={() => increaseQuantity(item.id)}
                                                size='small'
                                                shape='circle'
                                                style={{ color: 'black', }}
                                                icon={<PlusOutlined />} />

                                        </div>
                                        <Button
                                            style={{ width: "100%", background: '#e07926' }}
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={() => addToOrders(item, quantityDict[item.id] || 1)}>
                                            Thêm
                                        </Button>

                                    </Typography.Paragraph>
                                }
                            >
                            </Card.Meta>
                        </Card>
                    </List.Item>
                )}
            >
            </List>
            <div className='listOrder' >
                <Typography.Text
                    ellipsis={true}
                    style={{ fontSize: '17px', fontWeight: 500, color: 'white' }}
                    onClick={() => showModal()}
                >
                    Danh sách order
                </Typography.Text>
                <Typography.Text
                    ellipsis={true}
                    style={{ fontSize: '17px', fontWeight: 500, color: 'white' }}
                >
                    {
                        Number(total
                        ).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })
                    }
                </Typography.Text>
            </div>
            <ModalListOrder total={handleTotalChange} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} data={dataListOrder} />
        </div>
    )
}

const ModalListOrder = ({ data, open, onOk, onCancel, total }) => {
    const locate = useLocation()
    const tableDetail = locate.state

    const [productList, setProductList] = useState([]);

    //#region  useEffect + useMeno
    const uniqueProducts = useMemo(() => {
        return data.reduce((accumulator, currentProduct) => {
            const existingProductIndex = accumulator.findIndex(
                (product) => product.id === currentProduct.id
            );

            if (existingProductIndex !== -1) {
                // Nếu sản phẩm đã tồn tại, tăng quantity lên và cập nhật total_price
                accumulator[existingProductIndex].quantity += currentProduct.quantity || 1;
                accumulator[existingProductIndex].total_price += (
                    currentProduct.quantity || 1
                ) * parseFloat(currentProduct.product_price);
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm vào danh sách với quantity và total_price mới
                accumulator.push({
                    ...currentProduct,
                    quantity: currentProduct.quantity || 1,
                    total_price: (
                        currentProduct.quantity || 1
                    ) * parseFloat(currentProduct.product_price),
                });
            }

            return accumulator;
        }, []);
    }, [data]);

    useEffect(() => {
        setProductList([...uniqueProducts]);
    }, [uniqueProducts]);

    useEffect(() => {
        total(productList.reduce((sum, product) => sum + product.total_price, 0))
    }, [productList]);

    useEffect(() => {
        if(tableDetail.data.table_status === 0){
            console.log(tableDetail)
        }
    }, []);
    //#endregion

    //#region onChange
    const onChangeQuantity = (value, item) => {
        setProductList((prevList) =>
            prevList.map((product) => {
                return product.id === item.id
                    ? { ...product, quantity: value, total_price: value * Number(product.product_price) }
                    : product;
            })
        );
    };
    //#endregion

    const deleteItem = (item) => {
        setProductList((prevList) =>
            prevList.filter((product) => product.id !== item.id)
        );
    }

    return (
        <Modal title={tableDetail.title} open={open} onOk={onOk} onCancel={onCancel}>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={productList}
                renderItem={(item) => (
                    <List.Item key={item.id} >
                        <Typography.Text mark>{item.product_name}</Typography.Text>
                        <InputNumber
                            style={{ width: '50px' }}
                            value={item.quantity}
                            min={1}
                            onChange={(value) => onChangeQuantity(value, item)}
                        />
                        <Typography.Text mark>
                            {
                                Number(item.total_price
                                ).toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })
                            }
                        </Typography.Text>
                        <Button onClick={() => deleteItem(item)} size='small' type="primary" shape="circle" icon={<CloseOutlined />} />
                        <Divider style={{ background: '#643006' }} />
                    </List.Item>
                )}
            />
            <Input placeholder="Ghi chú" style={{ border: '1px solid black' }} />
        </Modal>
    );
};

export default ProductsOrder