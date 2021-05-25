import React, { useEffect, useState } from 'react';

import EditTodo from '../EditTodo/EditTodo';

import { Button } from 'semantic-ui-react';

// Skeleton Loading Effect
import { SkeletonBlock } from "skeleton-elements/react";

export default function ListTodos({allTodos, setTodosChange, skeleton}) {

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

    const updateToCompleted = async(e, id) => {
        e.preventDefault();
        try {
         
            const baseURL = process.env.NODE_ENV === 'production' ? `api/dashboard/todos/true/${id}` : `http://localhost:5001/api/dashboard/todos/true/${id}`

            await fetch(baseURL, {
                method: "PUT",
                headers: {token: localStorage.token},
    
            })

        } catch (error) {
            console.log(error.message)
        }
    }

    const updateToNotCompleted = async(e, id) => {
        e.preventDefault();
        try {
         
            const baseURL = process.env.NODE_ENV === 'production' ? `api/dashboard/todos/false/${id}` : `http://localhost:5001/api/dashboard/todos/false/${id}`

            await fetch(baseURL, {
                method: "PUT",
                headers: {token: localStorage.token},
    
            })

        } catch (error) {
            console.log(error.message)
        }
    }

    let completedStyle = {
        textDecoration: "line-through",
        color: 'rgb(122, 122, 122)'
    }

    useEffect(() => {
        setTodos(allTodos)
    }, [allTodos])

    return (
        <div >
            <div>
               <div>
               {
                    todos.length !== 0 && todos[0].todo_id !== null && 
                    todos.map(todo => 
                    (
                        <div 
                                className="todo"  
                                style={todo.completed === true ? completedStyle : null} 
                                key={todo.todo_id} 
                                onClick={
                                (e) => {todo.completed === true ? updateToNotCompleted(e, todo.todo_id)  : updateToCompleted(e, todo.todo_id); 
                                setTodosChange(true)
                                }} 
                                >
                            <p>{todo.description}</p> 
                            <EditTodo todo={todo} setTodosChange={setTodosChange} />
                            <Button color="red" className="Dbtn TodoButton"  icon="trash" onClick={() => deleteTodo(todo.todo_id)} />
                        </div>
                    ))
                }
                { skeleton ? <SkeletonBlock tag="div" width="320px" height="57px" borderRadius="5px" effect="wave" /> : null }
               </div>
            </div>
        </div>
    )
}


