import { Radio, Col, Row, Select, Card, Space, Typography, List, Modal, Popconfirm, message, Input, InputNumber, Button, Divider } from 'antd';
import { CloseOutlined, MinusOutlined, PlusOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons"
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

    const handleCancel = (value) => {
        setIsModalOpen(false);
    };

    const handleSave = (value) => {
        const url = connect_string + "update-order"
        axios.post(url, value).then(res => {
            message.success("Cập nhật thành công")
            getOrderDetail()
        }).catch(() => {
            message.error("Cập nhật thất bại")

        })
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

    const handleResetData = (value) => {
        if (value === true) {
            getOrderDetail()
        }
    }
    return (
        <>
            {
                data.data.table_status === 0 ?
                    (
                        <Popconfirm
                            title={"Thêm order"}
                            description={"Bạn có chắc chắn muốn thêm order " + data.data.table_name + "?"}
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
            <ModalTableOrderDetail onSave={handleSave} dataTable={data} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} tableName={data.data.table_name} listOrderDetail={listOrderDetail} resetData={handleResetData} />
        </>
    )
}

const ModalTableOrderDetail = ({ open, onOk, onCancel, tableName, listOrderDetail, resetData, dataTable, onSave }) => {
    const navigate = useNavigate()
    const userData = JSON.parse(sessionStorage.getItem('user_data'))
    const [quantityDict, setQuantityDict] = useState({});
    const [note, setNote] = useState('')
    const [orderList, setOrderList] = useState([])
    const [total, setTotal] = useState(0)
    const [totalInView, setTotalInView] = useState(0)
    const [totalInViewTemp, setTotalInViewTemp] = useState(0)
    const [surcharge, setSurcharge] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [selectSurcharge, setSelectSurcharge] = useState('money')
    const [selectDiscount, setSelectDiscount] = useState('money')

    const handleChangeSurcharge = (value) => {
        setSurcharge(value);
        if (selectSurcharge === 'money') {
            setTotalInView((prevTotal) => {
                return prevTotal + value - surcharge;
            });
            // setTotalInViewTemp((prevTotal) => {
            //     return prevTotal + value - surcharge;
            // });
        }
        else {
            setTotalInView((prevTotal) => {
                return Number(prevTotal) - Number((Number(totalInViewTemp) * surcharge) / 100) + Number((Number(value) * totalInViewTemp) / 100);
            });
            // setTotalInViewTemp((prevTotal) => {
            //     return Number(prevTotal) + Number(percentageChange) - Number(percentageChange1);
            // });
        }

    }


    const handleChangeDiscount = (value) => {
        setDiscount(value)
        if (selectDiscount === 'money') {
            setTotalInView((prevTotal) => {

                return Number(prevTotal) + Number(discount) - Number(value);
            });
            // setTotalInViewTemp((prevTotal) => {
            //     return Number(prevTotal) + Number(discount) - Number(value);
            // });
        }
        else {
            setTotalInView((prevTotal) => {
                return Number(prevTotal) + Number((Number(totalInViewTemp) * discount) / 100) - Number((Number(value) * totalInViewTemp) / 100);
            });
            // setTotalInViewTemp((prevTotal) => {
            //     return Number(prevTotal) + Number(percentageChange) - Number(percentageChange1);
            // });
        }

    }

    const handleChangeSelectSurcharge = (event) => {
        setSelectSurcharge(event.target.value)
    }

    const handleChangeSelectDiscount = (event) => {
        setSelectDiscount(event.target.value)
    }

    const handleChangeNote = (event) => {
        setNote(event.target.value)
    }

    const increaseQuantity = (itemId) => {
        setQuantityDict((prevDict) => {
            const newQuantity = (prevDict[itemId] || 0) + 1;

            setOrderList((prevList) =>
                prevList?.map((product) =>
                    product.id === itemId
                        ? { ...product, quantity: newQuantity, price: newQuantity * Number(product.unit_price) }
                        : product
                )
            );

            return {
                ...prevDict,
                [itemId]: newQuantity,
            };
        });
    };

    const decreaseQuantity = (itemId) => {
        setQuantityDict((prevDict) => {
            const newQuantity = Math.max((prevDict[itemId] || 0) - 1, 1);

            setOrderList((prevList) =>
                prevList?.map((product) =>
                    product.id === itemId
                        ? { ...product, quantity: newQuantity, price: newQuantity * Number(product.unit_price) }
                        : product
                )
            );

            return {
                ...prevDict,
                [itemId]: newQuantity,
            };
        });
    };

    const handleEditMeal = (itemId) => {
        setOrderList((prevList) =>
            prevList?.map((product) =>
                product.id === itemId
                    ? { ...product, disable: false }
                    : product
            )
        );
    }

    const handleCofirmEditMeal = (itemId) => {
        setOrderList((prevList) => {
            const updatedList = prevList?.map((product) =>
                product.id === itemId
                    ? { ...product, disable: true }
                    : product
            );

            const editedItem = updatedList.find((product) => product.id === itemId);

            if (editedItem) {
                const url = connect_string + 'update-meal';
                const dataEdit = {
                    detail_id: editedItem.id,
                    unit_price: editedItem.unit_price,
                    quantity: editedItem.quantity,
                    product_status: editedItem.product_status,
                    user_id: userData.id
                }
                axios.post(url, dataEdit)
                    .then((response) => {
                        message.success('Cập nhật thành công');
                        resetData(true)
                    })
                    .catch((error) => {
                        message.error('Lỗi khi cập nhật');
                    });
            }

            return updatedList;
        });
    }

    const initializeQuantityDict = () => {
        const initialQuantities = {};
        listOrderDetail?.data?.forEach((item) => {
            initialQuantities[item.id] = Number(item.quantity) || 0;
        });
        setQuantityDict(initialQuantities);
    };


    useEffect(() => {
        initializeQuantityDict();
        setNote(listOrderDetail?.order?.note)
        const arr = listOrderDetail?.data?.map((item) => ({
            ...item,
            disable: true
        }))
        setOrderList(arr)
        setTotal(listOrderDetail?.order?.total_price)
        setTotalInViewTemp(listOrderDetail?.order?.total_price)
        setDiscount(listOrderDetail?.order?.discount)
        setSurcharge(listOrderDetail?.order?.surcharge)
    }, [listOrderDetail.data]);

    useEffect(() => {
        if (orderList?.length > 0) {
            const percentageChangeSurcharge = (Number(totalInViewTemp) * surcharge) / 100;
            const percentageChangeDiscount = (Number(totalInViewTemp) * discount) / 100;

            const totalPrice = orderList?.reduce((total, item) => total + Number(item.price), 0);

            if (selectDiscount === 'money' && selectSurcharge === 'percent') {
                setTotalInView(Number(totalPrice) - Number(discount) + Number(percentageChangeSurcharge))
                setTotalInViewTemp(Number(totalPrice) - Number(discount) + Number(percentageChangeSurcharge))
            }
            else if (selectDiscount === 'percent' && selectSurcharge === 'money') {
                setTotalInView(Number(totalPrice) - Number(percentageChangeDiscount) + Number(surcharge))
                setTotalInViewTemp(Number(totalPrice) - Number(percentageChangeDiscount) + Number(surcharge))
            }
            else if (selectDiscount === 'money' && selectSurcharge === 'money') {
                setTotalInView(Number(totalPrice) - Number(discount) + Number(surcharge))
                setTotalInViewTemp(Number(totalPrice) - Number(discount) + Number(surcharge))
            }
            else if (selectDiscount === 'percent' && selectSurcharge === 'percent') {
                setTotalInView(Number(totalPrice) - Number(percentageChangeDiscount) + Number(percentageChangeSurcharge))
                setTotalInViewTemp(Number(totalPrice) - Number(percentageChangeDiscount) + Number(percentageChangeSurcharge))
            }
            // setTotalInView(Number(totalPrice))
            // setTotalInViewTemp(Number(totalPrice))

        }
    }, [orderList])

    // useEffect(() => {
    //     if (selectSurcharge === 'percent') {
    //         const percentageChange = (Number(totalInViewTemp) * surcharge) / 100;
    //         console.log(percentageChange)
    //         setTotalInView(
    //             Number(totalInViewTemp) + Number(percentageChange)
    //         )


    //     }
    // }, [surcharge]);

    // useEffect(() => {
    //     if (selectDiscount === 'percent') {
    //         const percentageChange = (Number(totalInViewTemp) * discount) / 100;
    //         console.log(percentageChange)

    //         setTotalInView(
    //             Number(totalInViewTemp) - Number(percentageChange)
    //         )

    //         // setTotalInViewTemp(Number(totalInViewTemp) - Number(percentageChange));

    //     }
    // }, [discount]);

    const handleDelete = (id) => {
        const url = connect_string + "delete-meal"
        const data = {
            id: id
        }
        axios.post(url, data).then(res => {
            message.success("Xóa thành công")
            resetData(true)

        }).catch(() => {
            message.error("Xóa thất bại")
        })
    }

    const handleAddMeal = () => {
        navigate("/products-order", { state: dataTable })
    }

    const handleEditOrder = () => {
        const data = {
            table_id: dataTable.id,
            surcharge: selectSurcharge === "percent" ? (Number(totalInViewTemp) * surcharge) / 100 : surcharge,
            discount: selectDiscount === "percent" ? (Number(totalInViewTemp) * discount) / 100 : discount,
            user_id: userData.id,
            note: note
        }
        return data
    }
    return (
        <Modal
            title={tableName}
            open={open}
            onOk={() => console.log(orderList)}
            onCancel={onCancel}
            okText="Thanh toán"
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <Button onClick={() => onSave(handleEditOrder())}>Lưu</Button>
                    {/* <CancelBtn /> */}
                    <OkBtn />
                </>
            )}
        >
            <Button
                style={{ background: '#e07926', float: 'inline-end', zIndex: 999 }}
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddMeal}
            >
                Thêm
            </Button>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={orderList || []}
                style={{ width: '100%' }}
                renderItem={(item) => (
                    <List.Item key={item.id} style={{ width: '100%' }}>
                        <List.Item.Meta
                            title={
                                <Typography.Text  >{item.product_name}</Typography.Text>
                            }
                            description={
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    marginTop: '15px'
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
                                            disabled={item.disable}
                                            onClick={() => decreaseQuantity(item.id)}
                                            size='small'
                                            shape='circle'
                                            icon={<MinusOutlined />} />
                                        <Input
                                            style={{ width: '30px', background: 'transparent', border: 'none', color: 'white !important' }}
                                            value={quantityDict[item.id] || Number(item.quantity)}
                                            disabled
                                        />
                                        <Button
                                            disabled={item.disable}
                                            onClick={() => increaseQuantity(item.id)}
                                            size='small'
                                            shape='circle'
                                            icon={<PlusOutlined />} />
                                        <div >

                                        </div>
                                    </div>
                                    <Typography.Text >
                                        {
                                            Number(item.price
                                            ).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })

                                        }
                                    </Typography.Text>
                                    {
                                        item.disable === false
                                            ?
                                            <Button style={{ background: 'green' }} size='small' type="primary" shape="circle" icon={<CheckOutlined />} onClick={() => handleCofirmEditMeal(item.id)} />
                                            :
                                            <Button size='small' type="primary" shape="circle" icon={<EditOutlined />} onClick={() => handleEditMeal(item.id)} />
                                    }
                                    <Popconfirm
                                        title={"Xóa món"}
                                        description={"Bạn có chắc chắn muốn xóa món ?"}
                                        onConfirm={() => handleDelete(item.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button size='small' type="primary" danger shape="circle" icon={<CloseOutlined />} />
                                    </Popconfirm>

                                    <Divider style={{ background: '#643006', marginTop: '10px', marginBottom: '10px' }} />
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />

            <Row gutter={[16, 16]} >
                <Col span={6} style={{ alignItems: 'flex-end', display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography.Text style={{ fontWeight: 'bold', color: 'green' }}>Phụ thu </Typography.Text>
                </Col>
                <Col span={11}>
                    <InputNumber value=
                        {
                            surcharge
                            // selectSurcharge === 'money' ? Number(surcharge
                            // ).toLocaleString('vi-VN', {
                            //     style: 'currency',
                            //     currency: 'VND',
                            // }) : surcharge
                        }
                        min={0}
                        parser={(value) => value.replace(/\./g, '')}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        onChange={handleChangeSurcharge}
                        style={{ border: 'none', borderBottom: '1px solid black', width: '100%', borderRadius: '0px' }} />
                </Col>
                <Col span={7}  style={{ alignItems: 'flex-end', display: 'flex', }}>
                    <Radio.Group size='small' buttonStyle="solid" onChange={handleChangeSelectSurcharge} value={selectSurcharge}>
                        <Radio.Button value="money">VND</Radio.Button>
                        <Radio.Button value="percent">%</Radio.Button>
                    </Radio.Group>
                    {/* <Select
                        style={{ width: '100%' }}
                        options={[
                            { value: 'money', label: 'VND' },
                            { value: 'percent', label: '%' },
                        ]}
                    /> */}
                </Col>
                <Col span={6} style={{ alignItems: 'flex-end', display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography.Text style={{ fontWeight: 'bold', color: 'red' }}>Giảm giá </Typography.Text>
                </Col>
                <Col span={11}>
                    <InputNumber value=
                        {
                            // selectDiscount === 'money' ? Number(discount
                            // ).toLocaleString('vi-VN', {
                            //     style: 'currency',
                            //     currency: 'VND',
                            // }) :
                            discount
                        }
                        min={0}
                        parser={(value) => value.replace(/\./g, '')}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        onChange={handleChangeDiscount}
                        style={{ border: 'none', borderBottom: '1px solid black', width: '100%', borderRadius: '0px' }} />
                </Col>
                <Col span={7} style={{ alignItems: 'flex-end', display: 'flex', }}>
                    <Radio.Group size='small' buttonStyle="solid" onChange={handleChangeSelectDiscount} value={selectDiscount}>
                        <Radio.Button value="money">VND</Radio.Button>
                        <Radio.Button value="percent">%</Radio.Button>
                    </Radio.Group>
                    {/* <Select
                        value={selectDiscount}
                        onChange={handleChangeSelectDiscount}
                        style={{ width: '100%' }}
                        options={[
                            { value: 'money', label: 'VND' },
                            { value: 'percent', label: '%' },
                        ]}
                    /> */}
                </Col>
                <Col span={6} style={{ alignItems: 'flex-end', display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography.Text style={{ fontWeight: 'bold', color: '#FE7A36' }}>Ghi chú </Typography.Text>
                </Col>
                <Col span={18}>
                    <Input style={{ border: 'none', borderBottom: '1px solid black', borderRadius: '0px' }} value={note} onChange={handleChangeNote} />
                </Col>
                <Col span={24} style={{ alignItems: 'center', display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography.Text mark style={{ fontWeight: 'bold', }}>
                        {
                            "Tổng tiền: " +
                            Number(totalInView).toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            })
                        }
                    </Typography.Text>
                </Col>
            </Row>
        </Modal>
    )
}
export default TablesOrder;
