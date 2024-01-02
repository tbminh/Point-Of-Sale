import { Badge, Drawer, Menu, Typography } from 'antd';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { MailOutlined, HomeFilled, MenuOutlined } from '@ant-design/icons'
import './styles.scss'
const AppHeader = () => {
    const [openMenu, setOpenMenu] = useState(false)
    return (
        <div className='appHeader'>
            <div  style={{ display: 'flex', alignItems: 'center' }}>
                <MenuOutlined className='menuIcon' style={{ marginLeft: '16px', fontSize: '20px' }} onClick={() => setOpenMenu(true)} />
                <AppMenu />
            </div>
            <Drawer
                placement='left'
                open={openMenu}
                closable={false}
                onClose={() => {
                    setOpenMenu(false)
                }}>
                <AppMenu isInline />
            </Drawer>
            <Typography.Title>AG STORE</Typography.Title>
            <AppCart />
        </div>

    )
}

function AppMenu({ isInline = false }) {
    return (
        <>
            <Menu
                className='appMenu'
                // onClick={onMenuClick}
                mode={isInline ? 'inline' : 'horizontal'}
                items={[
                    {
                        label: <HomeFilled />,
                        key: "",
                    },
                    {
                        label: "Men",
                        key: "men",
                        children: [
                            {
                                label: "Men's Shirts",
                                key: "mens-shirts"
                            },
                            {
                                label: "Men's Shoes",
                                key: "mens-shoes"
                            },
                            {
                                label: "Men's Watches",
                                key: "mens-watches"
                            },
                        ]
                    },
                    {
                        label: "Women",
                        key: "women",
                        children: [
                            {
                                label: "Women's Dresses",
                                key: "womens-dresses"
                            },
                            {
                                label: "Women's Shoes",
                                key: "womens-shoes"
                            },
                            {
                                label: "Women's Watches",
                                key: "womens-watches"
                            },
                            {
                                label: "Women's Jewellery",
                                key: "womens-jewellery"
                            },
                        ]
                    },
                    {
                        label: "Fragrances",
                        key: "fragrances",
                    },
                ]}
            />
        </>
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
                    <MailOutlined className='shoppingCartIcon' />
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