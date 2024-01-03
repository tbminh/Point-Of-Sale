import React from "react"
import { Outlet } from "react-router-dom"

const PageContentAdmin = () => {
    return (
        <div className="pageContentAdmin">
            <Outlet />
        </div>
    )
}
export default PageContentAdmin