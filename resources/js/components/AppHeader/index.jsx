import { Badge, Drawer, Menu, Typography } from 'antd';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { MailOutlined, HomeFilled, MenuOutlined, BellOutlined } from '@ant-design/icons'
import './styles.scss'
const AppHeader = () => {
    const [openMenu, setOpenMenu] = useState(false)
    return (
        <div className='appHeader' >
            <AppMenu />
            <Typography.Title className="shopName">AG STORE</Typography.Title>
            <AppCart />
        </div>

    )
}

function AppMenu() {
    return (
        <Menu
            style={{ color: 'black', width: 200  }}
            // onClick={onMenuClick}
            mode={'horizontal'}
            items={[
                {
                    label: <HomeFilled />,
                    key: "",
                },
                {
                    label: "Món",
                    key: "products",
                },
                {
                    label: "Tôi",
                    key: "infomation",
                },
            ]}
        ></Menu>
    )
}

function AppCart() {
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
    const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false)
    const [cartItem, setCartItem] = useState([])


    const showDrawer = () => {
        setCartDrawerOpen(true);
    };

    const onClose = () => {
        setCartDrawerOpen(false);
    };

    return (
        <>
            <div onClick={showDrawer} >
                <Badge
                    count={10} className='shoppingCartIcon'>
                    <BellOutlined className='shoppingCartIcon' />
                </Badge>
            </div>
            <Drawer
                open={cartDrawerOpen}
                onClose={onClose}
                title="Your Cart"
                contentWrapperStyle={{ width: 500 }}>
            </Drawer>

        </>
    )
}
export default AppHeader