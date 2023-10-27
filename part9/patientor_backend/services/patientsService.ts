import patientsData from "../data/patients";
import { v1 as uuid } from "uuid"

import { Patient,PatientDataToDisplay,NewPatientEntry } from "../types";

const getPatients = () :Patient[] => { 
  return patientsData;
};

const getPatientById = (id: string): Patient | undefined => {
	return patientsData.find((patient) => patient.id === id);
};


const getPatientsToDisplay = (): PatientDataToDisplay[] => {
  return patientsData.map(({ id, name, occupation, dateOfBirth, gender, entries }) => 
  ({id, name, occupation, dateOfBirth, gender, entries  }));
};



const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getPatientById,
  getPatientsToDisplay,
  addPatient
};