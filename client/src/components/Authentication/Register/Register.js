import React, {useState} from 'react'

// styles

import './Register.scss'
import { Container } from 'semantic-ui-react'
import {Button, Form} from 'semantic-ui-react'
import { toast } from "react-toastify";

// other components

import { Link } from "react-router-dom";


export default function Register({setAuth}) {

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

      const body = { name, email, password };

      const response = await fetch("http://localhost:5000/auth/register", {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(body)
      })

      const parseRes = await response.json()

      if (parseRes.token){
        localStorage.setItem("token", parseRes.token)
        setAuth(true)
        toast.success("Registered Sucessfully")
      } else {
        setAuth(false);
        toast.error(parseRes)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Container>
      <h1>Register</h1>
      <Form onSubmit={onSubmitForm} >
        <Form.Field>
          <label>Username</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="FormInput"
            value={name}
            onChange={e => onChange(e)}/>
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="FormInput"
            value={email}
            onChange={e => onChange(e)}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="FormInput"
            value={password}
            onChange={e => onChange(e)}/>
        </Form.Field>
        <Button inverted color="green" type='submit'>Submit</Button>
      </Form>
      <Link to="/login">Login</Link>
    </Container>
  )
}
