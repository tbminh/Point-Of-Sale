import { Menu } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined, UsergroupAddOutlined } from "@ant-design/icons"
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
            style={{fontSize:'15px', fontWeight:'500', color:'gray'}}
            mode='inline'
            items={[
                {
                    label: "",
                    icon: <div style={{display:'flex', flexDirection:'column',gap:'10px'}}> <AppstoreOutlined/> Home</div>,
                    key: '/admin/dashboard'
                },
                {
                    label: "",
                    icon: <div style={{display:'flex', flexDirection:'column',gap:'10px', alignsItem:'center'}}> <FaBowlFood  /> Món</div>,
                    key: '/admin/products'
                },
                {
                    label: "",
                    icon: <div style={{display:'flex', flexDirection:'column',gap:'10px', alignsItem:'center'}}> <FaToiletsPortable /> Bàn</div>,
                    key: '/admin/tables'
                },
                {
                    label: "",
                    icon: <div style={{display:'flex', flexDirection:'column',gap:'10px', alignsItem:'center'}}> <UsergroupAddOutlined  /> Users</div>,
                    key: '/admin/tables1'
                },
                {
                    label: "",
                    icon: <div style={{display:'flex', flexDirection:'column',gap:'10px', alignsItem:'center'}}> <UserOutlined /> Tôi</div>,
                    key: '/'
                },
            ]}  >

        </Menu>
    )
}

export default AppFooterAdmin