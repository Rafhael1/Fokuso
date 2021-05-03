import React, { useEffect } from 'react'

// styles
import './Dashboard.scss'

import { Container, Button } from 'semantic-ui-react'

// components
import TodoComponent from '../../components/TodoComponent/TodoComponent'
import NotesComponent from '../../components/NotesComponent/NotesComponent'
import CalendarPlugin from '../../components/CalendarPlugin/CalendarPlugin'

import NavBar from './NavBar/NavBar'

import {toast} from "react-toastify"

const Dashboard = ({setAuth, setCookie, cookies}) => {

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

  useEffect(() => {
    document.title = "Fokuso | Dashboard"
  })

  return (
    <div className="DashboardBody">
     <NavBar setCookie={setCookie} cookies={cookies} />
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

export default Dashboard
