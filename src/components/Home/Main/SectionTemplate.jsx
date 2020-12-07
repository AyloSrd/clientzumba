import React from 'react'
import './SectionTemplate.css'

const SectionTemplate = ({ children, description, orientation }) => {	

	return (
		<section className={`SectionTemplate ${orientation}`}>
			<div className="Description">
				<h3>{description.title}</h3>
				<p>{description.description}</p>
			</div>
			<div className="SectionChildProp">
				{ children }
			</div>
		</section>
	)
}

export default SectionTemplate
