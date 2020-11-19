import React, { useEffect, useRef } from 'react'
import { streamCall } from './VideoLogic'

const Video = ({ call, stream, teacher }) => {
	const classmateVideo = useRef()

	useEffect(() => {
		call.answer(stream)
		streamCall( call, classmateVideo)
		return () => call.close()
	}, [])

	return(
		<div className={`Video ${call.peer === teacher && 'BigVideo'}`}>
          <video playsInline ref={classmateVideo} autoPlay/>
        </div>
	)
}

export default Video