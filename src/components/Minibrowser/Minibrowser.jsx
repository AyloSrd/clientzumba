import React from 'react'

const Minibrowser = props => {
	const { srcDoc, lessonName, handleRunMinibrowser } = props
	console.log(srcDoc)
	return (
		<div>
			<div className="lessonName">
				<button onClick={ handleRunMinibrowser }>Run</button>
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
