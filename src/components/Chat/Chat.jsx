import React, { useState, useRef, useEffect } from 'react'
import Message from './Message'
import './Chat.css'

const Chat = ( { chat, setChat, room, sendMsg, userId, userName, role } ) => {

	const [ text, setText ] = useState('')
	const [ textType, setTextType ] = useState('plainText')
	const scrollRef = useRef()

	const handleChange = e => {
		switch (e.target.type) {
			case 'checkbox' :
				setTextType( e.target.checked ? 'codeText' : 'plainText')
				break
			case 'text' :
				setText( e.target.value )
				break
			default :
				return
		}
	}

	const handleSubmit = e => {
		e.preventDefault()
		setChat(prevChat => [...prevChat, { userId, userName, role, text, textType }])
		sendMsg(room, { userId, userName, role, text, textType } )
		setText('')
		setTextType('plainText')
	}

	useEffect(() => {
		if (chat[0] && chat[0].userId === userId) scrollRef.current.scrollIntoView({behavior:'smooth'})
	}, [ chat ])

	return (
		<div 
			id="Chat"
		>
			<div 
				id="ChatInput"
				className="Flex AlignFlexStartContent" 
			>
				<form 
					onSubmit={ handleSubmit }
					className="Flex SpaceBetween "
				>
					<input 
						className="Input"
						type="text" 
						id="textInput"
						value ={ text }
						required 
						onChange={ handleChange }
					/>
					<div className="Flex CenteredVHContent">
						<input 
							type="checkbox" 
							name="type" 
							checked={textType === 'codeText'}
							onChange={ handleChange }
						/>
						<label
							htmlFor="type"
						>{'< >'}</label>
					</div>
					<input 
						type="submit" 
						value="send"
						className={ `NeuBtn ${text.length > 0 ? 'CTA' : ''}` }
						style = { role === 'student' ? { marginRight:'var(--large-unit)' } : { marginRight:'var(--little-unit)' } }
					/>
				</form>
			</div>
			<div className="messages">
				<div className="Flex ColumnReverse innerMessages">
					{
						chat.length !== 0 && chat.map( msg => <Message 
								msg={msg}
								alignment={msg.userId === userId ? 'sent' : 'received'}
							/>
						)
					}
					<div ref={scrollRef}></div>
				</div>
			</div>
		</div>
	)
}

export default Chat
