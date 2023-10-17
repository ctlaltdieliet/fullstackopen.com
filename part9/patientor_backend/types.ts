export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export interface Entry {
}



export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]}


export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other"
}

export type PatientDataToDisplay = Omit<Patient, "ssn"  | "entries">
export type NewPatientEntry = Omit<Patient, "id" >;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
