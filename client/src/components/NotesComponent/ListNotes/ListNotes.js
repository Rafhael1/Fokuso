import React, {useEffect, useState} from 'react'

import EditNote from '../../NotesComponent/EditNote/EditNote'

import { Button } from 'semantic-ui-react'

export default function ListNotes({allNotes, setNotesChange}) {

  const [notes,
    setNotes] = useState([])

  const deleteNote = async id => {
    try {

      const baseURL = process.env.NODE_ENV === 'production' ? `api/dashboard/notes/${id}` : `http://localhost:5001/api/dashboard/notes/${id}`

      await fetch(baseURL, {
        method: 'DELETE',
        headers: {
          token: localStorage.token
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
      <div>
        <div className="ListNotes" >
        {
          notes.length !== 0 && notes[0].note_id !== null &&
          notes.map(note => (
            <div className="note" key={note.note_id} >
              <p>{note.description}</p>
              <EditNote note={note} className="Ebtn" setNotesChange={setNotesChange} />
              <Button color="red" className="Dbtn"  icon="trash" onClick={() => deleteNote(note.note_id)} />
            </div>
          ))  
        }
        </div>
      </div>
    </div>
  )
}
