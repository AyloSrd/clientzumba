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
        <h3 className="logo text">C<span id="logoO">ö</span>de</h3>
      </NavLink>
      <ul className="nav-list">
        {context.isLoggedIn && (
          <React.Fragment>           
            <li className="Flex CenteredVHContent">
              <NavLink to="/profile">
                {context.user && context.user.userName}
              </NavLink>
            </li>
            <li className="Flex CenteredVHContent">
              <p onClick={handleLogout}>Logout</p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li className="Flex CenteredVHContent">
              <NavLink to="/signin">Log in</NavLink>
            </li>
            <li className="Flex CenteredVHContent">
              <div className="NeuBtn Flex CenteredVHContent">
                <NavLink to="/signup">Create account</NavLink>
              </div>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain)
