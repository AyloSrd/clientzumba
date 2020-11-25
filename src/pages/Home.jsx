import React from "react"
import Header from '../components/Home/Header'
import FooterMain from '../components/FooterMain/FooterMain'
import '../styles/Home.css'

const Home = () => {
    return (
      <div>
        <Header />
        <main>
          <section 
            id="section-1"
          >
            
          </section>
          <section
            id="section-3">
            <div>
              <h2 className="text">Section 2</h2>
            </div>
            <div 
              className="Flex JustifyCenterContent AlignFlexStartContent"
              id="valueProposition"  
            >
              <article className="Flex Column">
                <div className="Card iconBig">
                  <div className=" Join"></div>
                </div>
                <h3 className="CenteredText">Join</h3>
                <p className="Marginless CenteredText">Join your favourite teacher on private e-classroom for live and interactive coding-lessons.</p>
              </article>
              <article className="Flex Column">
                <div className="Card iconBig">
                  <div className="Learn"></div>
                </div>
                <h3 className="CenteredText">Learn</h3>
                <p className="Marginless CenteredText">You can pause at any time and experiment with the code. Then just hit play and resume the teacher's stream</p>
              </article>
              <article className="Flex Column">
                <div className="Card iconBig">
                  <div className="Relearn"></div>
                </div>
                <h3 className="CenteredText">Re-learn</h3>
                <p className="Marginless CenteredText">A save-button allows you to save entire code pieces and re-access them later, to maximize your learning experience</p>
              </article>
            </div>
          </section>
        </main>
        <FooterMain />
      </div>
    )
}

export default Home
