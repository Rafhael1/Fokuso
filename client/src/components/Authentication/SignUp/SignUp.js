import React, {useState, useEffect} from 'react'

// styles

import '../Form.scss'
import {Container, Icon} from 'semantic-ui-react'
import {toast} from "react-toastify";

import Logo from '../../../Images/Fokuso.png'

// other components

import {Link} from "react-router-dom";

export default function SignUp({setAuth}) {

  const [inputs,
    setInputs] = useState({name: "", email: "", password: ""})

  const {name, email, password} = inputs;

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
        name,
        email,
        password
      };

      const baseURL = process.env.NODE_ENV === 'production' ? "api/auth/register" : "http://localhost:5001/api/auth/register"

      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })

      const parseRes = await response.json()

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token)
        toast.success("Registered Sucessfully, now you can login through the login page!")
      } else {
        setAuth(false);
        toast.error(parseRes)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    document.title = "Fokuso | Sign Up"
  }, [])

  return (
    <Container className="formContainer register">
      <Link to="/"><img style={{height: '100px'}} src={Logo} alt=""/></Link>
      <div className="FormContainer" >
        <h1>Sign Up</h1>
        <Container>
          <form onSubmit={onSubmitForm}>
            <div className="inputContainer">
              <Icon name="user" size="large" />
              <input 
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={e => onChange(e)}
                />
            </div>
            <div className="inputContainer">
            <Icon name="mail" size="large" />
              <input 
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={e => onChange(e)}
                />
            </div>
            <div className="inputContainer">
              <Icon name="lock" size="large" />
              <input 
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={e => onChange(e)}
                />
            </div>
            <button>Sign Up</button>
          </form>
        </Container>
      </div>
    </Container>
  )
}
