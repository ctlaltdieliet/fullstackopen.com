const Country = (props) => {
  console.log("props are",{props})
  return(
    <li key={props.country.cca2}>{props.country.name.common}  </li>
    )
}

export default Country