import React, { useState, useEffect } from 'react'
import Editor from '../components/Editor/Editor'
import Minibrowser from '../components/Minibrowser/Minibrowser'
import { libraries } from '../data/libraries'
import { initiateSocket } from '../socket/socket'

const Desk = () => {
	
	const [ html, setHtml ] = useState('<h1 id="test">test</h1>')
	const [ css, setCss ] = useState('body { background-color : whitesmoke; height: 500px; width: 500px; color : #333; }')
	const [ js, setJs ] = useState('document.getElementById("test").innerHTML += " test"')
	const [ library, setLibrary ] = useState('react')

	const [ srcDoc, setSrcDoc ] = useState('')

	const [ lessonName, setLessonName ] = useState('test')

	const [ room, setRoom ] = useState('room')

	const [ peerId, setPeerId ] = useState('peer')

	useEffect(() => {
		initiateSocket(room, peerId)
	}, [])

	const handleRunMinibrowser = () => {
		const libraryTag = libraries[library]
		console.log(libraryTag);
		
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

	return (
		<div>
			<div className="panel editors">
				<Editor 
					language="xml"
					value={ html }
					onChange={ setHtml }
				/>
				<Editor 
					language="css"
					value={ css }
					onChange={ setCss }
				/>
				<Editor 
					language="javascript"
					value={ js }
					onChange={ setJs }
				/>
			</div>
			<div className="panel minibrowser">
				<Minibrowser 
					srcDoc={ srcDoc }
					lessonName={ lessonName }
					handleRunMinibrowser={ handleRunMinibrowser }
				/>
			</div>
		</div>
	)
}

export default Desk
