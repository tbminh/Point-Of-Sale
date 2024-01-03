
import React from "react"
import { Route, Routes } from "react-router-dom"
import Admin from "../../Pages/Admin"
import PageContentAdmin from "../PageContentAdmin"
import Dashboard from "../../Pages/Dashboard"

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/admin" element={<Admin />}>
                <Route element={<PageContentAdmin />}>
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>
            </Route>
        </Routes>
    )
}
export default AppRoutes