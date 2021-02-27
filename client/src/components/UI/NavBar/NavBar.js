import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify'

import Quotes from '../../Quotes/Quotes'

export default function NavBar() {

  const [name, setName] = useState("");


  const getName = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      if(parseData[0].user_name.length === 0 || parseData[0].user_name === undefined || null ) {
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
        <h1>WorkSpace</h1>
        <Quotes/>
        <h1>Hello {name}!</h1>
      </nav>
    </header>
  )
}
