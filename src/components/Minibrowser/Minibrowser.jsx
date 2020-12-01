import React, { useState, useRef } from 'react'
import Chat from '../Chat/Chat'
import './Minibrowser.css'

const Minibrowser = props => {
	const { 
		srcDoc, 
		lessonName, 
		handleRunMinibrowser, 
		sendRunMinibrowser,
		chat, 
		setChat, 
		room, 
		sendMsg, 
		userId, 
		userName, 
		role 
	} = props

	const [ isChatOpen, setIsChatOpen ] = useState(false)

	const handleRun = () => {
		handleRunMinibrowser()
		sendRunMinibrowser()
	}

	const handleChat = () => {
		console.log('chat handled')
	}
	
	return (
		<div className="Minibrowser Flex Column SpaceBetween">
			<div 
				className="Flex SpaceBetween AlignCenterContent"
				id="BrowserHeader"
			>	
			<div>
				<button 
					className='NeuBtn IconBtn'
					onClick={ handleRun }
					id="RunBtn"
				>
					<div className='iconContainer'>
						<div 
							className='Run'>
						</div>
					</div>
				</button>
				<button 
					className='NeuBtn IconBtn CTA'
					onClick={ () => setIsChatOpen(prevState => !prevState) }
					id="ChatBtn"
				>
					c
				</button>
			</div>
				<div 
					className="Flex AlignCenterContent"
					id="LessonName"
				>
					<p className="text">Lesson :</p>
					<input 
						className="Input"
						readOnly 
						value={ lessonName } 
					/>
				</div>
			</div>
			<div 
				className={!isChatOpen && 'Card'}
				id="IframeContainer"
			>		
				{
					isChatOpen && <Chat 
						chat = {chat}
						setChat = {setChat}
						room = {room}
						sendMsg = {sendMsg}
						userId = {userId}
						userName = {userName}
						role = {role}
					/>
				}
				{
					!isChatOpen && <iframe
						srcDoc={ srcDoc }
						title="output"
						sandbox="allow-scripts"
						frameBorder="0"
					/>
				}
			</div>
		</div>
	)
}

export default Minibrowser
