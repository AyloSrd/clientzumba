import React, { Component, createRef } from "react"
import { withRouter } from "react-router-dom"
import { UserContext } from "../Auth/UserContext"
import apiHandler from "../../api/apiHandler"
import './Form.css'

class FormSignup extends Component {
  static contextType = UserContext

  state = {
    userName: '',
    email: '',
    password: '',
    role:'student'
  }

  alertText = createRef()

  handleChange = (event) => {
    const value =
      event.target.type === 'file'
        ? event.target.files[0]
        : event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data)
        console.log(data)
        this.props.history.push('/profile')
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
            This email is already taken !
            <br />
            Please try again
          </p>
        </div>

        <form 
          className="Flex Column AlignCenterContent InsetCard Form"
          onChange={this.handleChange} 
          onSubmit={this.handleSubmit}
        >
        <label htmlFor='userName'>User name</label>
          <input 
            className="Input"
            type='text' 
            id='userName' 
            name='userName'
            onChange={this.handleChange}
            placeholder="Ada"
          />

          <label htmlFor='email'>Email</label>
          <input
            className="Input" 
            type='email' 
            id='email' 
            name='email'
            onChange={this.handleChange}
            placeholder="ada@lovelace.dev"
          />
          
          <label htmlFor='password'>Password</label>
          <input 
            className="Input"
            type='password' 
            id='password' 
            name='password'
            onChange={this.handleChange}
            placeholder="●●●●●●"
          />
          
          <label htmlFor='password'>I am a ...</label>
          <div className="Select BgPrimary">
            <select 
              className="BgPrimary"
              name='role' 
              value={this.state.role}
              onChange={this.handleChange}
            >
              <option value=''>--Pleaseselect--</option>
              <option value='student'>Student</option>
              <option value='teacher'>Teacher</option>
            </select>
          </div>
          <button id="SubmitBtn" className="NeuBtn CTA">Submit</button>
        </form>
      </div>
    )
  }
}

export default withRouter(FormSignup)
