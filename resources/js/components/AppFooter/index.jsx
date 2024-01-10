import { Menu } from 'antd';
import React, { useState } from 'react';
import { AppstoreOutlined, UserOutlined, BellOutlined } from "@ant-design/icons"
import { FaBowlFood } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const AppFooter = ({total}) => {
    const navigate = useNavigate()

    return (
        <div className="AppFooter">
            <Menu
                className='AppFooterAdmin'
                onClick={(item) => {
                    navigate(item.key)
                }}
                defaultSelectedKeys={['/tables-order']}
                style={{ fontSize: '13px', fontWeight: '500', color: 'white', background: '#3D4B64' }}
                // mode='inline'
                items={[
                    {
                        label: "",
                        icon: <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}> <AppstoreOutlined /> Home</div>,
                        key: '/tables-order'
                    },
                    {
                        label: "",
                        icon: <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}> <FaBowlFood /> Món</div>,
                        key: '/products-order'
                    },
                    {
                        label: "",
                        icon: <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}> <BellOutlined /> Thông báo</div>,
                        key: '/admin/users'
                    },
                    {
                        label: "",
                        icon: <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}> <UserOutlined /> Tôi</div>,
                        key: '/admin/my-infomation'
                    },
                ]}  >

            </Menu>
        </div>
    )
}
// export const ProductsOrderFooter = ({ total }) => {
//     return (
//         <div>
//             {total}
//         </div>
//     )
// }

export default AppFooter