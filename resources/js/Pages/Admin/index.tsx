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
            <div style={{display:'flex', flex:1, overflow:"hidden"}}>
                <div style={{display:'flex', flex: 1}}> 
                    <div className="mobileSide" style={{ width:'15%' }}>
                        <SideMenuAdmin></SideMenuAdmin>
                    </div>
                    <div className="content" style={{ width:'85%', height:'100%' }}>
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