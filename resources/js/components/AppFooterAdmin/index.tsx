import { Menu } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import { FaBowlFood,FaToiletsPortable  } from "react-icons/fa6";

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
                    icon: <FaBowlFood  />,
                    key: '/admin/products'
                },
                {
                    label: "",
                    icon: <FaToiletsPortable />,
                    key: '/admin/tables'
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