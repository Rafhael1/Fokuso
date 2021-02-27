import React from 'react'

// components
import TodoComponent from '../../components/TodoComponent/TodoComponent'
import Footer from '../../components/UI/Footer/Footer'
import NavBar from '../../components/UI/NavBar/NavBar'

import { toast } from "react-toastify"
 

export default function Dashboard({setAuth, name}) {

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
          <NavBar />
          <TodoComponent />
          <Footer />
          <button onClick={e => logout(e)}>Logout</button>
        </div>
    )
}
