const Person =( props )=> {
  return (
    <li key={props.id}>{props.fullname}</li>
  )
}
export default Person