const Person =( props )=> {
console.log("props is ",props.FullName)
  return (
    <li key={props.FullName}>{props.FullName}</li>
  )
}
export default Person