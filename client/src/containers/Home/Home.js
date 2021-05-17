import React, { useEffect } from 'react'

import {Link} from 'react-router-dom'

//Logo
import Logo from '../../Images/Fokuso.png'

import
{
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

export default function Home({motion}) {

  useEffect(() => {
    document.title = "Fokuso | Home"
  })

  return (
    <motion.div 
    initial="initial"
    animate="in"
    exit="out"
    transition={{ duration: 1 }}
    variants={{ initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    }
    }}
    >
    <div className="Home">
      <Container>
        <nav className="HomeNav" >
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
              <Link to="/login"><button className="btn btn-outline" >Login</button></Link>
              <Link to="/signup"><button className="btn" >Sign Up</button></Link>
            </Menu.Item>
          </Menu>
        </nav>
        <main>
          <section className="Sec1">
            <Grid columns={2} relaxed='very' verticalAlign='middle' stackable>
              <Grid.Column className="text-area" >
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

              <Grid.Column verticalAlign='middle' className="text-area" >
                <h1>Features</h1>
                <h2>With Fokuso you can manage your:
                </h2>
                <ul>
                  <li>Todos</li>
                  <li>Notes</li>
                  <li>Calendar</li>
                  <li>Weather</li>
                  <li>Quotes(for inspiration)</li>
                </ul>
                <h2>and there's also a weather app inside of your dashboard and a quotes
                  generator, to keep you inspired and motivated.</h2>
              </Grid.Column>
            </Grid>
          </section>
          <section className="Sec2">
            <Grid columns={2} relaxed='very' verticalAlign='middle' stackable>
              <Grid.Column >
                <h2>
                  So waste no more time and sign up!
                </h2>
                <Link to="/signup">     
                  <button className="btn" style={{margin: '0 auto'}}>Sign Up</button>
                </Link>
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
            <Link to="/cookies-policy"><h5>Cookies Policy</h5></Link>
            <p>&copy; 2021 Fokuso.xyz, All rights reserved.</p>
          </section>
        </main>
      </Container>
    </div>
    </motion.div> 
  )
}
