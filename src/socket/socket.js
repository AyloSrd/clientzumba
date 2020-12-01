import io from 'socket.io-client'

let socket

export const initiateSocket = (room, userId, role) => {
	socket = io(process.env.REACT_APP_BACKEND_URL)
	if (socket && room) socket.emit('join', room, userId, role)
}

export const getTeachersPeerId = setTeacher => {
	if (!socket) return(true)
	socket.on('teacher is', teachersPeerId => setTeacher(teachersPeerId))
}

export const getIsConnected = setSocketConnected => {
	socket.on('connect', () => {
		setSocketConnected(socket.connected)
	})
} 

export const disconnectSocket = () => {
  console.log('Disconnecting socket...')
  if(socket) socket.disconnect()
}

export const sendCode = (room, code, userId) => {
	if (socket) socket.emit('coding', code, room, userId)
}

export const getCode = updateCode => {
	if (!socket) return(true)
  	socket.on('sendingCode', ( code, userName ) => {
		console.log(`Websocket event received (${code})! from ${userName}`)
		updateCode(code)
	})
}

export const sendMsg = (room, msg) => {
	if (socket) socket.emit('chat', room, msg )
}

export const getMsg = setChat => {
	if (!socket) return(true)
  	socket.on('chat', msg => {
		setChat(prevChat => [...prevChat, msg])
	})
}

export const getRunMinibrowser = ( setMinibrowserCounter, miniBrowserCounter ) => {
	if(socket){
		socket.on('runMinibrowser', userName => {
			console.log(`${userName} just run de the minibrowser`)
			setMinibrowserCounter(miniBrowserCounter + 1)
		})
	}
} 

export const sendRunMinibrowser = ( room, userName) => {
	if (socket) socket.emit('runMinibrowser', room, userName)
}

export const changeTab = (room, html, css, js) => {
	if (socket) socket.emit('changeTab', room, html, css, js)
}

export const getActiveTab = (isHtmlTabOpen, isCssTabOpen, isJsTabOpen) => {
	if (socket) {
		socket.on('changeTab', (html, css, js) => {
			isHtmlTabOpen(html)
			isCssTabOpen(css)
			isJsTabOpen(js)
		})
	}
}

export const sendCallMeRequest = (peerId, room) => {
	if (socket) socket.emit('callMe', peerId, room)
}

export const callPeer = ( stream, myPeer, setCalls ) => {
	if (socket) {
		socket.on('callMe', peerId => {
			const call = myPeer.call(peerId, stream)
			console.log('calling', peerId, call)
			setCalls(prevCalls => [ ...prevCalls, call ])
		})
	}
}

export const removeClosedCall = setCalls => {
	if (socket) {
		socket.on('I quit', peerId => {
			setCalls(prevCalls => prevCalls.filter(c => c.peer !== peerId))
		})
	}
}