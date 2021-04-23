import React, { useState, useEffect } from 'react'

// styles
import {toast} from "react-toastify";
import {
  Container,
  Icon
} from 'semantic-ui-react'
import '../Form.scss'

import Logo from '../../../Images/Fokuso.png'

// other components

import {Link} from "react-router-dom";

export default function Login({setAuth, setLoader}) {

  const [inputs,
    setInputs] = useState({email: "", password: ""})

  const {email, password} = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitForm = async(e) => {
    e.preventDefault()
    try {

      const body = {
        email,
        password
      }

      const baseURL = process.env.NODE_ENV === 'production' ? "api/auth/login" : "http://localhost:5001/api/auth/login"

      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })

      const parseRes = await response.json()

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
        console.log(parseRes)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    document.title = "Fokuso | Login"
  }, [])

  return (
    <div className="AuthPages" >
    <Container >
    <Link to="/"><img style={{height: '100px'}} src={Logo} alt=""/></Link>
      <div className="FormContainer" >
      <h1>Login</h1>
        <Container>
        <form onSubmit={onSubmitForm} >
          <div className="inputContainer" >
            <Icon name="mail" size="large" />
            <input
              placeholder='Email'
              type="email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="inputContainer" >
            <Icon name="lock" size="large" />
            <input 
              type='password'
              name="password"
              placeholder="Password"
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <button>Login</button>
        </form>
        </Container>
      </div>
  </Container>
  </div>
  )
}
