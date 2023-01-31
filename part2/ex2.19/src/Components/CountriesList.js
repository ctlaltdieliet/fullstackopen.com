import CountryDetail from './CountryDetail'
const Countrieslist = (props) => {
let countries=props.countries


const handleClick =(country) =>{
  const handler = () => {
        console.log('hello', country)
        }    
    return handler  
}

console.log("length is ",countries.length)
  if (countries.length>10){
    return (
        <div>
          Too many countries to display
        </div>
      )  
  }
  if (countries.length<10&&countries.length>0){
    return (
        <div>
          <ol>
            {countries.map(country=>   <li key={country.cca2}>{country.name.common} <button value={country.cca2} onClick={handleClick(country)}>Show</button> </li>)}
          </ol>
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