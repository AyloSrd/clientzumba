import React from "react"
import LaunchLessonSection from '../components/LaunchLesson/LaunchSessionSection'
import JoinLesson from '../components/LaunchLesson/JoinLesson'
import NotesTable from '../components/Tables/NotesTable'
import LessonsTable from '../components/Tables/LessonsTable'
import { withUser } from '../components/Auth/withUser'

const Profile = props => {
  console.log('profile', props)
  return (
    <div>
      <h1>Protected profile</h1>
      {/* { props.context.user.role === 'student' && <LaunchLessonSection props={props} />} */}
      <LaunchLessonSection props={props} />
      <JoinLesson props={props} />
      {/* { props.context.user.role === 'student' && <NotesTable props={props} />} */}
      <NotesTable props={props} />
      <LessonsTable props={props} />
    </div> 
  );
};

export default withUser(Profile)
