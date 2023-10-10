import {NonSensitiveDiaryEntry} from "../types";
const Flight = (flight: NonSensitiveDiaryEntry) => {

  return(
    <div>
      <strong>{flight.date}</strong><br/>
      Visibility: {flight.visibility}<br/>
      Weather: {flight.weather}<p/>
    </div>
  )
};  
export default Flight;