"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default;
};
const getPatientById = (id) => {
    return patients_1.default.find((patient) => patient.id === id);
};
const getPatientsToDisplay = () => {
    return patients_1.default.map(({ id, name, occupation, dateOfBirth, gender, entries }) => ({ id, name, occupation, dateOfBirth, gender, entries }));
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = {
    getPatients,
    getPatientById,
    getPatientsToDisplay,
    addPatient
};
