import React, { useState } from 'react'

import { Button, Icon, Modal, Input } from 'semantic-ui-react'

export default function EditTodo({todo}) {

    const [description, setDescription] = useState(todo.description);

    const updateTodo = async(e, d) => {
      e.preventDefault();
      try {
        const body = { description };
        const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
          method: "PUT",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(body)
        });

       window.location = "/";

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
       onClick={() => dispatch({ type: 'open', size: 'tiny' })}
       >
        Edit
      </Button>

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
          <Input placeholder='Edit Todo...' value={description} onChange={e => setDescription(e.target.value)} />
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
