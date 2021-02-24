import React, {useState, useEffect} from 'react';


import Quotes from '../../Quotes/Quotes'

export default function NavBar({setAuth}) {

  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      console.log(parseData.user_name)
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <header>
      <nav>
        <h1>WorkSpace</h1>
        <Quotes/>
        <h1>{name}</h1>
      </nav>
    </header>
  )
}
