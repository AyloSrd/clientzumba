export const LaunchSessionFunction = ( { props }, { room, code }, goTo ) => {
	props.history.push({
		pathname: goTo,
		state: { 
			room,
			code 
		}
	})
}