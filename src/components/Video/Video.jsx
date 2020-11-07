import React, { useEffect, useRef } from 'react'
import { streamCall } from './VideoLogic'

const Video = ({ call, stream }) => {
	const classmateVideo = useRef()

	useEffect(() => {
		if(call.answer) call.answer(stream)
		streamCall( call, classmateVideo )
	}, [])

	return(
		<div className="Video SmallV">
          <video playsInline muted ref={classmateVideo} autoPlay/>
			<p>{call.peer}</p>
        </div>
	)
}

export default Video