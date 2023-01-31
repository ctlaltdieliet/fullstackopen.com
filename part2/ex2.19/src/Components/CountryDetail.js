const CountryDetail = (props) => {
  //console.log("Countrydeatails are",props.props.country)

  if (props.props.length=== 0) {
return(<div>Nothing to see here</div>) 
}
else {
  let languages=Object.values(props.props.country.languages)
 return(
    <span>
      <h1>{props.props.country.name.common}</h1>
        Capital: {props.props.countrycapital}<br/> 
        Area: {props.props.country.area}
      <h3>Languages</h3>
        <ul>
          {languages.map(language=><li key={language}>{language}</li>)}
        </ul>
      <img src={props.props.country.flags.png}/>
    </span>
  )  
 }
}

export default CountryDetail