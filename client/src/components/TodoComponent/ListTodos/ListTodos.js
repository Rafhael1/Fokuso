import React, { useEffect, useState } from 'react';


import EditTodo from '../EditTodo/EditTodo';

import { Button } from 'semantic-ui-react'

export default function ListTodos({allTodos, setTodosChange}) {

    const [todos, setTodos] = useState([]);

    const deleteTodo = async(id) => {
        try {

            const baseURL = process.env.NODE_ENV === 'production' ? `api/dashboard/todos/${id}` : `http://localhost:5001/api/dashboard/todos/${id}`

            await fetch(baseURL,{
                method: "DELETE",
                headers: {token: localStorage.token}
            });

           setTodos(todos.filter(todo => todo.todo_id !== id));

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        setTodos(allTodos)
    }, [allTodos])

    return (
        <div className="ListTodos" >
            <div>
               <div className="ListTodos">
               {
                    todos.length !== 0 && todos[0].todo_id !== null && 
                    todos.map(todo => (
                        <div className="todo" key={todo.todo_id}>
                            <p>{todo.description}</p> 
                            <EditTodo todo={todo} setTodosChange={setTodosChange} /> 
                            <Button color="red" className="Dbtn TodoButton"  icon="trash" onClick={() => deleteTodo(todo.todo_id)} />
                        </div>
                    ))
                }
               </div>
            </div>
        </div>
    )
}


