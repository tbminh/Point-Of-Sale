
import React from "react"
import { Route, Routes } from "react-router-dom"
import Admin from "../../Pages/Admin"
import PageContentAdmin from "../PageContentAdmin"
import Dashboard from "../../Pages/Dashboard"
import Products from "../../Pages/Products"
import Home from "../../Pages/Home"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/admin" element={<Admin />}>
                <Route index element={<PageContentAdmin />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<Products />} />
            </Route>
        </Routes>
    )
}
export default AppRoutes