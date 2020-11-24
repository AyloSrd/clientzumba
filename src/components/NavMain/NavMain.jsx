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
            <li className="Flex CenteredVHContent">
                <NavLink to="/profile">                 
                  <div className="NeuBtn Flex CenteredVHContent CTA">
                    <p>{context.user && context.user.userName}</p>
                    </div>
                </NavLink>
            </li>
            </li>
            <li className="Flex CenteredVHContent">
              <p onClick={handleLogout}>Logout</p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li className="Flex CenteredVHContent">
              <NavLink to="/signin">Sign in</NavLink>
            </li>
            <li className="Flex CenteredVHContent">
              <NavLink to="/signup">
                <div className="NeuBtn CTA Flex CenteredVHContent">
                  <p>Sign up</p>
                </div>
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain)
