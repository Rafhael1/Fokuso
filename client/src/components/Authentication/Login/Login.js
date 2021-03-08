import React, {useState} from 'react'

// styles
import {toast} from "react-toastify";
import {
  Container,
  Button,
  Divider,
  Form,
  Grid,
  Segment
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
      };

      const response = await fetch("http://localhost:5000/auth/login", {
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
        setLoader(false)
      } else {
        setAuth(false);
        toast.error(parseRes);
        console.log(parseRes)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Container className="formContainer login">
      <Link to="/"><img className="Logo" src={Logo} alt=""/></Link>
      <h1>Login</h1>
      <Segment placeholder>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form onSubmit={onSubmitForm}>
              <Form.Input
                icon='mail'
                iconPosition='left'
                label='Email'
                placeholder='Email'
                type="email"
                name="email"
                value={email}
                onChange={e => onChange(e)}/>
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Password'
                type='password'
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={e => onChange(e)}/>

              <Button content='Login' color="purple"/>
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Link to="/register">
              <Button content='Sign up' icon='signup' size='big' inverted color="purple"></Button>
            </Link>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </Container>
  )
}
