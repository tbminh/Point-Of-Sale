
import React from "react"
import { Route, Routes } from "react-router-dom"
import Admin from "../../Pages/Admin"
import PageContentAdmin from "../PageContentAdmin"
import Dashboard from "../../Pages/Dashboard"
import Products from "../../Pages/Products"
import Home from "../../Pages/Home"
import Tables from "../../Pages/Table"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/admin" element={<Admin />}>
                <Route index element={<PageContentAdmin />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="tables" element={<Tables />} />
                <Route path="products" element={<Products />} />
            </Route>
        </Routes>
    )
}
export default AppRoutes