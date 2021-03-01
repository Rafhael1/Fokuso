import React, { useState } from 'react'


export default function InputTodo({setTodosChange}) {

    const [description, setDescription] = useState('');

    const onSubmitForm = async e => {
         e.preventDefault();
        try {

            const myHeaders = new Headers();

            myHeaders.append("Content-type", "application/json")
            myHeaders.append("jwt_token", localStorage.token)

            const body = {description};
            const response = await fetch("http://localhost:5000/dashboard/todos", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });

            await response.json()

            setTodosChange(true)
            setDescription('')


        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div>
             <form onSubmit={onSubmitForm} >
                    <input 
                     type="text"
                     value={description} 
                     onChange={e => setDescription(e.target.value)}
                     />
                    <button>Add</button>
                </form>
        </div>
    )
}
