import React, { useState } from 'react'
import Editor from '../components/Editor/Editor'
import Minibrowser from '../components/Minibrowser/Minibrowser'

const Desk = () => {
	
	const [ html, setHtml ] = useState('<h1 id="test">test</h1>')
	const [ css, setCss ] = useState('body { background-color : whitesmoke; height: 500px; width: 500px; color : #333; }')
	const [ js, setJs ] = useState('document.getElementById("test").innerHTML += " test"')

	const [ srcDoc, setSrcDoc ] = useState('')

	const [ lessonName, setLessonName ] = useState('test')

	const handleRunMinibrowser = () => {
		const library = `
			<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
			<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
			<script src="https://cdn.jsdelivr.net/npm/dataformsjs@4.8.0/js/react/jsxLoader.min.js"></script>
		`
		const compiledSrc = `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<title>HTML Document</title>
				${ library }
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
