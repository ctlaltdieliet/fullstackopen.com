import Country from './Country'
import CountryDetail from './CountryDetail'
const Countrieslist = (props) => {
let countries=props.countriesToShow
  console.log("length is ",countries.length)
  if (countries.length>10){
    return (
        <div>
          Too many countries to display
        </div>
      )  
  }
  if (countries.length<10&&countries.length>1){
    return (
        <div>
          <ol>
            {countries.map(country=><Country country={country}/>)}
          </ol>
        </div>
      )  
    }
  if (countries.length===1){
    return (
        <div>    
          {countries.map(country=><CountryDetail country={country}/>)}
        </div>
      )  
    }
  
  if (countries.length===0){
    return (
        <div>
          No countries to display
        </div>
      )  
    }



  return(<div>
    </div>)
}

export default Countrieslist