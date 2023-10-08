import React, { useState, useEffect } from 'react';
import { NoteObject } from './models/note';

// components
import Header from "./components/Header";
import CreateNote from "./components/CreateNote";
import Notes from "./components/Notes";

import { Box } from "@mui/material";

function App() {

  const [notes, setNotes] = useState<NoteObject[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem('notes')) {
      setNotes(JSON.parse(sessionStorage.getItem('notes') as string));
    }
  }, [])


  const addNote = (note: NoteObject) => {
    setNotes([ note, ...notes ]); //change the position of note and notes to print latest notes added in front or back 
    console.log(sessionStorage);
    sessionStorage.setItem('notes', JSON.stringify([ note, ...notes ]));
  }

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes); 
    sessionStorage.setItem('notes', JSON.stringify(updatedNotes));
  }


  return (
    <>
      <Header />
      <Box style={{ padding:20 }}>
        <CreateNote addNote={addNote} />
        <Notes notes={notes} deleteNote={deleteNote} />
      </Box>
    </>
  );
}

export default App;
