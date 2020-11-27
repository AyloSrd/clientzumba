import React, { useState, useEffect } from 'react'
import Table from './Table'
import apiHandler from '../../api/apiHandler'
import { LaunchSessionFunction } from '../LaunchLesson/LaunchSessionFunction'
import './NotesTable.css'

const NotesTable = ({ props }) => {
	const id = props.context.user._id
	console.log('props', props)
	const [ notes, setNotes] = useState('')

	const handleDelete = id => {
		console.log('id', id)
		apiHandler
			.deleteNote(id)
			.then(noteId => {
				console.log(noteId)
				setNotes(prevNotes => {
					const newNotes = prevNotes.filter(prevNote => prevNote._id !== noteId)
					return newNotes
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
			.getStudentNotes(id)
			.then( data => setNotes(data))
			.catch(err => console.error('student notes', err))
	}, [])
	console.log(notes)
	return (
		<div 
			className="TableSection Flex Column AlignCenterContent">
			<h2 className="CenteredText WhiteText">Your notes</h2>
			<div 
				className="InsetCard TableContainer"
				id="NotesTableContainer"
			>
				<table>
					<thead>
						<tr>
							<th className="text">Topic</th>
							<th className="text">Date</th>
						</tr>
					</thead>
					<tbody>
						{
							notes[0] 
								? notes.map(note => {
									return(
										<tr key={note._id}>
											<td className="text" >
												{note.library}
											</td>
											<td className="text" >
												{note.updated}
											</td>
											<td>
												<button
													className="NeuBtn IconBtn"
													id="GoToBtn" 
													onClick={() => handleOpen(note.lesson, note.html, note.css, note.js )}
												>
													<div className="Code"></div>
												</button>
											</td>
											<td>
												<button
													className="NeuBtn IconBtn"
													id="DeleteBtn" 
													onClick={() => handleDelete(note._id)}
												>
													<div className="Delete Flex CenteredVHContent">
														<div className="InnerDelete"></div>
													</div>
												</button>
											</td>
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

export default NotesTable
