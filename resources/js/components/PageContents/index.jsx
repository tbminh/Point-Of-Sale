import { Card, Space, Typography, List } from 'antd';
import React from 'react';
import './styles.scss'
const PageContents = () => {
    const src = "../../../../images/dinner-table.png"
    const src1 = "../../../../images/table.png"

    const data = [
        {
            title: 'Ant Design Title 1',
            src: src
        },
        {
            title: 'Ant Design Title 2',
            src: src1
        },
        {
            title: 'Ant Design Title 3',
            src: src
        },
        {
            title: 'Ant Design Title 4',
            src: src1
        },
        {
            title: 'Ant Design Title 4',
            src: src1
        },
        {
            title: 'Ant Design Title 4',
            src: src1
        },
        {
            title: 'Ant Design Title 4',
            src: src1
        },

        {
            title: 'Ant Design Title 4',
            src: src1
        },

        {
            title: 'Ant Design Title 4',
            src: src1
        },
        {
            title: 'Ant Design Title 4',
            src: src1
        },

        {
            title: 'Ant Design Title 4',
            src: src1
        },

        {
            title: 'Ant Design Title 4',
            src: src1
        },
        {
            title: 'Ant Design Title 4',
            src: src1
        },
    ];

    return (
        <div style={{ display: 'flex', flex: 1, overflowY: 'auto', padding: 10,  }}>
            <List
                grid={{
                    gutter:20,
                    xs: 2,
                    sm: 3,
                    md: 5,
                    lg: 7,
                    xl: 9,
                    xxl: 11,
                }}
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item style={{display:'flex', justifyContent:'center'}}>
                        <CardItem src={item.src} title={item.title} />
                    </List.Item>
                )}
            >

            </List>

        </div>
    )
}

const CardItem = ({ src, title }) => {
    return (
        <Card
            hoverable
            style={{
                width: 128,
                padding: 10,
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
                    <Typography.Paragraph
                        style={{ fontSize: '15px', fontWeight: 700, }}
                    >
                        {title}
                    </Typography.Paragraph>
                }
            >
            </Card.Meta>
        </Card>
    )
}

export default PageContents;
