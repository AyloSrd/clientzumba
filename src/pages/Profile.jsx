import React from "react"
import { NavLink } from "react-router-dom"

const Profile = props => {
  return (
    <div>
      <h1>Protected profile</h1>
      <NavLink to="/desk">
        Desk
      </NavLink>
    </div>
  );
};

export default Profile;
