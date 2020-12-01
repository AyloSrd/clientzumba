import React from 'react'

const Message = ({ msg, alignment }) => {
	const { userName, role, text, textType } = msg
	console.log('msg', userName, role, text, textType)
	return (
		<article className={alignment}>
			<h3>{userName ? userName : 'someone'}</h3>
			<p className={textType}>{text}</p>
		</article>
	)
}

export default Message
