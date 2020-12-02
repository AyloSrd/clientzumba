import React, { useState } from 'react'
import Message from './Message'
import './Chat.css'

const Chat = ( { chat, setChat, room, sendMsg, userId, userName, role } ) => {

	const [ text, setText ] = useState('')
	const [ textType, setTextType ] = useState('plainText')

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

	return (
		<div 
			id="Chat"
		>
			<div className="messages InsetCard">
				<div className="Flex Column innerMessages">
					{
						chat.length !== 0 && chat.map( msg => <Message 
								msg={msg}
								alignment={msg.userId === userId ? 'sent' : 'received'}
							/>
						)
					}
				</div>
			</div>
			<div 
				id="ChatInput"
				className="Flex AlignFlexEndContent" 
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
		</div>
	)
}

export default Chat
