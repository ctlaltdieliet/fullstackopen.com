import CountryWeather from "./CountryWeather"

const CountryDetail = (countryDetailToShow) => {
  
  console.log("DETAL is",countryDetailToShow)
  if (countryDetailToShow.countryDetailToShow.length=== 0) {
return(<div>Nothing to see here</div>) 
}
else {
   let languages=Object.values(countryDetailToShow.countryDetailToShow.languages)
 return(
    <span>
      <h1>{countryDetailToShow.countryDetailToShow.name.common}</h1>
        Capital: {countryDetailToShow.countryDetailToShow.countrycapital}<br/> 
        Area: {countryDetailToShow.countryDetailToShow.area}
      <h3>Languages</h3>
        <ul>
          {languages.map(language=><li key={language}>{language}</li>)}
        </ul>
      <img src={countryDetailToShow.countryDetailToShow.flags.png}/>
      <h1>Weather in {countryDetailToShow.countryDetailToShow.capital}</h1>
      <CountryWeather props={countryDetailToShow}/>
    </span>
  )
 }
}

export default CountryDetail