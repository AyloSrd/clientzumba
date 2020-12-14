import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
	return (
		<div>
			<header className="Flex Column Header">
				<img src="assets/base.png" alt="https://unsplash.com/photos/KWrNwBE87EY?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"/>
				<div id="TitleHeader">
					<h1 className="WhiteText">Live Interactive<br/>Coding Lessons</h1>
				</div>
				<div id="SubtitleHeader">
					<p id="description">Cöde is a modern school platform for a seamless learning journey. Stream your code and let your students play with it.</p>
				</div>
				<NavLink to="/signup">
					<button className="NeuBtn CTA">
						Create your first lesson for free!
					</button>
				</NavLink>
			</header>
		</div>
	)
}

export default Header

//https://unsplash.com/photos/KWrNwBE87EY?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink