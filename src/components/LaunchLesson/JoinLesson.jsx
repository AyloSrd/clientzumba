import React,{ useState } from 'react'
import { LaunchSessionFunction } from './LaunchSessionFunction'

const JoinLessonSection = props => {
	const [ room, setRoom ] = useState('')
	const handleOnSubmit = e => {
		e.preventDefault()
		LaunchSessionFunction(props, { room }, '/desk')
	}
	return (
		<div>
			<div>
				<form onSubmit={handleOnSubmit}>
					<input 
						type="text"
						value={room}
						onChange={e => setRoom(e.target.value)}
					/>
					<input 
						type="submit"
						value="Join lesson"
					/>
				</form>
			</div>
		</div>
	)
}

export default JoinLessonSection
