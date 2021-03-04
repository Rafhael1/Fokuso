import React from 'react'

// styles
import './Dashboard.scss'

import { Container } from 'semantic-ui-react'

// components
import TodoComponent from '../../components/TodoComponent/TodoComponent'
import NotesComponent from '../../components/NotesComponent/NotesComponent'
import CalendarPlugin from '../../components/CalendarPlugin/CalendarPlugin'

import Footer from '../../components/UI/Footer/Footer'
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
    <div>
      <NavBar/>
      <Container className="DashboardBody">
        <section>
          <TodoComponent/>
        </section>
        <section>
          <NotesComponent/>
        </section>
        <section>
          <CalendarPlugin />
        </section>

      </Container>
      <button onClick={e => logout(e)} >Logout</button>
      <Footer/>
    </div>
  )
}
