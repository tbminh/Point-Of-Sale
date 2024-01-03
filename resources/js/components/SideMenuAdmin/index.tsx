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
                        label: "Dashboard",
                        icon: <AppstoreOutlined />,
                        key: '/admin/dashboard'
                    },
                    {
                        label: "Inventory",
                        icon: <ShopOutlined />,
                        key: '/admin/inventory'
                    },
                    {
                        label: "Orders",
                        icon: <ShoppingCartOutlined />,
                        key: '/admin/orders'
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