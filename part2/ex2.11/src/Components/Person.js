const Person =( props )=> {
  return (
    <li key={props.id}>{props.name}  {props.number} </li>
  )
}
export default Person