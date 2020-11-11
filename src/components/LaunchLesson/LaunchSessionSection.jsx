import React from 'react'
import LaunchLessonCard from './LaunchLessonCard'
import { v4 as uuidv4 } from 'uuid'
import { libraries } from '../../data/libraries'

const LaunchSessionSection = props => {
	const languages = Object.keys(libraries)
	console.log('section', props, languages)
	return (
		<div>
			<div>
				<h2>Launch a new session</h2>
			</div>
			<div>
				{
					languages.map( language => <LaunchLessonCard 
							key={language} 
							props={props} 
							language={language} 
							uuidv4={uuidv4} 
						/>
					)
				}
			</div>
		</div>
	)
}

export default LaunchSessionSection
