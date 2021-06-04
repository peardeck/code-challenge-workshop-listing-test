import React, { Component } from 'react';
import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom';


import Menu from './components/Menu/Menu';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import WorkshopDisplay from './components/WorkshopDisplay/WorkshopDisplay';

class App extends Component {
/*
  constructor (props) {
    super(props);
    localStorage.removeItem('token');
  }
*/
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Menu />
        </header>
        <main>
        <Switch>
          <Route path='/signin' component={Login}/>
          <Route path='/signup' component={Register}/>
          <PrivateRoute authed={localStorage.getItem('token') ? true : false} exact path='/workshops/:type' component= {WorkshopDisplay}/>
          <PrivateRoute authed={localStorage.getItem('token') ? true : false} path='/workshops/:type' component= {WorkshopDisplay}/>
          <Redirect to="/signin" />
        </Switch>
        </main>
      </div>
    );
  }

}

const PrivateRoute = ({component: Component, authed, ...rest})=>{
  return (
    <Route
    {...rest}
    render={(props) => ((authed === true)) ? <Component {...props} /> : <Redirect to={'/signin'} />}
    />
  )
}

export default App;
