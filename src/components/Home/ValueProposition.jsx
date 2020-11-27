import React from 'react'
import'./ValueProposition.css'

const ValueProposition = () => {
	return (
          <section
            className="ValueProposition">
			<h2 className="CenteredText WhiteText">Learning Better and Faster</h2>
            <div 
              className="Flex JustifyCenterContent AlignFlexStartContent"
              id="valuePropositionContainer"  
            >
              <article className="Flex Column">
                <div className="Card iconBig">
                  <div className=" Join"></div>
                </div>
                <h3 className="CenteredText WhiteText">Join</h3>
                <p className="Marginless CenteredText">Join your favourite teacher on private e-classroom for live and interactive coding-lessons.</p>
              </article>
              <article className="Flex Column">
                <div className="Card iconBig">
                  <div className="Learn"></div>
                </div>
                <h3 className="CenteredText WhiteText">Learn</h3>
                <p className="Marginless CenteredText">You can pause at any time and experiment with the code. Then just hit play and resume the teacher's stream</p>
              </article>
              <article className="Flex Column">
                <div className="Card iconBig">
                  <div className="Relearn"></div>
                </div>
                <h3 className="CenteredText WhiteText">Re-learn</h3>
                <p className="Marginless CenteredText">A save-button allows you to save entire code pieces and re-access them later, to maximize your learning experience</p>
              </article>
            </div>
          </section>
	)
}

export default ValueProposition
