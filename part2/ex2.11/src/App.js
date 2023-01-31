import { useState,useEffect } from 'react'
import Filter from "./Components/Filter"
import Persons from "./Components/Persons"
import PersonForm from "./Components/PersonForm"
import axios from 'axios'



const App = () => {
  let peopleToShow=[]
  let firstContact=[]
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPeople(response.data)
        peopleToShow=response.data
        })
    }, [])  

  const [people, setPeople] = useState(peopleToShow)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterNeedle,setFilter]= useState('')


  const addPerson=function(event){
    event.preventDefault()
    const contact = {
      name: newName,
      id: people.length,
      number:newNumber
    }
    if (people.filter(person=>person.name ===newName).length){
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
const handleFilterChange=(event)=>{
  console.log("change")
  setFilter(event.target.value)
}
function filterNames({filterNeedle}){
  filterNeedle=filterNeedle.toLowerCase()
  peopleToShow=people.filter(person=>person.name.toLowerCase().includes(filterNeedle))
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