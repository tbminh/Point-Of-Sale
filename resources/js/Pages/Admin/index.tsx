import { Space } from "antd"
import React from 'react';
import SideMenuAdmin from "../../components/SideMenuAdmin";
import PageContentAdmin from "../../components/PageContentAdmin";
import AppFooterAdmin from "../../components/AppFooterAdmin";
const Admin = () => {
    return(
        <div className="appAdmin">
            {/* <AppHeaderAdmin/> */}
            <Space className="slideMenuAndPageContent">
                <SideMenuAdmin></SideMenuAdmin>
                <PageContentAdmin></PageContentAdmin>
            </Space>
            <AppFooterAdmin/>
        </div>
    )
}
export default Admin