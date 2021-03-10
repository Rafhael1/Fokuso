import React, {useState} from 'react'

import {toast} from "react-toastify";

import { Input } from 'semantic-ui-react'

export default function InputNote({setNotesChange}) {

  const [description,
    setDescription] = useState('')

  const onFormSubmit = async e => {
    e.preventDefault();
    if (description.length === 0) {
      toast.dark("👁👄👁 Type something before adding!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else {
      try {
        const myHeader = new Headers()

        myHeader.append("Content-type", "application/json")
        myHeader.append("jwt_token", localStorage.token)

        const body = {
          description
        }

        const baseURL = process.env.NODE_ENV === 'production' ? "api/dashboard/notes" : "http://localhost:5000/api/dashboard/notes"

        const response = await fetch(baseURL, {
          method: 'POST',
          headers: myHeader,
          body: JSON.stringify(body)
        })

        await response.json()

        setNotesChange(true)
        setDescription('')

      } catch (error) {
        console.log(error.message)
      }
    }
  }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <Input
          type="text"
          value={description}
          placeholder="New Note..."
          size="small"
          icon="add circle"
          onChange={e => setDescription(e.target.value)}/>
      </form>
    </div>
  )
}
