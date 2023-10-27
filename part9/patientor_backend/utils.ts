import { NewPatientEntry,Gender,Entry } from "./types";


const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString= (param: unknown) : string => {
  if (!isString(param) ) {
    throw new Error("Incorrect string: " + param);
  }
  return param;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
}

const parseGender = (gender: unknown): Gender => {
  if ( !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};
//const parseEntries = (entries: unknown): Entry[] => {
//  console.log(entries)
//  const entriesToReturn:Entry[]=[]
//  return entriesToReturn
//};


const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !(entries instanceof Array)) {
    return new Array<Entry>();
  }

  const parsed = entries.map((entry) => {
    if (!("type" in entry)) {
      throw new Error("Entry is missing type.");
    }

    return entry as Entry;
  });

  return parsed;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== "object" ) {
    throw new Error("Incorrect or missing data");
  }

  if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object && "entries" in object )  {
    const newEntry: NewPatientEntry = {
      // eslint-disable-next-line indent
        name :parseString(object.name),
      dateOfBirth :parseDate(object.dateOfBirth),
      ssn:parseString(object.ssn),
      gender:parseGender(object.gender),
      occupation:parseString(object.occupation),
      entries: parseEntries(object.entries),
    };
    return newEntry;
  }
  else {
    throw new Error("Incorrect data: a field missing")
  }
}

export default toNewPatientEntry