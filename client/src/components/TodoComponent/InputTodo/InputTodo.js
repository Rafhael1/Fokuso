import React, {useState} from 'react'

import {toast} from "react-toastify";

import {Input} from 'semantic-ui-react'

export default function InputTodo({setTodosChange, setSkeleton}) {

  const [ description, setDescription ] = useState('');

  const onSubmitForm = async e => {
    e.preventDefault();
    setSkeleton(true);
    if (description.length === 0) {
      toast.dark("👁👅👁 Type something before adding!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      setSkeleton(false);
    } else {
      try {

        const myHeaders = new Headers();

        myHeaders.append("Content-type", "application/json")
        myHeaders.append("token", localStorage.token)

        const baseURL = process.env.NODE_ENV === 'production'
          ? `api/dashboard/todos`
          : `http://localhost:5001/api/dashboard/todos`

        const body = {
          description
        };
        const response = await fetch(baseURL, {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(body)
        });

        await response.json()

        setTodosChange(true)
        setSkeleton(false);
        setDescription('')

      } catch (err) {
        console.log(err.message)
      }
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <Input
          type="text"
          value={description}
          placeholder="New Todo..."
          size="large"
          icon="add"
          onChange={e => setDescription(e.target.value)}/>
      </form>
    </div>
  )
}
