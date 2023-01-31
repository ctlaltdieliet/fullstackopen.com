  const Person=(props)=>{

return(
<li key={props.person.id}> {props.person.name} {props.person.number} <button onClick={props.removeThisPerson} >Remove </button></li>
  )
}
export default Person
