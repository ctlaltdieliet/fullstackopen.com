import React, { SyntheticEvent } from 'react';
import { useState, useEffect } from "react";

import { NonSensitiveDiaryEntry, NewDiaryEntry } from "./types";
import flightService from "./services/flights"
import Flight from "./components/Flight"
import axios from 'axios';


function App() {
  const [flights, setFlights] = useState<NonSensitiveDiaryEntry[]>([]);
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  useEffect(() => {
    const fetchFlightList = async () => {
      const flights = await flightService.getAll();
      console.log("flight is", flights)
      setFlights(flights);
    };
  void fetchFlightList();
  }, []);

  /*createDiary({ date, visibility, weather, comment })
      .then(data => {
        setDiaries(diaries.concat(data));
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(error.response.data.replace('Something went wrong.', ''));
            setTimeout(() => {
              setError('');
            }, 5000);
          } else console.log(error);
        } else {
          console.log(error);
        }
      });*/


  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newFlight:NewDiaryEntry=({date:date,weather:weather, visibility:visibility, comment:comment})
    console.log("NEW FLIGHT IS",newFlight)
    flightService.create(newFlight)
      .then((data) => { const addedFlight:NonSensitiveDiaryEntry ={date:date,weather:data.weather, visibility:data.visibility}
      setFlights(flights.concat(addedFlight))
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          console.log(err.response?.data);
          const  errorText:string=err.response?.data.split("Something went wrong: ")
          setTimeout(() => {
            setError(errorText[1]);
          }, 3000);
        }
      });
     setDate("")
    setVisibility("")
    setWeather("");
    setComment("")
  };

  
/*        {notes.map(note =>
          <li key={note.id}>{note.content}</li>
        )}*/

  return (
    <>
<h2>Add new entry</h2>  
<div style={{ color: 'red' }}>{error}</div>
<table>
      <tr>
        <td><strong>Date</strong></td>
        <td><input type="text" id="date" name="date" value={date} onChange={event => setDate(event.target.value)} /></td>
      </tr>
      <tr>
        <td><strong>Visibility</strong></td>
        <td><input type="text" id="Visibility" name="Visibility"   value={visibility} onChange={event => setVisibility(event.target.value)}/>
        </td>
      </tr>
      <tr>
        <td><strong>Weather</strong></td>
        <td><input type="text" id="Weather" name="Weather" value={weather} onChange={event => setWeather(event.target.value)}/>
        </td>
      </tr>
      <tr>
        <td><strong>Comment</strong></td>
        <td><input type="text" id="Comment" name="Comment" value={visibility} onChange={event => setVisibility(event.target.value)}/>
        </td>
      </tr>
    </table>
    <button  value="add" onClick={handleSubmit} >Add</button>
       <h2>Diary Entries</h2>
      {flights.map((flight,i) =>
        <div key={i}>
             <Flight {...flight} />
   </div>
  )}
      </>
  
)
}

export default App;
