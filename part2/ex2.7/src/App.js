import { useState } from 'react'
import Person from "./Components/Person"


const App = () => {
  const firstContact={fullname:"Someone",id:0}
  const [people, setPeople] = useState([firstContact])
  const [newName, setNewName] = useState('')

  const addPerson=function(event){
    event.preventDefault()
    const contact = {
      fullname: newName,
      id: people.length,
    }
    if (people.filter(person=>person.fullname ===newName).length){
      alert(newName+" is already part of the addressbook")
    }
    else {
    setPeople(people.concat(contact))
    }
    console.log(people)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)    
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input 
                  value={newName} 
                  onChange={handleNameChange}
                  />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {people.map(person1 =><Person id={person1.id} fullname={person1.fullname} /> )
      }

</ul> 
    </div>
  )
}

export default App