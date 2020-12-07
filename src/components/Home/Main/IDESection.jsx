import React, { useState, useEffect } from 'react'
import Editor from '../../Editor/Editor'
import { libraries, templateCode } from '../../../data/libraries'
import './IDESection.css'
import '../../Editor/Editor.css'
import '../../Minibrowser/Minibrowser.css'

const tryMeCode = `//Play with the code below

const App = () => {

	const [ count, setCount ] = React.useState(3)

	return(
		<div>
			<h1>This app is {count} times coleer!</h1>
			<button
			onClick={() => setCount(prev => prev + 1)}
			>
			<h1>Try me!</h1>
			</button>
		</div>
	)
}
		
ReactDOM.render(
	<App />,
	document.getElementById('root')
) `

const IDESection = () => {
	const [ js, setJs] = useState(tryMeCode)
	const [ srcDoc, setSrcDoc ] = useState('')

	const handleChange = value => {
		setJs(value)
	}

	const handleRunMinibrowser = () => {
		const libraryTag = libraries['react']
		
		const compiledSrc = `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<title>HTML Document</title>
				${ libraryTag }
			</head>
			<body>
				${templateCode.react.html}
			</body>
			<script type="text/babel">
				${ js }
			</script>
			</html>
		`
		setSrcDoc(compiledSrc)
	}

	useEffect(() => {
		handleRunMinibrowser()
	}, [])

	return (
		<div className="IDESection">
			<div className="MainPanel">
				<div className="Flex AlignCenterContent MainPanelHeader">
					<button className="NeuBtn">app.jsx</button>
				</div>
				<div className="Flex Column Card BgPrimary EditorsWrapper">
					<Editor 
						language="jsx"
						value={ js }
						onChange={ handleChange }
						open={ true }
					/>
				</div>
			</div>
			<div className="MainPanel">
				<div className="Flex AlignCenterContent MainPanelHeader">
					<button 
						className='NeuBtn IconBtn RunBtn'
						onClick={ handleRunMinibrowser }
					>
						<div className='iconContainer'>
							<div 
								className='Run'>
							</div>
						</div>
					</button>
				</div>
				<div id="HomePageMiniBrowser">
					<iframe
							srcDoc={ srcDoc }
							title="output"
							sandbox="allow-scripts"
							frameBorder="0"
						/>	
				</div>
			</div>		
		</div>
	)
}

export default IDESection
