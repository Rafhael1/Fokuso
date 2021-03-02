import React, {useState} from 'react'

// styles

import '../Form.scss'
import {Container, Button, Form} from 'semantic-ui-react'
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
    <Container className="formContainer register" >
      <h1>Register</h1>
      <Form onSubmit={onSubmitForm} >
        <Form.Field>
          <label>Username</label>
          <Form.Input
            icon='user'
            iconPosition='left'
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={e => onChange(e)}/>
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <Form.Input
            icon='mail'
            iconPosition='left'
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => onChange(e)}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Form.Input
            icon='lock'
            iconPosition='left'
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={e => onChange(e)}/>
        </Form.Field>
        <Button  color="purple" type='submit'>Submit</Button>
      </Form>
      <Link to="/login"><Button inverted content='Login' icon='sign in alternate' color="purple"></Button></Link>
    </Container>
  )
}
