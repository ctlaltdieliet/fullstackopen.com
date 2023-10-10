import React from 'react';
import { useState, useEffect } from "react";
import {NonSensitiveDiaryEntry,NonSensitiveDiaryArray} from "./types"

import flightService from "./services/flights"
import Flight from "./components/Flight"
import AddForm from "./components/AddForm"

function App() {
  const [flights, setFlights] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    const fetchFlightList = async () => {
      const flights = await flightService.getAll();
      console.log("flight is", flights)
      setFlights(flights);
    };
  void fetchFlightList();
  }, []);

  
  
/*        {notes.map(note =>
          <li key={note.id}>{note.content}</li>
        )}*/

  return (
    <div>
      <AddForm />
    <h2>Diary Entries</h2>
      {flights.map((flight,i) =>
        <div key={i}>
             <Flight {...flight} />
   </div>
  )}
      
  </div>
)
}

export default App;
