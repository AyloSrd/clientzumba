import React, { useState, useEffect, useRef} from 'react'
import { getCamera, answerCalls} from './VideoLogic'

const Video = props => {
	const userVideo = useRef()
	const classmateVideo = useRef()
	const [ stream, setStream ] = useState()
	const [ call, setCall ] = useState(null)

	useEffect(()=> {
	}, [])

	return (
		<div>
			
		</div>
	)
}

export default Video
