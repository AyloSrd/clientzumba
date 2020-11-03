import React from 'react'

const Minibrowser = props => {
	const { 
		srcDoc, 
		lessonName, 
		handleRunMinibrowser, 
		sendRunMinibrowser 
	} = props
	
	const handleClick = () => {
		handleRunMinibrowser()
		sendRunMinibrowser()
	}
	
	return (
		<div>
			<div className="lessonName">
				<button onClick={ handleClick }>Run</button>
				<p>Lesson : { lessonName }</p>
			</div>
			<iframe 
				srcDoc={ srcDoc }
				title="output"
				sandbox="allow-scripts"
				frameBorder="0"
				width="100vw"
				height="100vh"
            />
		</div>
	)
}

export default Minibrowser
