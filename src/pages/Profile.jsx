import React from "react"
import LaunchLessonSection from '../components/LaunchLesson/LaunchSessionSection'
import JoinLesson from '../components/LaunchLesson/JoinLesson'
import { withUser } from '../components/Auth/withUser'

const Profile = props => {
  console.log('profile', props)
  return (
    <div>
      <h1>Protected profile</h1>
      <LaunchLessonSection props={props} />
      <JoinLesson props={props} />
    </div> 
  );
};

export default withUser(Profile)
