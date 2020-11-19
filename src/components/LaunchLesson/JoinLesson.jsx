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
		<div className="Flex CenteredVHContent">
			<div>
				<h2 className="text CenteredText subH2">Join a new Lesson</h2>
				<p className="text CenteredText subH2">Paste the Lesson Room and hit "Join"</p>
				<form 
					className="Flex Column FormContainer CenteredVHContent"
					onSubmit={handleOnSubmit}
				>
					<input 
						className="Input"
						type="text"
						value={ room }
						onChange={e => setRoom(e.target.value)}
						required
					/>
					<div id="JoinBtn">
						<input 
							className="NeuBtn"
							type="submit"
							value="Join lesson"
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default JoinLessonSection
