import React from 'react'
import { LaunchSessionFunction } from './LaunchSessionFunction'
import { presetCode } from '../../data/libraries'
import './LaunchLessonCard.css'

const LaunchLessonCard = ({ props, language, uuidv4 }) => {
	console.log('card', props)
	return (
		<div className="Flex Column CenteredVHContent LaunchLessonCard">
			<div className="ImgContainer LaunchSessionImg">
				<img src={`assets/${language}Logo.jpg`} alt={`${language} logo`}/>
			</div>
			<button
				className="NeuBtn LaunchLessonBtn"
				onClick={() => LaunchSessionFunction(props, { 
						room:`${language}-lesson-${uuidv4()}`, 
						code: presetCode[language] 
					}, '/desk')
				}
			>
				Launch lesson
			</button>
		</div>
	)
}

export default LaunchLessonCard
