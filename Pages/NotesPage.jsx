import React,{useEffect,useState} from 'react'
// import { fakeData as notes } from "../assets/fakeData.js";
import { db } from "../appwrite/databases";
import NoteCard from "../components/NoteCard";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import Controls from '../components/Controls';
const NotesPage = () => {
    const { notes, setNotes } = useContext(NoteContext); 
    // useEffect(() => {
    //     init();
    // }, []);
 
    // const init = async () => {
    //     const response = await db.notes.list();
    //     setNotes(response.documents);
    // };
  return (
    <div>
          {notes.map((note) => (
                <NoteCard note={note} key={note.$id}  setNotes={setNotes}/>
            ))}
            <Controls />
    </div>
  )
}

export default NotesPage