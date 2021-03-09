import React, { useState } from 'react'

import { Button, Modal, Input } from 'semantic-ui-react'

import './EditTodo.scss'

export default function EditTodo({todo, setTodosChange}) {

    const [description, setDescription] = useState(todo.description);

    const updateTodo = async(e) => {
      e.preventDefault();
      try {
        const body = { description };

        const myHeaders = new Headers()

        myHeaders.append("Content-type", "application/json")
        myHeaders.append("jwt_token", localStorage.token)

        const baseURL = process.env.NODE_ENV === 'production' ? `dashboard/todos/${todo.todo_id}` : `http://localhost:5000/dashboard/todos/${todo.todo_id}`

        await fetch(baseURL, {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body)
        });
        setTodosChange(true)

      } catch (error) {
        console.log(error.message)
      }
    }
    
    //////////////////////////////////
    /////////// MODAL ///////////////
    ////////////////////////////////

    function exampleReducer(state, action) {
        switch (action.type) {
          case 'close':
            return { open: false }
          case 'open':
            return { open: true, size: action.size }
          default:
            throw new Error('Unsupported action...')
        }
      }
      
      const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        size: undefined,
      })
      const { open, size } = state

      /////////////////////////////////

    return (
        <div>
      <Button
       data-target={`#id${todo.todo_id}`} 
       icon="edit"
       color="yellow"
       className="Ebtn"
       onClick={() => dispatch({ type: 'open', size: 'tiny' })}
       />
      <Modal
        size={size}
        open={open}
        onClose={() => { 
          dispatch({ type: 'close' })
          setDescription(todo.description)
        }}
        id={todo.todo_id}
      >
        <Modal.Header>Edit Todo</Modal.Header>
        <Modal.Content>
          <Input className="EditInput" placeholder='Edit Todo...' value={description} onChange={e => setDescription(e.target.value)} />
        </Modal.Content>
        <Modal.Actions>
          <Button inverted color="red" onClick={() => {
             dispatch({ type: 'close' });
             setDescription(todo.description)
             }}>
            Cancel
          </Button>
          <Button  color="green" onClick={(e) => {
            dispatch({ type: 'close' });
            updateTodo(e);
             }}>
            Edit
          </Button>
        </Modal.Actions>
      </Modal>
        </div>
    )
}
