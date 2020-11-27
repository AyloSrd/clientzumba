import React from "react"
import LaunchLessonSection from '../components/LaunchLesson/LaunchSessionSection'
import JoinLesson from '../components/LaunchLesson/JoinLesson'
import NotesTable from '../components/Tables/NotesTable'
import LessonsTable from '../components/Tables/LessonsTable'
import { withUser } from '../components/Auth/withUser'
import '../styles/Profile.css'
import FooterMain from '../components/FooterMain/FooterMain'

const Profile = props => {
  return (
    <div>
      <section className="Welcome Flex CenteredVHContent">
        <img src="assets/welcomeBg.jpeg" alt=""/>
        <h1 className="CenteredText WhiteText">Welcome back, <span id="userName">{props.context.user.userName}</span>!</h1>
      </section>
      { props.context.user.role === 'teacher' && <LaunchLessonSection props={props} />}
      {/* <LaunchLessonSection props={props} /> */}
      <JoinLesson props={props} />
      { props.context.user.role === 'student' && <NotesTable props={props} />}
      {/* <NotesTable props={props} /> */}
      <LessonsTable props={props} />
      <FooterMain />
    </div> 
  );
};

export default withUser(Profile)
