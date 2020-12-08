import React from 'react'
import { LaunchSessionFunction } from './LaunchSessionFunction'
import { templateCode } from '../../data/libraries'
import './LaunchLessonCard.css'

const LaunchLessonCard = ({ props, language, uuidv4 }) => {
	return (
		<div className="Flex Column CenteredVHContent LaunchLessonCard">
			<div className="ImgContainer LaunchSessionImg">
				<img src={`assets/${language}Logo.jpg`} alt={`${language} logo`}/>
			</div>
			<div className="Flex LaunchBtns">
				<button
					className="NeuBtn LaunchLessonBtn"
					onClick={() => LaunchSessionFunction(props, { 
							room:`${language}-lesson-${uuidv4()}`, 
							code: templateCode[language] 
						}, '/desk')
					}
				>
					Lesson<br/>Mode
				</button>
				<button
					className="NeuBtn LaunchLessonBtn"
					onClick={() => LaunchSessionFunction(props, { 
							room:`${language}-stream-${uuidv4()}`, 
							code: templateCode[language] 
						}, '/desk')
					}
				>
					Stream<br/>Session
				</button>
			</div>
		</div>
	)
}

export default LaunchLessonCard
