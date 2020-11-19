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

/*
instead of babel, this is lighter but doesn't recognise closing tag without space, eg => <App/> NO, <App /> YES
<script src="https://cdn.jsdelivr.net/npm/dataformsjs@4.8.0/js/react/jsxLoader.min.js"></script>
*/ 