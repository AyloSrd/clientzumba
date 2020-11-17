import React from 'react'

const Table = ({ lessons }) => { 
	console.log(lessons)
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Topic</th>
						<th>Date</th>
						<th>Teacher</th>
					</tr>
				</thead>
				<tbody>
					{
						lessons 
							? <tr><td className="text" colSpan="3">You haven't coded yet</td></tr> 
							: lessons.map(lesson => {
								<tr>{lesson}</tr>
							})
					}
					<tr>
					<td>{}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Table
