export const libraries = {
		js:' ',
		react: `
			<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
			<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
			<script src="https://cdn.jsdelivr.net/npm/dataformsjs@4.8.0/js/react/jsxLoader.min.js"></script>
		`,
		vue: `
			<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
		`
}

export const presetCode = {
	js: {
		html:'<h1 id="test">Vanilla JS</h1>',
		css:`
			h1 {
				color: #333;
				font-family: 'Helvetica', sans-serif;
			}
		`,
		js: 'document.getElementById("test").innerHTML += " test"'
	},
	react: {
		html:'<h1 id="test">React</h1>',
		css:`
			h1 {
				color: #333;
				font-family: 'Helvetica', sans-serif;
			}
		`,
		js: 'document.getElementById("test").innerHTML += " test"'
	},
	vue: {
		html:'<h1 id="test">Vue</h1>',
		css:`
			h1 {
				color: #333;
				font-family: 'Helvetica', sans-serif;
			}
		`,
		js: 'document.getElementById("test").innerHTML += " test"'
	}
}