import Person from "./Person"
const Persons=(props)=>{
  return(
  <ul>
{props.peopleToShow.map((person1,i) =><Person key={i} number={person1.number} name={person1.name} />)}
  </ul>
  )
}
export default Persons
