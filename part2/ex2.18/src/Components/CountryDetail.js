const CountryDetail = (props) => {
  //console.log("props are",{props})
  let languages=Object.values(props.country.languages)
  console.log("languages are",languages)
  
  return(
    <span>
      <h1>{props.country.name.common}</h1>
    
      Capital: {props.country.capital}<br/> 
      Area: {props.country.area}
    

    <h3>Languages</h3>
    <ul>
    {languages.map(language=><li key={language}>{language}</li>)}
    </ul>
        <img src={props.country.flags.png}/>
    </span>
    )
}

export default CountryDetail