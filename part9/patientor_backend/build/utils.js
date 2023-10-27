"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseString = (param) => {
    if (!isString(param)) {
        throw new Error("Incorrect string: " + param);
    }
    return param;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect date: " + date);
    }
    return date;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(param);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};
//const parseEntries = (entries: unknown): Entry[] => {
//  console.log(entries)
//  const entriesToReturn:Entry[]=[]
//  return entriesToReturn
//};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {
        const newEntry = {
            // eslint-disable-next-line indent
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
            entries: []
        };
        return newEntry;
    }
    else {
        throw new Error("Incorrect data: a field missing");
    }
};
exports.default = toNewPatientEntry;
