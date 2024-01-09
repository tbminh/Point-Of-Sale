import React from "react"
import AppHeader from "../../components/AppHeader"
import PageContents from "../../components/PageContents"
import AppFooter from "../../components/AppFooter"
import './styles.scss'
const Home = () => {
    return (
        <div className="AppHome">
            <AppHeader />
            <PageContents />
            <AppFooter />
        </div>
    )
}

export default Home