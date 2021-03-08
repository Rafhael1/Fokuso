import React from 'react'

// styles
import './Dashboard.scss'

import { Container, Button } from 'semantic-ui-react'

// components
import TodoComponent from '../../components/TodoComponent/TodoComponent'
import NotesComponent from '../../components/NotesComponent/NotesComponent'
import CalendarPlugin from '../../components/CalendarPlugin/CalendarPlugin'

import NavBar from '../../components/UI/NavBar/NavBar'

import {toast} from "react-toastify"

export default function Dashboard({setAuth}) {

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logged out successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="DashboardBody">
     <NavBar/>
      <Container>
        <section>
          <TodoComponent/>
        </section>
        <section>
          <NotesComponent/>
        </section>
        <section>
          <CalendarPlugin/>
        </section>

      </Container>
     <footer>
       <div>
         <Button color="red" inverted content="Logout" onClick={e => logout(e)} />
       </div>
     </footer>
    </div>
  )
}
