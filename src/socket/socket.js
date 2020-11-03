import io from 'socket.io-client'

let socket

export const initiateSocket = (room, socketId) => {
	socket = io(process.env.REACT_APP_BACKEND_URL)
	console.log('connecting socket')
	if (socket && room) socket.emit('join', room, socketId)
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...')
  if(socket) socket.disconnect()
}

export const sendCode = (room, code, socketId) => {
	if (socket) socket.emit('coding', code, room, socketId)
}

export const getCode = updateCode => {
	if (!socket) return(true)
  	socket.on('sendingCode', ( code, socketId ) => {
		console.log(`Websocket event received (${code})! from ${socketId}`)
		updateCode(code)
	})
}

export const getRunMinibrowser = ( setMinibrowserCounter, miniBrowserCounter ) => {
	if(socket){
		socket.on('runMinibrowser', socketId => {
			console.log(`${socketId} just run de the minibrowser`)
			setMinibrowserCounter(miniBrowserCounter + 1)
		})
	}
} 

export const sendRunMinibrowser = ( room, socketId) => {
	if (socket) socket.emit('runMinibrowser', room, socketId)
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