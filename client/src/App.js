import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import './App.scss';

// react toastify

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


// cookies

import { useCookies } from "react-cookie"

//components 

import Login from './components/Authentication/Login/Login'
import SignUp from './components/Authentication/SignUp/SignUp'

//pages
import Dashboard from './containers/Dashboard/Dashboard'
import Home from './containers/Home/Home';
import CookiesPolicy from './containers/CookiesPolicy/CookiesPolicy';

import { motion, AnimatePresence } from "framer-motion"


toast.configure()

function App() {

  const [ cookies, setCookie ] = useCookies(["location"])

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {setIsAuthenticated(boolean)}

  const isAuth = async() => {
    try {

      const baseURL = process.env.NODE_ENV === 'production' ? `api/auth/verify` : `http://localhost:5001/api/auth/verify`
      
      const response = await fetch(baseURL, {
        method: "POST",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json()

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    isAuth();
    //handleCookie()
  }, [])

  return (
     <div className="App">
      <Router>
        <AnimatePresence>
         <Switch>
            <Route exact path="/login" render={props => !isAuthenticated  ? <Login motion={motion} {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" /> }></Route>
            <Route exact path="/signup" render={props => !isAuthenticated ? <SignUp motion={motion} {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" /> }></Route>
            <Route exact path="/dashboard" render={props =>  isAuthenticated ? <Dashboard motion={motion} {...props} setAuth={setAuth} cookies={cookies} setCookie={setCookie} /> : <Redirect to="/login" />}></Route>
            <Route exact path="/" render={props =>  !isAuthenticated ? <Home motion={motion} {...props} /> : <Redirect to="/dashboard" />}></Route>
            <Route exact path="/cookies-policy" component={CookiesPolicy}></Route>
          </Switch>       
        </AnimatePresence>
      </Router>
    </div>
  )
}

export default App;
