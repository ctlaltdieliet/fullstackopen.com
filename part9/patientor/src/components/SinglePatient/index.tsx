import { useEffect, useState } from 'react';
import { Patient, Diagnosis, Entry,HealthCheckRating} from '../../types';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import diagnosisService from "../../services/diagnosis";
import {Male,Female,Favorite,LocalHospital,HomeRepairService,VerifiedUser} from "@mui/icons-material";
import { green, yellow, orange, red } from '@mui/material/colors';

const assertNever = (value: never): never => {
  throw new Error(
    `Oops, something went wrong: ${JSON.stringify(value)}`
  );
};

const EntryDetail: React.FC<{ entry: Entry; diagnosis: Diagnosis[] }> = ({
  entry,
  diagnosis,
}) => {
  const renderDiagnosesNames = (
    diagnosisCodes: string[] | undefined
  ): JSX.Element[] | null => {
    if (!diagnosisCodes) {
      return null;
    }

    return diagnosisCodes?.map((diagnosisCode) => {
      const diagnoseObj = diagnosis.find((diagnose) =>
        diagnose.code === diagnosisCode ? diagnose : undefined
      );
      return (
        <li key={diagnosisCode}>
          {diagnosisCode} {diagnoseObj?.name}{" "}
        </li>
      );
    });
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <>
          <div>
            <p>
              {entry.date} {renderTypeIcon(entry.type)} ({entry.type})
            </p>
          </div>
          <div>{entry.description}</div>
          <ul>{renderDiagnosesNames(entry.diagnosisCodes)}</ul>
          <div className="pt-4">diagnose by {entry.specialist}</div>
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <div>
            <p>
              {entry.date} {renderTypeIcon(entry.type)} ({entry.type}){" "}
              {entry.employerName}
            </p>
          </div>
          <div>{entry.description}</div>
          <ul>{renderDiagnosesNames(entry.diagnosisCodes)}</ul>
          <div className="pt-4">diagnose by {entry.specialist}</div>
        </>
      );
    case "HealthCheck":
      return (
        <>
          <div>
            <p>
              {entry.date} {renderTypeIcon(entry.type)} ({entry.type})
            </p>
          </div>
          <div>{entry.description}</div>
          <div>{renderHeartAndColorByRating(entry.healthCheckRating)}</div>
          <ul>{renderDiagnosesNames(entry.diagnosisCodes)}</ul>
          <div className="pt-4">diagnose by {entry.specialist}</div>
        </>
      );
    default:
      return assertNever(entry);
  }
};

const renderTypeIcon = (type: string) => {
  switch (type) {
    case "Hospital":
      return <LocalHospital />;
    case "OccupationalHealthcare":
      return <HomeRepairService />;
    case "HealthCheck":
      return <VerifiedUser />;

    default:
      return <></>;
  }
};

const renderHeartAndColorByRating = (healthCheckRating: HealthCheckRating) => {
  switch (healthCheckRating) {
    case 0:
      return <Favorite sx={{ color: green[500] }} />;
    case 1:
      return <Favorite sx={{ color: yellow[500] }} />;
    case 2:
      return <Favorite sx={{ color: orange[500] }} />;
    case 3:
      return <Favorite sx={{ color: red[500] }} />;

    default:
      return <></>;
  }
};

const SinglePatient = () => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

useEffect(() => {
const getDiagnoses = async (): Promise<void> => {
  const diagnoses = await diagnosisService.getAll();
  setDiagnosis(diagnoses);
};
getDiagnoses();
}, []);


  const id = useParams().id;
	const [patient, setPatient] = useState<Patient>({} as Patient);
  


	useEffect(() => {
    const getThisPatient = async () => {
      if (!id) return;
      const patient = await patientService.getThisPatient(id);
      setPatient(patient);
    };
    getThisPatient();
	}, [id]);

if (patient.entries){      
  console.log("pppp",patient)
  return  (
    <div>
 <div>
        <h1>{patient.name}</h1>
        <div>{patient.gender === "male" ? <Male /> : <Female />}</div>
      </div>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
      {patient.entries && patient.entries.length ? (
        <div>
          {patient.entries.map((entry) => {
            return (
              <div key={entry.id} >
                <EntryDetail entry={entry} diagnosis={diagnosis} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>no entries available</div>
      )}       
</div>
  ) 
} else {
  return <div>No patient</div>
}



};

export default SinglePatient