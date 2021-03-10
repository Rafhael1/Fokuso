import React, {useState, useEffect} from 'react'

import InputTodo from './InputTodo/InputTodo'
import ListTodos from './ListTodos/ListTodos'

//Styles 
import './TodoComponent.scss'

export default function TodoComponent() {

  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getProfile = async () => {
    try {

      const baseURL = process.env.NODE_ENV === 'production' ? `api/dashboard/` : `http://localhost:5000/api/dashboard/`

      const res = await fetch(baseURL, {
        method: "GET",
        headers: { jwt_token: localStorage.token }
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
            <InputTodo setTodosChange={setTodosChange} />
            <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
        </div>
    )
}
