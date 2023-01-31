import { useState } from 'react'
import Person from "./Components/Person"

class Contact{
  constructor(fullname) {
    this.fullname = fullname
  }
}

const App = () => {
  const [people, setPeople] = useState([new Contact("Someone")])
  const [newName, setNewName] = useState('')

  const addPerson=function(event){
    event.preventDefault()
    setPeople(people.concat(new Contact(newName) ))
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
      {people.map(person1 =><Person FullName={person1.fullname}/> )}

</ul> 
    </div>
  )
}

export default App