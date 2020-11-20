import React from "react"
import FooterMain from '../components/FooterMain/FooterMain'
import '../styles/Home.css'

const Home = () => {
    return (
      <div>
        <header className="Flex CenteredVHContent">
          <div id="TitleHeader">
            <h1 className="text">Coding School<br/>Experience<br/>Made Real</h1>
          </div>
          <div id="SubtitleHeader">
            <p className="text" id="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nulla quod reprehenderit architecto dicta laborum quia, doloribus at ipsam voluptatem sint autem asperiores veritatis sit et, aliquid rerum quaerat. Quis.</p>
          </div>
        </header>
        <main>
          <section>
            <article className="Card"></article>
            <article className="Card"></article>
            <article className="Card"></article>
          </section>
        </main>
        <FooterMain />
      </div>
    )
}

export default Home
