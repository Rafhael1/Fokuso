import React, {useState, useEffect} from 'react'


import NavBar from '../../components/UI/NavBar/NavBar'
import InputTodo from './InputTodo/InputTodo'
import ListTodos from './ListTodos/ListTodos'

export default function TodoComponent() {

  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      setAllTodos(parseData);

      if(parseData[0].user_name.length === 0 || parseData[0].user_name === undefined || null ) {
        setName("There")
      } else {
        setName(parseData[0].user_name);
      }

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
            <NavBar name={name} />
            <InputTodo setTodosChange={setTodosChange} />
            <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
        </div>
    )
}
