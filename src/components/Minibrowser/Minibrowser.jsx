import React from 'react'
import '../../styles/Minibrowser.css'

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
		<div className="Minibrowser">
			<div className="lessonName">
				<button onClick={ handleClick }>Run</button>
				<p>Lesson : { lessonName }</p>
			</div>
			<iframe 
				srcDoc={ srcDoc }
				title="output"
				sandbox="allow-scripts"
				frameBorder="0"
				width="100%"
				height="100%"
				style={{
					maxHeight: '100%',
					maxWidth: '100%'
				}}
            />
		</div>
	)
}

export default Minibrowser
