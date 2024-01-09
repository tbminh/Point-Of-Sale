import { Divider, Menu, Typography } from "antd"
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined, UsergroupAddOutlined } from "@ant-design/icons"
import React from "react"
import { useNavigate } from "react-router-dom"
import { FaBowlFood, FaToiletsPortable } from "react-icons/fa6";

const SideMenuAdmin = () => {
    const navigate = useNavigate()
    return (
        <div className="sideMenu" >
            <Typography.Paragraph style={{textAlign:'center', fontSize:'23px', color:' white', fontWeight:500}}> AG STORE</Typography.Paragraph>
            <Divider style={{background: 'antiquewhite' }}/>
            <Menu
                onClick={(item) => {
                    navigate(item.key)
                }}
                style={{ fontSize: '15px', fontWeight: '500', background: '#3D4B64', color: 'white', border: 'none' }}
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
                        label: "Người dùng",
                        icon: <UsergroupAddOutlined />,
                        key: '/admin/users'
                    },
                    {
                        label: "Tôi",
                        icon: <UserOutlined />,
                        key: '/admin/my-infomation'
                    },
                ]}  >

            </Menu>
        </div>
    )
}
export default SideMenuAdmin