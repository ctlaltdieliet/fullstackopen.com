import Person from "./Person"
const Persons=(props)=>{
  return(
  <ul>
{props.peopleToShow.map((person1,i) =><Person key={i} phonenumber={person1.phonenumber} fullname={person1.fullname} />)}
  </ul>
  )
}
export default Persons
