import { useState,useEffect } from 'react'
import axios from 'axios'
import CountriesList from './Components/CountriesList'


const App = () => {
  const [countryNeedle, setCountryNeedle] = useState([])  
  const [countries, setCountries] = useState([])  
  const [countriesToShow, setCountriesToShow] = useState([])  

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
  
      
  
  function filterCountries(countryNeedle){
    countryNeedle=countryNeedle.toLowerCase()
    console.log("needle is ",countries)
    let tmp=countries.filter(country=>country.name.common.toLowerCase().includes(countryNeedle))
    setCountriesToShow(tmp)
  }
  
  return(   
          <div>
             Searching for country  <input value={countryNeedle} onChange={handleNeedleChange}/>
           
            <CountriesList countriesToShow={countriesToShow}/>
          </div>
        )

}

export default App

