export const libraries = {
		js:' ',
		react: `
			<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
			<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
			<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
		`,
		vue: `
			<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
		`
}

export const templateCode = {
	js: {
		html:'<h1 id="test">Yo, welcome to your Vanilla js</h1>',
		css:`h1 {
	color: #333;
	font-family: 'Helvetica', sans-serif;
	text-align: center;
}`,
		js: 'document.getElementById("test").innerHTML += " lesson!"'
	},
	react: {
		html:'<div id="root"></div>',
		css:`h1 {
	color: #333;
	font-family: 'Helvetica', sans-serif;
	text-align: center;
}`,
		js: `const App = props => <h1>Yo,{props.welcome}</h1>
ReactDOM.render(<App welcome=" welcome to your React lesson!" />, document.getElementById('root'))
`},
	vue: {
		html:'<h1 id="welcome">{{ welcome }}</h1>',
		css:`h1 {
	color: #333;
	font-family: 'Helvetica', sans-serif;
}`,
		js: `new Vue({
	el: '#welcome',
	data: {
		welcome: "Yo, welcome to your Vue lesson"
	}
})`
	}
}

export const fakeConsole = {
	html: `
<button class="togglerd5ti9Wa73x4A1y4p" id="togglerd5ti9Wa73x4A1y4p">></button>
<div class="consoled5ti9Wa73x4A1y4p collapsedd5ti9Wa73x4A1y4p" id="consoled5ti9Wa73x4A1y4p"><ul id="logsd5ti9Wa73x4A1y4p"></ul></div>
`,
	css: `
<style>
			
	*, *::before, *::after {
		box-sizing: border-box;
	}

	#consoled5ti9Wa73x4A1y4p {
		overflow: auto;
		padding: 10px 10px 0 10px;
	}
	.consoled5ti9Wa73x4A1y4p.collapsedd5ti9Wa73x4A1y4p {
		width: 20px;
		height: 20px;
		bottom: 5px;
		margin-left: -10px;
		border-radius: 10px;
		z-index: 1000;
	}

	.consoled5ti9Wa73x4A1y4p {
		position: fixed;
		bottom: 15px;
		left: 50%;
		margin-left: -200px;
		width: 400px;
		max-width:100%;
		height: 200px;
		margin-right: 5px;
		background-color: black;
		transition: 200ms ease-out;
	}

	#logsd5ti9Wa73x4A1y4p {
		list-style: none;
		margin-left: 0;
		padding-left: 1.2em;
		text-indent: -1.2em;
	}

	#logsd5ti9Wa73x4A1y4p li {
		color: white;
		font-family: monospace;
	}

	#logsd5ti9Wa73x4A1y4p li:before {
		content: ">";
		display: block;
		float: left;
		width: 1.2em;;
	}

	.togglerd5ti9Wa73x4A1y4p {
		position: fixed;
		bottom: 5px;
		left: 50%;
		width: 20px;
		height: 20px;
		margin-left: -10px;
		border: none;
		border-radius: 10px;
		z-index: 5000;
		background-color: black;
		color: white;
		transform: rotate(-90deg);
		transition: 200ms ease-out;
	}

	.togglerd5ti9Wa73x4A1y4p.closed5ti9Wa73x4A1y4p {
		transform: rotate(90deg);
		bottom: 205px;
		transition: 200ms ease-out;
	}

	#togglerd5ti9Wa73x4A1y4p:focus {
		outline:0;
	}

</style>	
`,
	js: `
<script>
	//get fake-console and fake-logs references
	const fakeConsoled5ti9Wa73x4A1y4p = document.getElementById('consoled5ti9Wa73x4A1y4p')
	const logsd5ti9Wa73x4A1y4p = document.getElementById('logsd5ti9Wa73x4A1y4p')
	//ovverride console.log
	const backUpConsoleLogd5ti9Wa73x4A1y4p = console.log
	console.log = (...args) => {
		args.forEach(arg => {
			backUpConsoleLogd5ti9Wa73x4A1y4p(arg)
			const li = document.createElement('li')
			li.innerHTML = arg
			logsd5ti9Wa73x4A1y4p.append(li)
		})			
	}
	//log errors too
	window.addEventListener('error', ({ message }) => console.log(message))
	//toggle open/close console
	const toggleConsoled5ti9Wa73x4A1y4p = e => {
		fakeConsoled5ti9Wa73x4A1y4p.classList.toggle("collapsedd5ti9Wa73x4A1y4p")
		e.target.classList.toggle('closed5ti9Wa73x4A1y4p')
	}
	const togglerd5ti9Wa73x4A1y4p = document.getElementById('togglerd5ti9Wa73x4A1y4p')
	togglerd5ti9Wa73x4A1y4p.addEventListener('click', toggleConsoled5ti9Wa73x4A1y4p)
</script>

`
}

/*
instead of babel, this is lighter but doesn't recognise closing tag without space, eg => <App/> NO, <App /> YES
<script src="https://cdn.jsdelivr.net/npm/dataformsjs@4.8.0/js/react/jsxLoader.min.js"></script>
*/ 

/*
d3 script
d3: '<script src="https://d3js.org/d3.v5.min.js"></script>',
*/

/*
Typescript: https://github.com/basarat/typescript-script 
*/

/* 
Bootstrap 
*/
