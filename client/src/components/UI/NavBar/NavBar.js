import React, {useState, useEffect} from 'react';

// styles

import './NavBar.scss'

import {Header} from 'semantic-ui-react'

// components
import Quotes from '../../Quotes/Quotes'
import Weather from '../../Weather/Weather'

export default function NavBar() {

  const [name,
    setName] = useState("");

  const getName = async() => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: {
          jwt_token: localStorage.token
        }
      });

      const parseData = await res.json();

      if (parseData[0].user_name.length === 0 || parseData[0].user_name === undefined || null) {
        setName("There")
      } else {
        setName(parseData[0].user_name);
      }

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName()
  }, [])

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Header as="h1" floated="left">Fokuso</Header>
          </li>
          <li>
            <Header as="h3" textAlign="center"><Quotes/></Header>
          </li>
          <li>
            <Header as="h2" style={{color: 'white'}} floated="right">Hello {name}!</Header>
          </li>
          <li>
            <Header floated="right"><Weather/></Header>
          </li>
        </ul>
      </nav>
    </header>
  )
}
