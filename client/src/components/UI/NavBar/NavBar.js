import React from 'react';


import Quotes from '../../Quotes/Quotes'

export default function NavBar({name}) {

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
