import React from 'react'
import { LaunchSessionFunction } from './LaunchSessionFunction'
import { templateCode } from '../../data/libraries'
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
						code: templateCode[language] 
					}, '/desk')
				}
			>
				Launch lesson
			</button>
			<button
				className="NeuBtn LaunchLessonBtn"
				onClick={() => LaunchSessionFunction(props, { 
						room:`${language}-stream-${uuidv4()}`, 
						code: templateCode[language] 
					}, '/desk')
				}
			>
				Stream
			</button>
		</div>
	)
}

export default LaunchLessonCard
