import patientsData from "../data/patients";
import { v1 as uuid } from "uuid"

import { Patient,PatientDataToDisplay,NewPatientEntry } from "../types";

const getPatients = () :Patient[] => { 
  return patientsData;
};

const getPatientById = (id: String) :Patient[] => { 
  const patient=patientsData.filter(patient => patient.id===id);
  return patient
};

const getPatientsToDisplay = (): PatientDataToDisplay[] => {
  return patientsData.map(({ id, name, occupation, dateOfBirth, gender }) => 
  ({id, name, occupation, dateOfBirth, gender  }));
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