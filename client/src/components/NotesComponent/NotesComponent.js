import React, { useState, useEffect } from 'react'

//components 

import InputNote from './InputNote/InputNote'
import ListNotes from './ListNotes/ListNotes'

import './NotesComponent.scss'

export default function NotesComponent() {

  // States
  const [allNotes, setAllNotes] = useState([]);
  const [notesChange, setNotesChange] = useState(false);
  const [ skeleton, setSkeleton ] = useState(false);

  //
  const getProfile = async () => {
    try {

      const baseURL = process.env.NODE_ENV === 'production' ? `api/dashboard/notes/` : `http://localhost:5001/api/dashboard/notes/`

      const res = await fetch(baseURL, {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();

      setAllNotes(parseData);


    } catch (err) {
      console.error(err.message);
    }
  };

 
  useEffect(() => {
    getProfile();
    setNotesChange(false);
  }, [notesChange]);

    return (
        <div>
            <h2>Notes</h2>
            <InputNote setNotesChange={setNotesChange} setSkeleton={setSkeleton} />
            <ListNotes allNotes={allNotes} setNotesChange={setNotesChange} skeleton={skeleton} />
        </div>
    )
}
