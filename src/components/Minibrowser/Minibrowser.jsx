import React, { useState, useEffect } from 'react'
import Chat from '../Chat/Chat'
import './Minibrowser.css'
import '../Tables/NotesTable.css'

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
	const [ unreadMessage, setUnreadMessage ] = useState(false)

	const handleRun = () => {
		handleRunMinibrowser()
		sendRunMinibrowser()
	}

	const handleChat = () => {
		setIsChatOpen(prevState => !prevState)
	}

	useEffect(() => {
		if(isChatOpen) setUnreadMessage(false)
		if(!isChatOpen && chat.length >= 1) setUnreadMessage(true)
	}, [ chat ])
	
	useEffect(() => {
		if(isChatOpen) setUnreadMessage(false)
	}, [ isChatOpen ])

	return (
		<div className="Minibrowser Flex Column SpaceBetween">
			<div 
				className="Flex SpaceBetween AlignCenterContent"
				id="BrowserHeader"
			>	
			<div id="MiniBrowserBtns" className="Flex">
				<button 
					className='NeuBtn IconBtn .RunBtn'
					onClick={ handleRun }
				>
					<div className='iconContainer'>
						<div 
							className='Run'>
						</div>
					</div>
				</button>
				<button 
					className={`NeuBtn IconBtn ${unreadMessage && 'CTA'}`}
					onClick={ handleChat }
					id="ChatBtn"
				>
					<div className={ isChatOpen ? 'Code' : 'Chat' }></div>
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
