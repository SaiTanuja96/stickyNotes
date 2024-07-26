import { useState } from 'preact/hooks'
import NotesPage from './Pages/NotesPage'
import NoteProvider from "./context/NoteContext";

export function App() {

  return (
    <div id='app'>
      <NoteProvider>
      <NotesPage/>

      </NoteProvider>
    </div>
  )
}
