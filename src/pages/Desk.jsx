import React, { useState, useEffect, useRef } from 'react'
import Editor from '../components/Editor/Editor'
import Minibrowser from '../components/Minibrowser/Minibrowser'
import { getCamera, streamCall } from '../components/Video/VideoLogic'
import { libraries } from '../data/libraries'
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
	callPeer 
} from '../socket/socket'
import Peer from 'peerjs'
import { withUser } from '../components/Auth/withUser'

const Video = ({ peerId, call, stream }) => {
	const classmateVideo = useRef()

	useEffect(() => {
		// console.log('video is here')
		// if (call.provider.id !== peerId){
		// 	console.log('I answer')
		// 	call.answer(stream)
		// 	console.log('answer', stream)
		// 	streamCall( call, classmateVideo)
		// }
		// if (call.provider.id === peerId){
		// 	console.log('I wait for an answer')
		// 	streamCall( call, classmateVideo)
		// }
		if(call.answer) call.answer(stream)
		streamCall( call, classmateVideo )
	}, [])

	return(
		<div className="Video SmallV">
          <video playsInline muted ref={classmateVideo} autoPlay/>
			<p>{call.peer}</p>
        </div>
	)
}

const Desk = props => {
	
	const [ html, setHtml ] = useState('<h1 id="test">test</h1>')
	const [ css, setCss ] = useState('body { background-color : whitesmoke; height: 500px; width: 500px; color : #333; }')
	const [ js, setJs ] = useState('document.getElementById("test").innerHTML += " test"')

	const [ isHtmlTabOpen, setIsHtmlTabOpen ] = useState(true)
	const [ isCssTabOpen, setIsCssTabOpen ] = useState(false)
	const [ isJsTabOpen, setIsJsTabOpen ] = useState(false)

	const [ library, setLibrary ] = useState('react')
	const [ srcDoc, setSrcDoc ] = useState('')
	const [ miniBrowserCounter, setMinibrowserCounter ] = useState(0)
	const [ lessonName, setLessonName ] = useState('test')

	// video
	const userVideo = useRef()
	// const classmateVideo = useRef()
	const [ stream, setStream ] = useState()
	
	//peer
	const [ myPeer, setMyPeer] = useState('')
	const [ peerId, setPeerId ] = useState(null)
	const [ calls, setCalls ] = useState([])

	const [ socketConnected, setSocketConnected ] = useState(false)

	const [ room, setRoom ] = useState('room')
	
	const userName = props.context.user.email.split('@')[0]

	const handleChange = (value, lang) => {
		switch(lang) {
			case 'xml':
			  setHtml(value)
			  sendCode(room, {
				html:value,
				css, 
				js
			}, userName)
			  break
			case 'css':
			  setCss(value)
			  sendCode(room, {
				html,
				css:value, 
				js
			}, userName)
			  break
			case 'javascript':
				setJs(value)
				sendCode(room, {
					html,
					css, 
					js:value
				}, userName)
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
			</head>
			<body>
				${ html }
			</body>
			<script type="text/babel">
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
			changeTab( room, true, false, false )	
			break
		  case 'cssTab':
			setIsCssTabOpen(true)
			changeTab( room, false, true, false )	
			break;
		  case 'jsTab':
			setIsJsTabOpen(true)
			changeTab( room, false, false, true )	
			break;
		  default:
			setIsHtmlTabOpen(true)
		}
	}

	const handleSendRunMinibrowser = () => {
		sendRunMinibrowser( room, userName )
	} 

	//when component mounts initialize socket and start listening to code changing, browser run, and tab change 
	useEffect(() => {
		initiateSocket(room, userName)
		getCode(code => {
			setHtml(code.html)
			setCss(code.css)
			setJs(code.js)
		})
		getIsConnected(setSocketConnected)
		getRunMinibrowser(setMinibrowserCounter, miniBrowserCounter)
		getActiveTab(setIsHtmlTabOpen, setIsCssTabOpen, setIsJsTabOpen)

		getCamera(userVideo, setStream)
		
		const myPeer = new Peer(undefined, {
			secure: true, 
			host: 'peerjs-server-codeschool.herokuapp.com', 
			port: 443
    	})
		setMyPeer(myPeer)
		myPeer.on('open', id => {
			console.log('peer id', id)
			setPeerId(id)	
		})
		myPeer.on('error', id => {
			console.log('error', id)	
		})

		return disconnectSocket
	}, [])

	//run minibrowser when triggered
	useEffect(handleRunMinibrowser, [ miniBrowserCounter ])

	//start peer connection
	useEffect(() => {
		if (peerId && stream) {
			callPeer(stream, myPeer, calls, setCalls)
			console.log('sending call request')
			sendCallMeRequest(peerId, room) 
			myPeer.on('call', call => setCalls(prevCalls => [ ...prevCalls, call ]))
		}
	}, [ peerId, stream ])

	console.log('calls', calls) 

	return (
		<div>
			<div className="panel editors">
				<div className="tab">
					<button 
					name="htmlTab" 
					className={`Tablinks ${ isHtmlTabOpen ? 'open' : '' }`} 
					onClick={openTab}>index.html</button>
					<button 
					name="cssTab" 
					className={`Tablinks ${ isCssTabOpen ? 'open' : '' }`} 
					onClick={openTab}>styles.css</button>
					<button 
					name="jsTab" 
					className={`Tablinks ${ isJsTabOpen ? 'open' : '' }`} 
					onClick={openTab}>app.js</button>
					{/* <button 
					id="saveBtn" 
					onClick= {handleSave}
					className="Tablinks Right"
					>
					<img width="20px" src={saveIcon} alt="floppy disk icon"/>
					</button> */}
				</div>
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
					language="javascript"
					value={ js }
					onChange={ handleChange }
					open={ isJsTabOpen }
				/>
			</div>
			<div className="panel minibrowser">
				<Minibrowser 
					srcDoc={ srcDoc }
					lessonName={ lessonName }
					handleRunMinibrowser={ handleRunMinibrowser }
					sendRunMinibrowser={ handleSendRunMinibrowser }
				/>
			</div>
			<div className="Video">
				<video playsInline muted ref={userVideo} autoPlay/>
				<h2>{peerId}</h2>
			</div>
			{
				calls.map((call, index) => <Video key={index} call={call} stream={stream} peerId={peerId}/>)
			}
		</div>
	)
}

export default withUser(Desk)
