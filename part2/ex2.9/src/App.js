import { useState } from 'react'
import Person from "./Components/Person"


const App = () => {
  var peopleToShow=[{ fullname: 'Arto Hellas', phonenumber: '040-123456', id: 0 },
  { fullname: 'Ada Lovelace', phonenumber: '39-44-5323523', id: 1 },
  { fullname: 'Dan Abramov', phonenumber: '12-43-234345', id: 2 },
  { fullname: 'Mary Poppendieck', phonenumber: '39-23-6423122', id: 3 }]
 
  const [people, setPeople] = useState(peopleToShow)
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

  const handleFilterChange=(event)=>{  
  setFilter(event.target.value)
}

function filterNames({filterNeedle}){
  filterNeedle=filterNeedle.toLowerCase()
  peopleToShow=people.filter(person=>person.fullname.toLowerCase().includes(filterNeedle))
  console.log("people to show filtername",peopleToShow)
  return peopleToShow
}
peopleToShow=filterNames({filterNeedle})
 
return (
    <div>
      <h2>Phonebook</h2>
      Filter <input value={filterNeedle} onChange={handleFilterChange}/>
      <form onSubmit={addPerson}>
        <div>
          Name: <input 
                  value={newName} 
                  onChange={handleNameChange}
                  />
        </div>
        <div>
          Number: <input 
                  value={newNumber} 
                  onChange={handleNumberChange}
                  />
        </div>
     
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {peopleToShow.map(person1 =><Person key={person1.id} phonenumber={person1.phonenumber} fullname={person1.fullname} /> )}
        </ul> 
    </div>
  )
}

export default App