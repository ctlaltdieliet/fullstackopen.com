import { useState, useEffect } from 'react'
import Note from './Components/Note'
import Footer from './Components/Footer'
import noteService from './Services/Note'
import './index.css'

const App = () => {
  const [notes, setNotes] = useState([])  
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  
  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
  },
  [])
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
  
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  const handleNoteChange = (event) => {
        console.log(event.target.value)    
        setNewNote(event.target.value)  
      }
  const addNote = (event) => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    date: new Date().toISOString(),
    important: Math.random() < 0.5,
  }
  noteService
    .create(noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
}
const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)
return (
  <div>
    <h1>Notes</h1>
    <div>
      <button onClick={() => setShowAll(!showAll)}>          show {showAll ? 'important' : 'all' }
      </button>
      <Notification message={errorMessage} />
    </div>
    <ul>
      {notesToShow.map(note =>
        <Note key={note.id} note={note}    toggleImportance={() => toggleImportanceOf(note.id)} />
      )}
    </ul>
    <form onSubmit={addNote}>
      <input 
        value={newNote} 
        onChange={handleNoteChange}
      />        
      <button type="submit">save</button>
    </form>   
    <Footer />
  </div>
  )
}
export default App 
