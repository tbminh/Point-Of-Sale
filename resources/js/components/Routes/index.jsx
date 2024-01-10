
import React, { useState, useEffect } from "react"
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import Admin from "../../Pages/Admin"
import PageContentAdmin from "../PageContentAdmin"
import Dashboard from "../../Pages/Dashboard"
import Products from "../../Pages/Products"
import LoginPage from "../../Pages/LoginPage"
import Home from "../../Pages/Home"
import Tables from "../../Pages/Table"
import Users from "../../Pages/Users"
import MyInfomation from "../../Pages/MyInfomation"
import { userData } from "../../Api"
import ProductsOrder from "../../Pages/ProductsOrder"
import PageContents from "../PageContents"
import TablesOrder from "../../Pages/TablesOrder"
const ProtectedRoutes = () => {
    const userDataString  = sessionStorage.getItem('user_data');
    if (!userDataString) {
        return <Navigate to={"/login"} replace />;
    }

    return <Outlet />;
};


const AppRoutes = () => {
    // const [authenticate, setAuthenticate] = useState(false)
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (userData) {
    //         setAuthenticate(true)
    //         navigate("/");
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userData]);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoutes />}>
                <Route element={<Home />}>
                    <Route index element={<PageContents />}></Route>
                    <Route path="/tables-order" element={<TablesOrder />}></Route>
                    <Route path="/products-order" element={<ProductsOrder />}></Route>

                </Route>
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<PageContentAdmin />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="tables" element={<Tables />} />
                    <Route path="products" element={<Products />} />
                    <Route path="users" element={<Users />} />
                    <Route path="my-infomation" element={<MyInfomation />} />
                </Route>
            </Route>
        </Routes>
    )
}
export default AppRoutes