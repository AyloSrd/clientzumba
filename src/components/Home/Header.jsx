import React from 'react'
import './Header.css'

const Header = () => {
	return (
		<div>
			<header className="Flex Column Header">
				<img src="assets/header.png" alt="https://unsplash.com/photos/KWrNwBE87EY?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"/>
				<div id="TitleHeader">
					<h1 className="WhiteText">Live Interactive<br/>Coding Lessons</h1>
				</div>
				<div id="SubtitleHeader">
					<p id="description">Cöde is a modern school platform with a seamless coding experience. The integrated interactive editor and mini-browser, as well as the web-conference system, give a natural dimension to your academic journey</p>
				</div>
			</header>
		</div>
	)
}

export default Header

//https://unsplash.com/photos/KWrNwBE87EY?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink