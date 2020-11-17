import React, { useState, useEffect } from 'react'
import Table from './Table'
import apiHandler from '../../api/apiHandler'
import './NotesTable.css'

const NotesTable = ({ id }) => {
	console.log('id', id)
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

	useEffect(() => {
		apiHandler
			.getStudentNotes(id)
			.then( data => setNotes(data))
			.catch(err => console.error('student notes', err))
	}, [])
	console.log(notes)
	return (
		<div 
			className="Flex Column AlignCenterContent">
			<h1 className="text">Your notes</h1>
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
							notes 
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
										colSpan="3"
									>
										You haven't coded yet
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
