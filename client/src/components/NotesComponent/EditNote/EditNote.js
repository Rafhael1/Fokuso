import React, { useState } from 'react'

import { Button, Modal, Input } from 'semantic-ui-react'
import './EditNote.scss'

export default function EditNote({note, setNotesChange}) {

    const [description, setDescription] = useState(note.description);

    const updateNote = async(e) => {
      e.preventDefault();
      try {
        const body = { description };

        const myHeaders = new Headers()

        myHeaders.append("Content-type", "application/json")
        myHeaders.append("token", localStorage.token)

        const baseURL = process.env.NODE_ENV === 'production' ? `api/dashboard/notes/${note.note_id}` : `http://localhost:5001/api/dashboard/notes/${note.note_id}`

        await fetch(baseURL, {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body)
        });
        setNotesChange(true)

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
       data-target={`#id${note.note_id}`} 
       icon="edit"
       color="yellow"
       className="Ebtn"
       onClick={() => dispatch({ type: 'open', size: 'tiny' })}
       >
      </Button>

      <Modal
        size={size}
        open={open}
        onClose={() => { 
          dispatch({ type: 'close' })
          setDescription(note.description)
        }}
        id={note.note_id}
      >
        <Modal.Header>Edit Note</Modal.Header>
        <Modal.Content>
          <Input className="EditInput" placeholder='Edit Note...' value={description} onChange={e => setDescription(e.target.value)} />
        </Modal.Content>
        <Modal.Actions>
          <Button inverted color="red" onClick={() => {
             dispatch({ type: 'close' });
             setDescription(note.description)
             }}>
            Cancel
          </Button>
          <Button  color="green" onClick={(e) => {
            dispatch({ type: 'close' });
            updateNote(e);
             }}>
            Edit
          </Button>
        </Modal.Actions>
      </Modal>
        </div>
    )
}
