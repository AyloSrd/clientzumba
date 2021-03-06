import React from "react"
import { Switch, Route } from "react-router-dom"
import NavMain from "./components/NavMain/NavMain"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import ProtectedRoute from "./components/ProtectedRoute"
import Profile from "./pages/Profile"
import Desk from './pages/Desk'

const App = () => {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/signin" component={ Signin } />
        <Route exact path="/signup" component={ Signup } />
        <ProtectedRoute exact path="/desk" component={ Desk } />
        <ProtectedRoute exact path="/profile" component={ Profile } />
      </Switch>
    </div>
  )
}

export default App;
