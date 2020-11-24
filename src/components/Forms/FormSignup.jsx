import React, { Component, createRef } from "react"
import { withRouter } from "react-router-dom"
import { UserContext } from "../Auth/UserContext"
import apiHandler from "../../api/apiHandler"

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
        this.props.history.push('/')
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
        >
          <p>
            This email is already taken !
            <br />
            Please try again
          </p>
        </div>

        <form 
          className="Flex Column AlignCenterContent InsetCard"
          onChange={this.handleChange} 
          onSubmit={this.handleSubmit}
        >
        <label htmlFor='userName'>User name</label>
          <input 
          type='text' 
          id='userName' 
          name='userName'
          onChange={this.handleChange}
          />

          <label htmlFor='email'>Email</label>
          <input 
          type='email' 
          id='email' 
          name='email'
          onChange={this.handleChange}
          />
          
          <label htmlFor='password'>Password</label>
          <input 
          type='password' 
          id='password' 
          name='password'
          onChange={this.handleChange}
          />
          
          <label htmlFor='pet-select'>I am a ...</label>
          <select 
          name='role' 
          value={this.state.role}
          onChange={this.handleChange}
          >
            <option value=''>--Please choose an option--</option>
            <option value='student'>Student</option>
            <option value='teacher'>Teacher</option>
          </select>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default withRouter(FormSignup)
