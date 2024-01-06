import { Menu } from "antd"
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import React from "react"
import { useNavigate } from "react-router-dom"
import { FaBowlFood, FaToiletsPortable   } from "react-icons/fa6";

const SideMenuAdmin = () => {
    const navigate = useNavigate()
    return (
        <div className="sideMenu" >
            <Menu
                onClick={(item) => {
                    navigate(item.key)
                }}
                style={{fontSize:'15px', fontWeight:'500'}}
                items={[
                    {
                        label: "Trang chủ",
                        icon: <AppstoreOutlined />,
                        key: '/admin/dashboard'
                    },
                    {
                        label: "Món ăn",
                        icon: <FaBowlFood />,
                        key: '/admin/products'
                    },
                    {
                        label: "Bàn",
                        icon: <FaToiletsPortable />,
                        key: '/admin/tables'
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