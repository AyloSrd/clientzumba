export const LaunchSessionFunction = ( { props }, { room }, goTo ) => {
	props.history.push({
		pathname: goTo,
		state: { room }
	})
}