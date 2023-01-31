import { useState,useEffect } from 'react'
import axios from 'axios'
import CountryDetail from './Components/CountryDetail'
import CountryWeather from './Components/CountryWeather'


const App = () => {
  const [countryNeedle, setCountryNeedle] = useState([])  
  const [countries, setCountries] = useState([])  
  const [countriesToShow, setCountriesToShow] = useState([])  
  const [countryDetailToShow, setCountryDetailToShow] = useState([])  

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        })
    }, [])  
   

  const handleNeedleChange=(event)=>{
    filterCountries(event.target.value)
    setCountryNeedle(event.target.value)
  }
  
  
  const HandleClick =(country) =>{
    const handler = () => {
      const api_key = process.env.REACT_APP_API_KEY
      let url="https://api.openweathermap.org/data/2.5/weather?lat="+country.capitalInfo.latlng[0]+"&lon="+country.capitalInfo.latlng[1]+"&units=metric&&appid="+api_key
      axios.get(url)
        .then(response2=>{
          country.weather=response2.data
          setCountryDetailToShow(country)
        })  
    }    
    return handler  
  }
  
  
  function filterCountries(countryNeedle){
    countryNeedle=countryNeedle.toLowerCase()
    console.log("needle is ",countries)
    let tmp=countries.filter(country=>country.name.common.toLowerCase().includes(countryNeedle))
    setCountriesToShow(tmp)
  }

  const CountriesList=()=>{
    if (countriesToShow.length>10){
      return (
          <div>
            Too many countries to display
          </div>
        )  
    }
    if (countriesToShow.length<10&&countriesToShow.length>1){
      return (
          <div>
            <ol>
              {countriesToShow.map(country=>   <li key={country.cca2}>{country.name.common} <button value={country.cca2} onClick={HandleClick(country)}>Show</button> </li>)}
            </ol>
          </div>
        )  
      }
    
  
    if (countriesToShow.length===0){
      return (
          <div>
            No countries to display
          </div>
        )  
      }
  }
  

  return(   
          <div>
             Searching for country  <input value={countryNeedle} onChange={handleNeedleChange}/>
             <CountriesList />           
             <HandleClick />
             <CountryDetail countryDetailToShow={countryDetailToShow} />
            </div>
        )

}

export default App

