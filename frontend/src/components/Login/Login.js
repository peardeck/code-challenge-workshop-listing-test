import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';

import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      error: ""
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('token')) {
      this.setState ( {
        logged: true
      } );
    } else {
      this.setState ( {
        logged: true
      } );
    }
  }

  submitHandler(ev) {
    ev.preventDefault();

    // @TODO-code-challenge: Core Functionality: As a User, I can sign in using my email & password
    // Update fields based on user input
    let email = "";
    let password = "";

    if (password.length < 8) {
      this.passwordInput.value = "";
      this.passwordInput.focus();
      return;
    }

    let payload = JSON.stringify({ email: email, password: password });
    fetch ('http://localhost:3000/api/v1/users/sign-in/', {
      headers: {
      'Content-Type': 'application/json'
      },
      method: 'POST',
      body: payload
    })
    .then ( (resp) => {
      if (resp.status === 200) {
        resp.json().then( (data) => {
          console.log('data of login in :');
          console.log(data);
          localStorage.setItem('token', data.token);
          this.setState({
            logged: true,
            error: ""
          });
          this.props.history.push('/workshops/nearby');
        }).catch( (err) => {
          console.log('problem in jsonifying login response');
        });
      } else {
        console.error('User with given credentials Not authorized by the server !');
        this.setState({
          ...this.state,
          error: "Wrong credentials"
        });
      }
    } )
    .catch ( (err) => { console.error('Error in Login Fetch ...'); } );

  }

  render() {
    return (

      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={this.submitHandler}>
            {/* @TODO-code-challenge: Core Functionality: As a User, I can sign in using my email & password */}
            <div className="field">
              <label htmlFor="email">E-mail: </label>
              <input type="email" name="email" required placeholder="valid e-mail"/>
            </div>
            <div className="field">
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" required placeholder="( at least 8 characters )"/>
            </div>
            <div className="field">
              <button type="submit">Sign-in</button>
            </div>
        </form>
        <div className={`error-msg ${this.state.error === "" ? 'hidden' : ''}`}>
          <p>{this.state.error}</p>
        </div>
      {localStorage.getItem('token') ? <Redirect from="/signin" to="/workshops/nearby" /> : null}
      </div>
    );
  }
}

export default Login;