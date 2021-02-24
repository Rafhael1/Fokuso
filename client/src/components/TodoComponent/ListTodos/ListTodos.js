import React, { useEffect, useState } from 'react';


import EditTodo from '../EditTodo/EditTodo';


export default function ListTodos() {

    const [todos, setTodos] = useState([]);

    const deleteTodo = async(id) => {
        try {

            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
                method: "DELETE"
            });

           setTodos(todos.filter(todo => todo.todo_id !== id));

        } catch (error) {
            console.log(error.message)
        }
    }

    const getTodos = async() => {
        try {
            const response = await fetch('http://localhost:5000/todos')
            const jsonData = await response.json()


            setTodos(jsonData)

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

   

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo => (
                            <tr key={todo.todo_id} >
                                <td>{todo.description}</td>
                                <td> <EditTodo todo={todo} /> </td>
                                <td><button onClick={() => deleteTodo(todo.todo_id)} >Delete</button></td>
                            </tr>         
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
