import { useState } from 'react'
import Filter from "./Components/Filter"
import Persons from "./Components/Persons"
import PersonForm from "./Components/PersonForm"


const App = () => {
  var peopleToShow=[{ fullname: 'Arto Hellas', phonenumber: '040-123456', id: 0 },
  { fullname: 'Ada Lovelace', phonenumber: '39-44-5323523', id: 1 },
  { fullname: 'Dan Abramov', phonenumber: '12-43-234345', id: 2 },
  { fullname: 'Mary Poppendieck', phonenumber: '39-23-6423122', id: 3 }]
 
  const firstContact=[{ fullname: 'Arto Hellas', phonenumber: '040-123456', id: 0 },
  { fullname: 'Ada Lovelace', phonenumber: '39-44-5323523', id: 1 },
  { fullname: 'Dan Abramov', phonenumber: '12-43-234345', id: 2 },
  { fullname: 'Mary Poppendieck', phonenumber: '39-23-6423122', id: 3 }]
  const [people, setPeople] = useState(firstContact)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterNeedle,setFilter]= useState('')


  const addPerson=function(event){
    event.preventDefault()
    const contact = {
      fullname: newName,
      id: people.length,
      phonenumber:newNumber
    }
    if (people.filter(person=>person.fullname ===newName).length){
      alert(newName+" is already part of the addressbook")
    }
    else {
    setPeople(people.concat(contact))
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)    
  }
 

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)    
  }
// console.log("zzzz",people.filter(person=>person.fullname.toLowerCase().includes({filterNeedle}.toLowerCase())))
const handleFilterChange=(event)=>{
  console.log("change")
  setFilter(event.target.value)
}
function filterNames({filterNeedle}){
  filterNeedle=filterNeedle.toLowerCase()
  peopleToShow=people.filter(person=>person.fullname.toLowerCase().includes(filterNeedle))
  console.log("people to show filtername",peopleToShow)
  return peopleToShow
}
//console.log("filter is ",{filterNeedle})
peopleToShow=filterNames({filterNeedle})
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterNeedle={filterNeedle}  onChange={handleFilterChange}  />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}/> 


      <h3>Numbers</h3>
      <Persons peopleToShow={peopleToShow}/>
    </div>
  )
}

export default App

/*
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter ... />

      <h3>Add a new</h3>

      <PersonForm 
        ...
      />

      <h3>Numbers</h3>

      <Persons ... />
    </div>
  )*/