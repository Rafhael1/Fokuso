import React, {useState, useEffect} from 'react'

import InputTodo from './InputTodo/InputTodo'
import ListTodos from './ListTodos/ListTodos'

//Styles 
import './TodoComponent.scss'

export default function TodoComponent() {

  // States
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);
  const [ skeleton, setSkeleton ] = useState(false);

  const getProfile = async () => {
    try {

      const baseURL = process.env.NODE_ENV === 'production' ? `api/dashboard/alltodos` : `http://localhost:5001/api/dashboard/alltodos`

      const res = await fetch(baseURL, {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();

      setAllTodos(parseData);


    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);
    
    return (
        <div>
            <h2>To do</h2>
            <InputTodo setTodosChange={setTodosChange} setSkeleton={setSkeleton} />
            <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} skeleton={skeleton} />
        </div>
    )
}
