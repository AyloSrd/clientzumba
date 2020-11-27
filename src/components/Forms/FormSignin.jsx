import React, { Component, createRef } from "react"
import { UserContext } from "../Auth/UserContext"
import { withRouter } from "react-router-dom"
import apiHandler from "../../api/apiHandler"
import './Form.css'

class FormSignin extends Component {
  static contextType = UserContext

  state = {
    email: "",
    password: "",
  }

  alertText = createRef()

  handleChange = (event) => {
    const key = event.target.name

    // You can test more if you have to handle different sorts of inputs.
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value

    this.setState({ [key]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/profile")
      })
      .catch((error) => {
        console.log(error)
        this.alertText.current.style.display = 'block'
      })
  }

  render() {
    return (
      <div>
        <div 
          ref={this.alertText} 
          style={{display:"none"}}
          className="Card BgTertiary AlertMsg"
        >
          <p>
            Wrong credentials !
            <br />
            Please try again
          </p>
        </div>
        <form 
          className="Flex Column AlignCenterContent InsetCard Form"
          onChange={ this.handleChange } 
          onSubmit={ this.handleSubmit }
        >
          <label htmlFor="email">Email</label>
          <input 
            className="Input"
            type="email"
            id="email" 
            name="email" 
            placeholder="ada@lovelace.dev"
          />
          <label htmlFor="password">Password</label>
          <input 
            className="Input"
            type="password" 
            id="password" 
            name="password" 
            placeholder="●●●●●●"
          />
          <button 
            className="NeuBtn CTA"
            id="SubmitBtn" 
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default withRouter(FormSignin)