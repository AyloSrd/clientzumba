import React from "react"
import Header from '../components/Home/Header'
import ValueProposition from '../components/Home/ValueProposition'
import FooterMain from '../components/FooterMain/FooterMain'
import '../styles/Home.css'

const Home = () => {
    return (
      <div>
        <Header />
        <main>
          <ValueProposition />
        </main>
        <FooterMain />
      </div>
    )
}

export default Home
