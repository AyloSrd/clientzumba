import React, { useState, useEffect } from 'react'
import Editor from '../../Editor/Editor'
import './CollaborativeEditorSection.css'
import '../../../styles/Desk.css'

const collabEditorCode = `//Write on the teacher's editor

//Then hit the 'pause' button and write on both student's and teacher's editor

//Finally press 'play' and try typing on both and see what happens!`


export const CollaborativeEditorSection = () => {

	const [ teacherJs, setTeacherJs] = useState(collabEditorCode)
	const [ incomingJs, setIncomingJs] = useState(collabEditorCode)
	const [ studentJs, setStudentJs] = useState(collabEditorCode)
	const [ isPaused, setIsPaused ] = useState(false)

	const handleTeachersChange = value => setTeacherJs(value)
	const handleStudentsChange = value => setStudentJs(value)

	useEffect(() => {
		setIncomingJs(teacherJs)
	}, [ teacherJs ])

	useEffect(() => {
		!isPaused && setStudentJs(incomingJs)
	}, [ incomingJs, isPaused ])

	return (
		<div className="CollaborativeEditorSection Card">
			<div className="InnerPannel">
				<div className="Flex AlignCenterContent EditorsInnerHeader">
					<p>Teacher</p>
				</div>
				<div className="Flex Column BgPrimary EditorsWrapper">
					<Editor 
						language="js"
						value={ teacherJs }
						onChange={ handleTeachersChange }
						open={ true }
					/>
				</div>
			</div>
			<div id="EditorsSeparator"></div>
			<div className="InnerPannel">
				<div className="Flex SpaceBetween AlignCenterContent EditorsInnerHeader">
					<p>Student</p>
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
				</div>
				<div className="Flex Column BgPrimary EditorsWrapper">
					<Editor 
						language="js"
						value={ studentJs }
						onChange={ handleStudentsChange }
						open={ true }
						/>
				</div>
			</div>
		</div>
	)
}

export default CollaborativeEditorSection
