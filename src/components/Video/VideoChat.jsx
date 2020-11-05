import React, { useState, useEffect, useRef} from 'react'
import { getCamera, answerCalls} from './Logic'

const Video = props => {
	const userVideo = useRef()
	// const classmateVideo = useRef()
	const [ stream, setStream ] = useState()
	// const [ call, setCall ] = useState(null)

	useEffect(()=> {
		getCamera(userVideo, setStream)
		console.log(props)
	}, [])

	return (
		<div>
			<div style={{height:'500px', width:'500px'}} className="Video">
				<video style={{height:'100%', width:'100%'}} playsInline muted ref={userVideo} autoPlay/>
			</div>
		</div>
	)
}

export default Video
