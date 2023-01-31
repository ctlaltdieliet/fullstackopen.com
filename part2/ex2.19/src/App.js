import { useState,useEffect } from 'react'
import axios from 'axios'
import CountryDetail from './Components/CountryDetail'


const App = () => {
  const [countryNeedle, setCountryNeedle] = useState([])  
  const [countries, setCountries] = useState([])  
  const [countriesToShow, setCountriesToShow] = useState([])  
  const [countryDetailToShow, setCountryDetailToShow] = useState([])  
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        })
    }, [])  

  
  const handleNeedleChange=(event)=>{
    console.log(event.target.value)
    filterCountries(event.target.value)
    setCountryNeedle(event.target.value)
  }
  
  
  const HandleClick =(country) =>{
    const handler = () => {
      console.log("country is clicked",country)
      setCountryDetailToShow({country})
          
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
  
  console.log({countryDetailToShow})

  return(   
          <div>
             Searching for country  <input value={countryNeedle} onChange={handleNeedleChange}/>
             <CountriesList />           
             <HandleClick />
             <CountryDetail props={countryDetailToShow} />
          </div>
        )

}

export default App

