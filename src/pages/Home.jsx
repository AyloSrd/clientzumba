import React from "react"
import Header from '../components/Home/Header'
import ValueProposition from '../components/Home/ValueProposition'
import Main from '../components/Home/Main/Main'
import FooterMain from '../components/FooterMain/FooterMain'
import '../styles/Home.css'

const Home = () => {
    return (
      <div>
        <Header />
        <ValueProposition />
        <Main />
        <FooterMain />
      </div>
    )
}

export default Home
