import React from 'react'
import './Message.css'

const Message = ({ msg, alignment }) => {
	const { userName, role, text, textType } = msg
	console.log('msg', userName, role, text, textType)
	return (
		<article className={`Message ${alignment}`}>
			<h3>{`${userName ? userName : 'someone'}${role === 'teacher' ? ' - thecher' : ''}`}</h3>
			<p className={textType}>{text}</p>
		</article>
	)
}

export default Message
