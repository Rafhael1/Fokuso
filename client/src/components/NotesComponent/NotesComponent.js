import React, { useState, useEffect } from 'react'

//components 

import InputNote from './InputNote/InputNote'
import ListNotes from './ListNotes/ListNotes'

export default function NotesComponent() {

    const [allNotes, setAllNotes] = useState([]);
  const [notesChange, setNotesChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/notes", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
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
            <InputNote setNotesChange={setNotesChange} />
            <ListNotes allNotes={allNotes} setNotesChange={setNotesChange} />
        </div>
    )
}
