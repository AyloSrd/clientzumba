import React,{ useState } from 'react'
import { LaunchSessionFunction } from './LaunchSessionFunction'
import { templateCode } from '../../data/libraries'
import './JoinLesson.css'

const JoinLessonSection = props => {
	const [ room, setRoom ] = useState('')
	const handleOnSubmit = e => {
		const language = room.split('-')[0]
		e.preventDefault()
		LaunchSessionFunction(props, { room, code: templateCode[language] }, '/desk')
	}
	return (
		<div className="JoinLesson Flex CenteredVHContent">
			<div>
				<h2 className="CenteredText WhiteText">Join a new Lesson</h2>
				<form 
					className="Flex Column FormContainer CenteredVHContent"
					onSubmit={handleOnSubmit}
				>
					<label htmlFor="join-lesson">Paste the Lesson Room and hit "Join"</label>
					<input 
						className="Input"
						id="join-lesson"
						type="text"
						value={ room }
						onChange={e => setRoom(e.target.value)}
						required
					/>
					<div id="JoinBtn">
						<input 
							className="NeuBtn CTA"
							type="submit"
							value="Join"
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default JoinLessonSection
