import { Space } from "antd"
import React from 'react';
import SideMenuAdmin from "../../components/SideMenuAdmin";
import PageContentAdmin from "../../components/PageContentAdmin";
import AppFooterAdmin from "../../components/AppFooterAdmin";
import './styles.scss'
const Admin = () => {
    return (
        <div className="appAdmin">
            {/* <AppHeaderAdmin/> */}
            <div style={{ display: 'flex', width: '100%', height: '100%', background: 'lightgray' }}>
                <div style={{ display: 'flex', width: '100%', gap: '50px' }}>
                    <div className="mobileSide" style={{ width: 'max-content', borderRight: '2px solid gray', padding: 10, boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px', background: '#3D4B64' }}>
                        <SideMenuAdmin></SideMenuAdmin>
                    </div>
                    <div className="content" style={{ width: '75%', height: '100%' }}>
                        <PageContentAdmin />
                    </div>
                </div>
            </div>
            <div className="mobileFooter">
                <AppFooterAdmin />
            </div>
        </div>
    )
}
export default Admin