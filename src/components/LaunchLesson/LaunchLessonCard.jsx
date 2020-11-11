import React from 'react'
import { LaunchSessionFunction } from './LaunchSessionFunction'

const LaunchLessonCard = ({ props, language, uuidv4 }) => {
	console.log('card', props)
	return (
		<div className="LaunchLessionCard">
			<div>
				<img src={`assets/${language}Logo.jpg`} alt={`${language} logo`}/>
			</div>
			<button
				className="LaunchLessonBtn"
				onClick={() => LaunchSessionFunction(props, {room:`${language}-lesson-${uuidv4()}`}, '/desk')}
			>
				Launch lesson
			</button>
		</div>
	)
}

export default LaunchLessonCard
