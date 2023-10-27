"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//import diagnosesService from "../services/diagnosesService";
const patientsService_1 = __importDefault(require("../services/patientsService"));
const router = express_1.default.Router();
router.use((0, cors_1.default)());
router.get("/ping", (_req, res) => {
    console.log("someone pinged here");
    res.send("pong");
});
router.get("/diagnoses", (_req, res) => {
    res.json({});
});
router.get("/patients", (_req, res) => {
    res.json(patientsService_1.default.getPatientsToDisplay());
});
router.get("/patients/:id", (req, res) => {
    const patientId = req.params.id;
    const patient = patientsService_1.default.getPatientById(patientId);
    res.json(patient);
});
router.post('/patients', (req, res) => {
    const newEntry = { name: req.body.name, dateOfBirth: req.body.dateOfBirth, ssn: req.body.ssn, gender: req.body.gender, occupation: req.body.occupation, entries: req.body.entries };
    const addedEntry = patientsService_1.default.addPatient(newEntry);
    res.json(addedEntry);
});
router.post("/", (_req, res) => {
    res.send("Saving a diary!");
});
exports.default = router;
