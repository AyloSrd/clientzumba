import React, { useState, useEffect, useRef } from 'react'
import Editor from '../components/Editor/Editor'
import Video from '../components/Video/Video'
import Minibrowser from '../components/Minibrowser/Minibrowser'
import { getCamera } from '../components/Video/VideoLogic'
import { libraries, fakeConsole } from '../data/libraries'
import { 
	initiateSocket, 
	getIsConnected,
	disconnectSocket, 
	sendCode, 
	getCode, 
	getRunMinibrowser, 
	sendRunMinibrowser, 
	changeTab, 
	getActiveTab,
	sendCallMeRequest,
	callPeer,
	removeClosedCall,
	getTeachersPeerId, 
	getMsg,
	sendMsg
} from '../socket/socket'
import Peer from 'peerjs'
import { withUser } from '../components/Auth/withUser'
import apiHandler from '../api/apiHandler'
import '../styles/Desk.css'

const Desk = props => {
	console.log('props', props)

	const { 
		userName, 
		role, 
		_id : userId
	} = props.context.user

	const { room, code: firstCode } = props.location.state
	const [ library, typeOfSession  ] = room.split('-')
	
	const [ html, setHtml ] = useState(firstCode.html)
	const [ css, setCss ] = useState(firstCode.css)
	const [ js, setJs ] = useState(firstCode.js)

	const [ isPaused, setIsPaused ] = useState(false)
	const [ incomingHtml, setIncomingHtml ] = useState(firstCode.html)
	const [ incomingCss, setIncomingCss ] = useState(firstCode.css)
	const [ incomingJs, setIncomingJs ] = useState(firstCode.js)

	const [ isIncomingHtmlTabOpen, setIsIncomingHtmlTabOpen ] = useState(true)
	const [ isIncomingCssTabOpen, setIsIncomingCssTabOpen ] = useState(false)
	const [ isIncomingJsTabOpen, setIsIncomingJsTabOpen ] = useState(false)
	
	const [ isHtmlTabOpen, setIsHtmlTabOpen ] = useState(true)
	const [ isCssTabOpen, setIsCssTabOpen ] = useState(false)
	const [ isJsTabOpen, setIsJsTabOpen ] = useState(false)

	const [ srcDoc, setSrcDoc ] = useState('')
	const [ miniBrowserCounter, setMinibrowserCounter ] = useState(0)
	//chat
	const [ chat, setChat] = useState([])

	// video
	const userVideo = useRef()
	const [ stream, setStream ] = useState()
	const [ teacher, setTeacher] = useState()
	
	//peer
	const [ myPeer, setMyPeer] = useState('')
	const [ peerId, setPeerId ] = useState(null)
	const [ calls, setCalls ] = useState([])

	const [ socketConnected, setSocketConnected ] = useState(false)

	const handleChange = (value, lang) => {
		switch(lang) {
			case 'xml':
			  setHtml(value)
			  role === 'teacher' && sendCode(room, {
				html:value,
				css, 
				js
			}, userId)
			  break
			case 'css':
			  setCss(value)
			  role === 'teacher' && sendCode(room, {
				html,
				css:value, 
				js
			}, userId)
			  break
			case 'javascript':
				setJs(value)
				role === 'teacher' && sendCode(room, {
					html,
					css, 
					js:value
				}, userId)
				break
				case 'jsx':
					setJs(value)
					role === 'teacher' && sendCode(room, {
						html,
						css, 
						js:value
					}, userId)
					break
			default:
			  return
		  }
	}

	const handleRunMinibrowser = () => {
		const libraryTag = libraries[library]
		
		const compiledSrc = `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<title>HTML Document</title>
				${ libraryTag }
				<style>
				${ css }
				</style>
				${fakeConsole.css}
			</head>
			<body>
				${ html }
				${fakeConsole.html}
			</body>
			${fakeConsole.js}
			<script ${ library === 'react' ? 'type=text/babel' : ''}>
				${ js }
			</script>
			</html>
		`
		setSrcDoc(compiledSrc)
	}

	const openTab = e => {
		
		setIsHtmlTabOpen(false)
		setIsCssTabOpen(false)
		setIsJsTabOpen(false)
	
		switch (e.target.name) {
		  case 'htmlTab':
			setIsHtmlTabOpen(true)
			role === 'teacher' && changeTab( room, true, false, false )	
			break
		  case 'cssTab':
			setIsCssTabOpen(true)
			role === 'teacher' && changeTab( room, false, true, false )	
			break;
		  case 'jsTab':
			setIsJsTabOpen(true)
			role === 'teacher' && changeTab( room, false, false, true )	
			break;
		  default:
			setIsHtmlTabOpen(true)
		}
	}

	const handleSendRunMinibrowser = () => {
		role === 'teacher' && sendRunMinibrowser( room, userName )
	} 

	const handleSave = () => {
		const note = {
			lesson: room,
			student: userId,
			html,
			css,
			js,
			library
		}

		apiHandler
			.createNote(note)
			.then( data => console.log(data))
			.catch(err => console.error(err))
	}

	//when component mounts initialize socket and start listening to code changing, chat messages, browser run, and tab change 
	useEffect(() => {
		initiateSocket(room, userId, role)
		getCode(code => {
			setIncomingHtml(code.html)
			setIncomingCss(code.css)
			setIncomingJs(code.js)
		})
		getIsConnected(setSocketConnected)
		getTeachersPeerId(setTeacher)
		getRunMinibrowser(setMinibrowserCounter, miniBrowserCounter)
		getActiveTab(setIsIncomingHtmlTabOpen, setIsIncomingCssTabOpen, setIsIncomingJsTabOpen)

		getMsg(setChat)

		getCamera(userVideo, setStream, role)
		
		const myPeer = new Peer(undefined, {
			secure: true, 
			host: process.env.REACT_APP_PEER_SERVER_URL, 
			port: 443
    	})
		setMyPeer(myPeer)
		myPeer.on('open', id => {
			setPeerId(id)	
		})
		myPeer.on('error', id => {
			console.log('error', id)	
		})

		removeClosedCall(setCalls)

		return disconnectSocket

	}, [])
	
	useEffect(() => {
		if (!isPaused) {
		  setHtml(incomingHtml)
		  setCss(incomingCss)
		  setJs(incomingJs)
		}
	  }, [ incomingHtml, incomingCss, incomingJs ])

	useEffect(() => {
		if (!isPaused) {
			setIsHtmlTabOpen(isIncomingHtmlTabOpen)
			setIsCssTabOpen(isIncomingCssTabOpen)
			setIsJsTabOpen(isIncomingJsTabOpen)
		}
	}, [ isIncomingHtmlTabOpen, isIncomingCssTabOpen, isIncomingJsTabOpen ])
	
	  useEffect(() => {
		if (!isPaused) {
		  setHtml(incomingHtml)
		  setCss(incomingCss)
		  setJs(incomingJs)
		  setIsHtmlTabOpen(isIncomingHtmlTabOpen)
		  setIsCssTabOpen(isIncomingCssTabOpen)
		  setIsJsTabOpen(isIncomingJsTabOpen)
		}
	  }, [ isPaused ])

	//run minibrowser when triggered
	useEffect(handleRunMinibrowser, [ miniBrowserCounter ])

	//start peer connection
	useEffect(() => {
		if (peerId && stream) {
			if(typeOfSession === 'lesson' || role === 'teacher') callPeer(stream, myPeer, setCalls)
			sendCallMeRequest(peerId, room) 
			myPeer.on('call', call => setCalls(prevCalls => [ ...prevCalls, call ]))
		}
	}, [ peerId, stream ])

	return (
		<>
			<div 
				id="DeskContainer"
				className="BgPrimary"
			>
				<div className="panel">
					<div 
						className="Flex AlignCenterContent SpaceBetween BgPrimary"
						id="Tab"	
					>
						<div className="AlignCenterContent Flex">
							<button 
								name="htmlTab" 
								className={`NeuBtn ${ isHtmlTabOpen ? 'Down' : '' }`} 
								onClick={openTab}
							>
								html
							</button>
							<button 
								name="cssTab" 
								className={`NeuBtn ${ isCssTabOpen ? 'Down' : '' }`} 
								onClick={openTab}>css</button>
							<button 
								name="jsTab" 
								className={`NeuBtn ${ isJsTabOpen ? 'Down' : '' }`} 
								onClick={openTab}
							>
								js
							</button>
						</div>
						<div className="Flex">
							{
								role ==='student' && (
									<>
										<button 
											onClick= {
											() =>{
												setIsPaused(prevPaused => !prevPaused)
											}}
											className={`NeuBtn ${isPaused ? 'Down' : ''} IconBtn`}
										>
											<div className='iconContainer'>
												<div 
													className={
													isPaused 
													? 'Play' 
													: 'Pause'
													}>
												</div>
											</div>
										</button>
										<button 
											id="SaveBtn" 
											onClick= {handleSave}
											className="NeuBtn IconBtn"
										>
											<div className='iconContainer'>
												<div 
													className='Save'>
												</div>
											</div>
										</button>
								</>
								)
							}
						</div>
					</div>
					<div className="Flex Column Card BgPrimary EditorsWrapper">
						<Editor 
							language="xml"
							value={ html }
							onChange={ handleChange }
							open={ isHtmlTabOpen }
						/>
						<Editor 
							language="css"
							value={ css }
							onChange={ handleChange }
							open={ isCssTabOpen }
						/>
						<Editor 
							language={ library === 'react' ? 'jsx' : 'javascript' }
							value={ js }
							onChange={ handleChange }
							open={ isJsTabOpen }
						/>
					</div>
				</div>
				<div className="panel">
					<Minibrowser 
						srcDoc={ srcDoc }
						lessonName={ room }
						handleRunMinibrowser={ handleRunMinibrowser }
						sendRunMinibrowser={ handleSendRunMinibrowser }
						chat = {chat}
						setChat = {setChat}
						room = {room}
						sendMsg = {sendMsg}
						userId = {userId}
						userName = {userName}
						role = {role}
					/>
				</div>
				<div id="VideoContainer">
					{
						(typeOfSession !== 'session' || role === 'teacher') && (
							<div className={`Video ${role === 'teacher' ? 'BigVideo' : ''}`}>
								<video playsInline controls muted ref={userVideo} autoPlay/>
								<h2>{peerId}</h2>
							</div>
						)
					}
					{
						calls.map(call => <Video key={call.peer} call={call} stream={stream} teacher={teacher} />)
					}
				</div>
			</div>
		</>
	)
}

export default withUser(Desk)
