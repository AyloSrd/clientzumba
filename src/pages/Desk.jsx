import React, { useState, useEffect } from 'react'
import Editor from '../components/Editor/Editor'
import Minibrowser from '../components/Minibrowser/Minibrowser'
import { libraries } from '../data/libraries'
import { 
	initiateSocket, 
	disconnectSocket, 
	sendCode, 
	getCode, 
	getRunMinibrowser, 
	sendRunMinibrowser, 
	changeTab, 
	getActiveTab 
} from '../socket/socket'
import { withUser } from '../components/Auth/withUser'

const Desk = props => {
	
	const [ html, setHtml ] = useState('<h1 id="test">test</h1>')
	const [ css, setCss ] = useState('body { background-color : whitesmoke; height: 500px; width: 500px; color : #333; }')
	const [ js, setJs ] = useState('document.getElementById("test").innerHTML += " test"')

	const [ isHtmlTabOpen, setIsHtmlTabOpen ] = useState(true)
	const [ isCssTabOpen, setIsCssTabOpen ] = useState(false)
	const [ isJsTabOpen, setIsJsTabOpen ] = useState(false)

	const [ library, setLibrary ] = useState('react')

	const [ srcDoc, setSrcDoc ] = useState('')

	const [ lessonName, setLessonName ] = useState('test')

	const [ room, setRoom ] = useState('room')

	const [ peerId, setPeerId ] = useState('peer')

	const [ miniBrowserCounter, setMinibrowserCounter ] = useState(0)

	const handleChange = (value, lang) => {
		switch(lang) {
			case 'xml':
			  setHtml(value)
			  sendCode(room, {
				html:value,
				css, 
				js
			}, peerId)
			  break
			case 'css':
			  setCss(value)
			  sendCode(room, {
				html,
				css:value, 
				js
			}, peerId)
			  break
			case 'javascript':
				setJs(value)
				sendCode(room, {
					html,
					css, 
					js:value
				}, peerId)
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
		console.log(compiledSrc)
		setSrcDoc(compiledSrc)
	}

	const openTab = e => {
		console.log('changing tab on click')
		setIsHtmlTabOpen(false)
		setIsCssTabOpen(false)
		setIsJsTabOpen(false)
	
		switch (e.target.name) {
		  case 'htmlTab':
			setIsHtmlTabOpen(true)
			break
		  case 'cssTab':
			setIsCssTabOpen(true)
			break;
		  case 'jsTab':
			setIsJsTabOpen(true)
			break;
		  default:
			setIsHtmlTabOpen(true)
		}
		
	}

	const handleSendRunMinibrowser = () => {
		sendRunMinibrowser( room, peerId )
	} 

	
	useEffect(() => {
		initiateSocket(room, peerId)
		getCode(code => {
			setHtml(code.html)
			setCss(code.css)
			setJs(code.js)
		})
		getRunMinibrowser(setMinibrowserCounter, miniBrowserCounter)
		getActiveTab(setIsHtmlTabOpen, setIsCssTabOpen, setIsJsTabOpen)

		return disconnectSocket
	}, [])


	//run minibrowser when triggered
	useEffect(handleRunMinibrowser, [ miniBrowserCounter ])

	useEffect(() => {
		console.log('changing tab')
		changeTab( room, isHtmlTabOpen, isCssTabOpen, isJsTabOpen )
	  }, [ isHtmlTabOpen, isCssTabOpen, isJsTabOpen ])

	// console.log(props)
	  console.log('html tab', isHtmlTabOpen, 'css tab', isCssTabOpen, 'sj tab', isJsTabOpen)

	return (
		<div>
			<div className="panel editors">
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
		</div>
	)
}

export default withUser(Desk)
