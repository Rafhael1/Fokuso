import React, { useState } from 'react'


export default function InputTodo() {

    const [description, setDescription] = useState('');

    const onSubmitForm = async e => {
         e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/dashboard";

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
