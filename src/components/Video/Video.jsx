import React, { useEffect, useRef } from 'react'
import { streamCall } from './VideoLogic'

const Video = ({ call, stream }) => {
	const classmateVideo = useRef()

	useEffect(() => {
		call.answer(stream)
		streamCall( call, classmateVideo)
		return () => call.close()
	}, [])


	return(
		<div className="Video SmallV">
          <video playsInline ref={classmateVideo} autoPlay/>
			<p>{call.peer}</p>
        </div>
	)
}

export default Video