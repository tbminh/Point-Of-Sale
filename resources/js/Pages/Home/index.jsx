import React, { useEffect } from "react"
import AppHeader from "../../components/AppHeader"
import PageContents from "../../components/PageContents"
import AppFooter from "../../components/AppFooter"
import './styles.scss'
import { useNavigate } from "react-router-dom"
const Home = () => {
    // const navigate = useNavigate()
    // useEffect(() => {
    //     navigate('/tables-order')
    // }, [])
    return (
        <div className="AppHome">
            {/* <AppHeader /> */}
            <PageContents />
            <AppFooter />
        </div>
    )
}

export default Home