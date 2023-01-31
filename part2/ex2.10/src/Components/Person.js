const Person =( props )=> {
  return (
    <li key={props.id}>{props.fullname}  {props.phonenumber} </li>
  )
}
export default Person