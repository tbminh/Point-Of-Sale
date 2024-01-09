import { Card, Space, Typography, List } from 'antd';
import React, { useEffect, useState } from 'react';
import './styles.scss'
import { connect_string } from '../../Api';
import axios from 'axios';
const PageContents = () => {
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
        }).finally(()=>{
            setLoading(false)
        })
    }

    return (
        <div style={{ display: 'flex', flex: 1, overflowY: 'auto', padding: 10, }}>
            <List
                loading={loading}
                loadMore
                grid={{
                    gutter: 20,
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
    return (
        <Card
            hoverable
            style={{
                width: 128,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
            }}
            cover={<img alt="example" src={src} />}
        >
            <Card.Meta
                title={
                    <>
                        <Typography.Paragraph
                            style={{ fontSize: '15px', fontWeight: 700, }}
                        >
                            {title}
                        </Typography.Paragraph>
                    </>
                }
            >
            </Card.Meta>
        </Card>
    )
}

export default PageContents;
