import React from 'react'
import SectionTemplate from './SectionTemplate'
import IDESection from './IDESection'
import CollaborativeEditorSection from './CollaborativeEditorSection'
import { mainSectionsContent } from '../../../data/homeData'

const Main = () => {
	return (
		<main>
			<SectionTemplate description={ mainSectionsContent.integratedIDE } orientation="Regular">
				<IDESection />
			</ SectionTemplate>
			<SectionTemplate description={ mainSectionsContent.collaborativeEditor } orientation="Reversed">
				<CollaborativeEditorSection />
			</ SectionTemplate>
		</main>
	)
}

export default Main
