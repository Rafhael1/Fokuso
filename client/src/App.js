import React, { useState, useEffect } from 'react';
 
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import { Container } from 'semantic-ui-react'

//components 

import Login from './components/Authentication/Login/Login'
import Register from './components/Authentication/Register/Register'

//pages
import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  const isAuth = async() => {
    try {
      
      const response = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await response.json()
      console.log(parseRes)

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    isAuth();
  }, [])

  return (
     <Container>
     <Router>
                <div>
                <Switch>
                    <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" /> }></Route>
                    <Route exact path="/register" render={props => !isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" /> }></Route>
                    <Route exact path="/dashboard" render={props =>  isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/login" />}></Route>
                </Switch>
                </div>
            </Router>
      </Container>
  );
}

export default App;
