import React from "react"
import LaunchLessonSection from '../components/LaunchLesson/LaunchSessionSection'
import JoinLesson from '../components/LaunchLesson/JoinLesson'
import NotesTable from '../components/Tables/NotesTable'
import { withUser } from '../components/Auth/withUser'

const Profile = props => {
  console.log('profile', props)
  return (
    <div>
      <h1>Protected profile</h1>
      <LaunchLessonSection props={props} />
      <JoinLesson props={props} />
      <NotesTable id={props.context.user._id}/>
    </div> 
  );
};

export default withUser(Profile)
