import React from 'react'
import SectionTemplate from './SectionTemplate'
import IDESection from './IDESection'
import { mainSectionsContent } from '../../../data/homeData'

const Main = () => {
	return (
		<main>
			<SectionTemplate description={ mainSectionsContent.integratedIDE } orientation="Regular">
				<IDESection />
			</ SectionTemplate>
		</main>
	)
}

export default Main
