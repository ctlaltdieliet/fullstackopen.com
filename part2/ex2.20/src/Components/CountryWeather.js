import axios from 'axios'


const CountryWeather = (props) => {
  const urlIcon="http://openweathermap.org/img/wn/"+props.props.countryDetailToShow.weather.weather[0].icon+".png"
return (<div>
  <div>Temperature is {props.props.countryDetailToShow.weather.main.temp} degrees Celcius</div>
  <div>Wind is {props.props.countryDetailToShow.weather.wind.speed} m/s</div>
  <img width="200px" heigth="200px" border="1" alt="weather icon" src={urlIcon}/>
</div>)  
}
export default CountryWeather