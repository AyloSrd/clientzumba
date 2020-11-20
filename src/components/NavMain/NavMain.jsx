import React from "react"
import { NavLink } from "react-router-dom"
import { withUser } from "../Auth/withUser"
import apiHandler from "../../api/apiHandler"

import "./NavMain.css"

const NavMain = props => {
  const { context } = props

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <nav className="NavMain Flex AlignCenterContent">
      <NavLink exact to="/">
        <p className="logo text">App name</p>
      </NavLink>
      <ul className="nav-list">
        {context.isLoggedIn && (
          <React.Fragment>           
            <li>
              <NavLink to="/profile">
                {context.user && context.user.userName}
              </NavLink>
            </li>
            <li>
              <p onClick={handleLogout}>Logout</p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/signin">Log in</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Create account</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain)
