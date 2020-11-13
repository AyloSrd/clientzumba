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
		<div className="Minibrowser Flex Column SpaceBetween">
			<div 
				className="Flex SpaceBetween"
				id="BrowserHeader"
			>
				<p>Lesson : { lessonName }</p>
				<button 
				className='NeuBtn'
				onClick={ handleClick }
				id="RunBtn"
				>
					<div className='iconContainer'>
						<div 
							className='Run'>
						</div>
					</div>
				</button>
			</div>
			<div 
				className="Card"
				id="IframeContainer"
			>			
				<iframe 
					srcDoc={ srcDoc }
					title="output"
					sandbox="allow-scripts"
					frameBorder="0"
				/>
			</div>
		</div>
	)
}

export default Minibrowser
