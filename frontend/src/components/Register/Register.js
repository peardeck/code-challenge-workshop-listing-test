import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';

import './Register.css';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: "",
      name: "",
      email: "",
      password: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillMount() {
  }

 handleInputChange(event) {
    let id = event.target.name;

    this.setState({
    [id]: event.target.value
    });
  }

  submitHandler(ev) {
    ev.preventDefault();
    console.log('Submitting form ...');

    // @TODO-code-challenge: Core Functionality: As a User, I can sign up using my email & password
    // Update fields based on user input
    let name = this.state.name;
    let email = this.state.email;
    let password = this.state.password;

    if (password.length < 8) {
      this.passwordInput.value = "";
      this.passwordInput.focus();
      return;
    }

    let payload = JSON.stringify({ name: name, email: email, password: password });
    fetch ('http://localhost:3000/api/v1/users/sign-up/', {
      headers: {
      'Content-Type': 'application/json'
      },
      method: 'POST',
      body: payload
    })
    .then ( (resp) => {
      if (resp.status === 200) {
        resp.json().then( (data) => {
          console.log('data of register in :');
          console.log(data);
          this.props.history.push('/signin');
        }).catch( (err) => {
          console.log('problem in jsonifying register response')
        });
      } else {
        console.error('Not authorized !');
        this.setState({
          error: "Server could not register the user with the provided info"
        });
      }
    } )
    .catch ( (err) => { console.error('Error fetching ...'); } );

  }

  render() {
    return (
      <div className="Register">
        <h1>Register</h1>
        <form onSubmit={this.submitHandler}>
            {/* // @TODO-code-challenge: Core Functionality: As a User, I can sign up using my email & password */}
            <div className="field">
              <label htmlFor="name">Names: </label>
              <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} required placeholder="name"/>
            </div>
            <div className="field">
              <label htmlFor="email">E-mail: </label>
              <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} required placeholder="valid e-mail"/>
            </div>
            <div className="field">
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required placeholder="( at lease 8 characters )"/>
            </div>
            <div className="field">
              <button type="submit">Sign-up</button>
            </div>
        </form>
        <div className={`error-msg ${this.state.error === "" ? 'hidden' : ''}`}>
          <p>{this.state.error}</p>
        </div>
      {localStorage.getItem('token') ? <Redirect from="/signup" to="/workshops/nearby" /> : null}
      </div>

    );
  }
}

export default Register;
