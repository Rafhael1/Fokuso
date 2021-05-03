import React, {useState, useEffect} from 'react';

// styles

import './NavBar.scss'

// imgs

import Logo from '../../../Images/Fokuso.png'

// components
import Quotes from '../../../components/Quotes/Quotes'
import Weather from '../../../components/Weather/Weather'


export default function NavBar({setCookie, cookies}) {

  const [name,
    setName] = useState("");

  const getName = async() => {
    try {

      const baseURL = process.env.NODE_ENV === 'production' ? `api/dashboard/alltodos` : `http://localhost:5001/api/dashboard/alltodos`

      const res = await fetch(baseURL, {
        method: "GET",
        headers: {
          token: localStorage.token
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
    <nav className="DashboardNav" >    
      <img  className="Logo" src={Logo} alt="" />
      <Quotes/> 
      <Weather setCookie={setCookie} cookies={cookies} />
      <h3>Hello {name.length === 0 ? 'There' : name}!</h3>
    </nav>
  )
}
