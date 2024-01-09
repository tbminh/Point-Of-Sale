import React from "react"
import { Outlet } from "react-router-dom"

const PageContentAdmin = () => {
    return (
        <div className="pageContentAdmin" style={{width:'100%', height:'100%'}}>
            <Outlet />
        </div>
    )
}
export default PageContentAdmin