export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
interface sickLeave {
  startDate: string;
  endDate: string;
}


interface discharge {
  date: string;
  criteria: string;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string
 sickLeave?:sickLeave ;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: discharge;
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

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

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;
export type PatientDataToDisplay = Omit<Patient, "ssn" | "entries">
export type NewPatientEntry = Omit<Patient, "id" >;
export type NonSensitivePatient = Omit<Patient, "ssn" >;
