import { Menu } from "antd"
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import React from "react"
import { useNavigate } from "react-router-dom"
const SideMenuAdmin = () => {
    const navigate = useNavigate()
    return (
        <div className="sideMenu">
            <Menu
                onClick={(item) => {
                    navigate(item.key)
                }}
                items={[
                    {
                        label: "Bàn",
                        icon: <AppstoreOutlined />,
                        key: '/admin/dashboard'
                    },
                    {
                        label: "Món ăn",
                        icon: <ShopOutlined />,
                        key: '/admin/products'
                    },
                    {
                        label: "Người dùng",
                        icon: <ShoppingCartOutlined />,
                        key: '/admin/users'
                    },
                    {
                        label: "Customers",
                        icon: <UserOutlined />,
                        key: '/admin/customers'
                    },
                ]}  >

            </Menu>
        </div>
    )
}
export default SideMenuAdmin