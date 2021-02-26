import React from 'react'
import TodoComponent from '../../components/TodoComponent/TodoComponent'

import { toast } from "react-toastify"
 

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

  /*
  const getTodos = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setAllTodos(parseData)
    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {
    getTodos();
  }, []);

  <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
*/
    return (
        <div>
              <TodoComponent />
              <button onClick={e => logout(e)}>
        Logout
      </button>
        </div>
    )
}
