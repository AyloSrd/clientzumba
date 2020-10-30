import io from 'socket.io-client'

let socket

export const initiateSocket = (room, socketId) => {
	socket = io(process.env.REACT_APP_BACKEND_URL)
	console.log('connecting socket')
	if (socket && room) socket.emit('join', room, socketId)
}