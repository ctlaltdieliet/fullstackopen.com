import { useEffect, useState } from 'react';
import { Patient } from '../../types';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';

import { Male, Female } from "@mui/icons-material";


const SinglePatient = () => {
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

  console.log("patient is", patient)

  return  (
    <div>
      <div>
        <h1>{patient.name}</h1>
        <div>{patient.gender === "male" ? <Male /> : <Female />}</div>
      </div>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  ) 
};

export default SinglePatient