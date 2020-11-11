export const getCamera = (userVideo, setStream, role) => {
	navigator.mediaDevices.getUserMedia({
		video: {
			width: { ideal: 320 },
			height: { ideal: 240 } 
		} ,
		audio: true
	  }).then(stream => {
		  console.log('stream ready')
		if (userVideo.current) {
			userVideo.current.srcObject = stream
			setStream(stream)
		}
	  })  
}

export const streamCall = ( call, classmateVideo ) => {
		call.on('stream', classmateVideoStream => {
		  console.log('receaving streaming', classmateVideoStream)
		  classmateVideo.current.srcObject = classmateVideoStream
		})
}
