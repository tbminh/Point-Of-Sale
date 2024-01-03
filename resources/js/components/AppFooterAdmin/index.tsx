import { Menu } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import './styles.scss'
const AppFooterAdmin = () => {
    const navigate = useNavigate()
    return (
        <Menu
            className='AppFooterAdmin'
            onClick={(item) => {
                navigate(item.key)
            }}
            mode='horizontal'
            items={[
                {
                    label: "",
                    icon: <AppstoreOutlined />,
                    key: '/admin/dashboard'
                },
                {
                    label: "",
                    icon: <ShopOutlined />,
                    key: '/admin/inventory'
                },
                {
                    label: "",
                    icon: <ShoppingCartOutlined />,
                    key: '/admin/orders'
                },
                {
                    label: "",
                    icon: <UserOutlined />,
                    key: '/admin/customers'
                },
            ]}  >

        </Menu>
    )
}

export default AppFooterAdmin