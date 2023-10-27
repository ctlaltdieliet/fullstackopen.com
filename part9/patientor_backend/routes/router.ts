import express from "express"
import cors from "cors"

import diagnosesService from "../services/diagnosesService";
import patientsService from "../services/patientsService";
import { NewPatientEntry } from '../types';

const router = express.Router();

router.use(cors())
router.get("/ping", (_req, res) => {
  console.log("someone pinged here")
  res.send("pong")
})


router.get("/diagnoses", (_req, res) => {
  res.json(diagnosesService.getEntries())
});

router.get("/patients", (_req, res) => {
  res.json(patientsService.getPatientsToDisplay())
});

router.get("/patients/:id", (req, res) => {
  const patientId= req.params.id
  const patient=patientsService.getPatientById(patientId)
  res.json(patient)
});


router.post('/patients', (req, res) => {
  const newEntry: NewPatientEntry = { name:req.body.name, dateOfBirth:req.body.dateOfBirth, ssn:req.body.ssn, gender:req.body.gender, occupation:req.body.occupation, entries: req.body.entries }
  
  const addedEntry: NewPatientEntry = patientsService.addPatient(
    newEntry
  );
  res.json(addedEntry);
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!")
});

export default router;