import React, { useState, useEffect } from 'react'
import Table from './Table'
import apiHandler from '../../api/apiHandler'
import { LaunchSessionFunction } from '../LaunchLesson/LaunchSessionFunction'
import './NotesTable.css'

const LessonsTable = ({ props }) => {
	const { _id:id, role } = props.context.user
	console.log('props', props)
	const [ lessons, setLessons] = useState('')

	const handleDelete = id => {
		console.log('id', id)
		apiHandler
			.deleteLesson(id)
			.then(lessonId => {
				console.log(lessonId)
				setLessons(prevLessons => {
					const newLessons = prevLessons.filter(prevLesson => prevLesson._id !== lessonId)
					return newLessons
				})
			})
	}

	const handleOpen = ( room, html, css, js ) => {	
		const code = {
			html, 
			css,
			js
		}
		LaunchSessionFunction( { props }, { room, code}, '/desk')
	}

	useEffect(() => {
		apiHandler
			.getStudentLessons(id)
			.then( data => setLessons(data))
			.catch(err => console.error('student lessons', err))
	}, [])

	console.log(lessons)
	return (
		<div 
			className="Flex Column AlignCenterContent">
			<h1 className="text">Your lessons</h1>
			<div 
				className="InsetCard TableContainer"
				id="LessonsTableContainer"
			>
				<table>
					<thead>
						<tr>
							<th className="text">Topic</th>
							<th className="text">Teacher</th>
							<th className="text">Date</th>
						</tr>
					</thead>
					<tbody>
						{
							lessons[0] 
								? lessons.map(lesson => {
									return(
										<tr key={lesson._id}>
											<td className="text" >
												{lesson.library}
											</td>
											<td className="text" >
												{lesson.teacher.userName}
											</td>
											<td className="text" >
												{lesson.updated}
											</td>
											<td>
												<button
													className="NeuBtn IconBtn"
													id="GoToBtn" 
													onClick={() => handleOpen(lesson.lesson, lesson.html, lesson.css, lesson.js )}
												>
													<div className="Code"></div>
												</button>
											</td>
											{
												role === 'teacher' && (											
													<td>
														<button
															className="NeuBtn IconBtn"
															id="DeleteBtn" 
															onClick={() => handleDelete(lesson._id)}
														>
															<div className="Delete Flex CenteredVHContent">
																<div className="InnerDelete"></div>
															</div>
														</button>
													</td>
												)
											}
										</tr>
									)
								})
								: <tr>
									<td 
										className="text" 
										colSpan="5"
									>
										You haven't coded yet
									</td>
									<td>
										    
									</td>
									<td>
										    
									</td>
								</tr> 
						}
						<tr>
						<td>{}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default LessonsTable

