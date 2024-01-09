
import React from "react"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import Admin from "../../Pages/Admin"
import PageContentAdmin from "../PageContentAdmin"
import Dashboard from "../../Pages/Dashboard"
import Products from "../../Pages/Products"
import LoginPage from "../../Pages/LoginPage"
import Home from "../../Pages/Home"
import Tables from "../../Pages/Table"
import Users from "../../Pages/Users"
import MyInfomation from "../../Pages/MyInfomation"
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Home />}></Route>
            <Route path="/admin" element={<Admin />}>
                <Route index element={<PageContentAdmin />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="tables" element={<Tables />} />
                <Route path="products" element={<Products />} />
                <Route path="users" element={<Users />} />
                <Route path="my-infomation" element={<MyInfomation />} />
            </Route>
        </Routes>
    )
}
export default AppRoutes