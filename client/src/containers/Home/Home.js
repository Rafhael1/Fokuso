import React, { useEffect } from 'react'

import {Link} from 'react-router-dom'

//Logo
import Logo from '../../Images/Fokuso.png'

import
{
  Button,
  Container,
  Menu,
  Grid,
}
from 'semantic-ui-react'

import Coding from '../../Images/Vector/coding.svg'
import ManLaptop from '../../Images/Vector/man_laptop.svg'
import TaskList from '../../Images/Vector/task_list.svg'

//Styles
import './Home.scss'

export default function Home() {

  useEffect(() => {
    document.title = "Fokuso | Home"
  })

  return (
    <div className="Home">
      <Container>
        <nav>
          <Menu
            style={{
            background: 'transparent',
            border: 'none',
            boxShadow: 'none'
          }}>
            <Menu.Item >
              <img className="Logo" src={Logo} alt=""/>
            </Menu.Item>
            <Menu.Item position='right'>
              <Link to="/login"><Button inverted color="white" content="Login"/></Link>
              <Link to="/signup"><Button color="purple" content="Sign Up"/></Link>
            </Menu.Item>
          </Menu>
        </nav>
        <main>
          <section className="Sec1">
            <Grid columns={2} relaxed='very' verticalAlign='middle' stackable>
              <Grid.Column>
                <h1>Fokuso helps people focus on what's important.</h1>
                <h2>With Fokuso you don't need dozens of tabs open. You can manage your whole
                  day in just one tab.</h2>
              </Grid.Column>

              <Grid.Column verticalAlign='middle'>
                <img src={TaskList} alt="" />
              </Grid.Column>
            </Grid>

          </section>
          <section className="Sec2">
            <Grid columns={2} relaxed='very' stackable>
              <Grid.Column>
                <img
                  src={Coding}
                  alt=""
                  style={{
                  height: '440px'
                }}/>
              </Grid.Column>

              <Grid.Column verticalAlign='middle'>
                <h1>Features</h1>
                <h2>With Fouso you can manage your:
                </h2>
                <ul>
                  <li>Todos</li>
                  <li>Notes</li>
                  <li>Calendar</li>
                </ul>
                <h2>and there's also a weather app inside of your dashboard and a quotes
                  generator, to keep ou inspired and motivated.</h2>
              </Grid.Column>
            </Grid>
          </section>
          <section className="Sec2">
            <Grid columns={2} relaxed='very' verticalAlign='middle' stackable>
              <Grid.Column>
                <h2>
                  So waste no more time and sign up!
                </h2>
                <Link to="/signup"><Button icon="signup" color="purple" content="Sign Up" size="huge"/></Link>
              </Grid.Column>

              <Grid.Column verticalAlign='middle'>
                <img
                  src={ManLaptop}
                  alt=""
                  style={{
                  height: '440px'
                }}/>
              </Grid.Column>
            </Grid>
          </section>
          <section className="footer" >
            <p>&copy; 2021 Fokuso.xyz, All rights reserved.</p>
          </section>
        </main>
      </Container>
    </div>

  )
}
