import React, {useEffect, useState} from 'react'

import EditNote from '../../NotesComponent/EditNote/EditNote'

import { Button } from 'semantic-ui-react'

export default function ListNotes({allNotes, setNotesChange}) {

  const [notes,
    setNotes] = useState([])

  const deleteNote = async id => {
    try {
      await fetch(`http://localhost:5000/dashboard/notes/${id}`, {
        method: 'DELETE',
        headers: {
          jwt_token: localStorage.token
        }
      })

      setNotes(notes.filter(note => note.note_id !== id))

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    setNotes(allNotes)
}, [allNotes])


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="ListNotes" >
            {
                notes.length !== 0 && notes[0].note_id !== null &&
                notes.map(note => (
                    <tr key={note.note_id}>
                      <div className="note" >
                      <td>{note.description.length >= 15 ? note.description.substring(0,25) : note.description}</td>
                      <td><EditNote note={note} className="Ebtn" setNotesChange={setNotesChange} /></td>
                      <td><Button color="red" className="Dbtn"  icon="trash" onClick={() => deleteNote(note.note_id)} /></td>
                      </div>
                    </tr>
                )) 
            }
        </tbody>
      </table>
    </div>
  )
}
