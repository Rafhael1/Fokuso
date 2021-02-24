import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";


import NavBar from '../../components/UI/NavBar/NavBar'
import InputTodo from '../../components/TodoComponent/InputTodo/InputTodo'
import ListTodos from '../../components/TodoComponent/ListTodos/ListTodos'

export default function Dashboard({setAuth}) {

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

 

    return (
        <div>
              <NavBar />
                <InputTodo />
                <ListTodos />
                <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
        </div>
    )
}
