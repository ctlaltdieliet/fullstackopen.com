import { useState,useEffect } from 'react'
import Filter from "./Components/Filter"
import Persons from "./Components/Persons"
import PersonForm from "./Components/PersonForm"
import axios from 'axios'



const App = () => {
  const [peopleToShow,setPeopleToShow]= useState([])
  const [people, setPeople] = useState(peopleToShow)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterNeedle,setFilter]= useState('')
  
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPeopleToShow(response.data)
        setPeople(response.data)
        filterNames({filterNeedle})
        })
    }, [])  


  const addPerson=function(event){
    event.preventDefault()
    const contact = {
      name: newName,
      number:newNumber
    }
    if (people.filter(person=>person.name ===newName).length){
      alert(newName+" is already part of the addressbook")
    }
    else {
      axios
      .post('http://localhost:3001/persons',contact)
      .then(response => {
        console.log('promise fulfilled')
        setPeople(people.concat(contact))
        })
      setPeopleToShow(people.concat(contact))
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
  console.log("change filter to", event.target.value)
  setFilter(event.target.value)
  filterNames(event.target.value)
}
function filterNames(filterNeedle){
  console.log("people =",peopleToShow)
  filterNeedle=filterNeedle.toLowerCase()
  let peopleToShow_=people.filter(person=>person.name.toLowerCase().includes(filterNeedle))
  setPeopleToShow(peopleToShow_)
  console.log("people to show filtername",peopleToShow)
}
//console.log("filter is ",{filterNeedle})

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