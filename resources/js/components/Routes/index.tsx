
import React from "react"
import { Route, Routes } from "react-router-dom"
import Admin from "../../Pages/Admin"
import PageContentAdmin from "../PageContentAdmin"
import Dashboard from "../../Pages/Dashboard"
import Products from "../../Pages/Products"
import LoginPage from "../../Pages/LoginPage"
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<Admin />}>
                <Route index element={<PageContentAdmin />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<Products />} />
            </Route>
        </Routes>
    )
}
export default AppRoutes