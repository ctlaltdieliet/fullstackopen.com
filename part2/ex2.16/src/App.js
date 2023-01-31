import { useState,useEffect } from 'react'
import Filter from "./Components/Filter"
import Person from "./Components/Person"
import PersonForm from "./Components/PersonForm"
import PersonsService from "./Services/PersonsService"
import './index.css'

const Notification = ({ notification }) => {
  if (notification === '') {
    return null
  }

  return (
    <div className='error'>
      {notification}
    </div>
  )
}



const App = () => {
  const [peopleToShow,setPeopleToShow]= useState([])
  const [people, setPeople] = useState(peopleToShow)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterNeedle,setFilter]= useState('')
  const [notification, setNotifcation] = useState('')
  
  
  useEffect(() => {
    console.log('effect')
    PersonsService.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPeopleToShow(response)
        setPeople(response)
        })
    }, [])  


const clearNotification=()=>{setNotifcation("")}
  
const addPerson=function(event){
    event.preventDefault()
    const contact = {
      name: newName,
      number:newNumber
    }
    if (people.filter(person=>person.name ===newName).length){
      let oldPerson=people.filter(person=>person.name ===newName)
      console.log("old person is",oldPerson[0].name)
      let yesUpdate=window.confirm("Are you sure you want to update the number for "+oldPerson[0].name)
      if (yesUpdate){
        const contact = {
          name: newName,
          number:newNumber,
          id:oldPerson[0].id
        }
        console.log("id="+oldPerson[0].id)
        PersonsService.update(oldPerson[0].id,contact)
        .then(response => {
        setPeopleToShow(people.concat(contact))
        setPeople(people.concat(contact))
      })    
      }
    }
    else {
      const contact = {
        name: newName,
        number:newNumber
      }
      PersonsService.add(contact)
      .then(response => {
        console.log("adding")
        setNotifcation(newName+ " is added to the addressbook" )
        setPeopleToShow(people.concat(contact))
      setPeople(people.concat(contact))
      
    })
    .then(response => {setTimeout(clearNotification,2000)
  })
  }
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)    
  }


  const removePerson = person => {
    let yesdelete=window.confirm("Are you sure you want to delete "+person.name+"a")
    if (yesdelete){
      PersonsService
      .remove(person.id).then(toReturn=> {
        console.log(toReturn)
        setFilter(String(""))
 
      })
      .then(response => {
        PersonsService.getAll()
        .then(response => {
          console.log('promise once more fulfilled',response)
          setPeople(response)
          setPeopleToShow(response)
          })
      
        })
      .catch(error => {
          console.log("",error)
          filterNames(String(""))

      })}
    }
 
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)    
  }
const handleFilterChange=(event)=>{
  console.log("change filter to", event.target.value)
  setFilter(event.target.value)
  filterNames(String(event.target.value))
}
function filterNames(filterNeedle){
  PersonsService.getAll()
  .then(response => {
    console.log('promise fulfilled')
    setPeople(response)
    })

  filterNeedle=filterNeedle.toLowerCase()
  let peopleToShow_=people.filter(person=>person.name.toLowerCase().includes(filterNeedle))
  setPeopleToShow(peopleToShow_)
  setPeople(peopleToShow_)
  console.log("people to show filtername",peopleToShow)
}


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filterNeedle={filterNeedle}  onChange={handleFilterChange}  />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}  handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}/> 


      <h3>Numbers</h3>
      <ul>
      {peopleToShow.map(person => 
        <Person  person={person}    removeThisPerson={() => removePerson(person)} />
      )}
      </ul>
    </div>
  )
}

export default App

