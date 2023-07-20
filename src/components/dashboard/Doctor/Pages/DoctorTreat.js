import React, { useState, useEffect } from 'react'
import backgroundImg from '../../../../assets/background1.png'
import Logo from '../../../../assets/logo3.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Config } from '../../../../config';
const DoctorTreat = () => {
  const doctor = JSON.parse(localStorage.getItem('doctor')).doctor
  const [diagnosis, setDiagnosis] = useState('');
  const [action, setaction] = useState("view");
  const [medication, setMedication] = useState('');
  const [instructions, setInstructions] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [patients, setPatients] = useState([]);
  const [treatmentPlans, settreatmentPlans] = useState([]);
  console.log(treatmentPlans)
  const fetchtreatmentplans = async (patientid) => {
    try {
      const response = await axios.get(`${Config}api/treatmentPlan/patient/${patientid}`);
      console.log(response.data)
      settreatmentPlans(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${Config}api/patient`);
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Fetch the list of patients from the server

    fetchtreatmentplans()
    fetchPatients();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create the treatment plan object
    const newTreatmentPlan ={
      patientId:selectedPatient,
      doctorId:doctor._id,
      diagnosis,
      medication,
      instructions
    };
    try {
      const response = await axios.post(`${Config}api/treatmentPlan`, newTreatmentPlan);
      alert('Treatment Plan Added')
    } catch (error) {
      console.error('Error creating treatment plan:', error);
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("ownerId");
		navigate("/doctorlogin", { replace: true });
	};

  const gotoDashboard = () => {
    navigate('/dashboard/doctors')
  }
  const gotoMedical = () => {
    navigate('/dashboard/doctormedical')
  }

  const gotoDental = () => {
    navigate('/dashboard/doctordental')
  }
  const gotoxray = () =>{
		window.open("https://huggingface.co/spaces/Arslan7788/DPCM",'_blank')
	}

  return (
    <div className='bg-no-repeat bg-cover flex' style={{ backgroundImage: `url(${backgroundImg})`, height: '120vh' }}>
      <div className='w-1/4 bg-cyan-950 flex flex-col '>
        <img src={Logo} style={{ height: '300px', width: '300px' }} className='ml-12' />
        <div className="w-full h-12 text-white flex flex-col text-center pt-2">
          <div className="bg-gray-700 border-b-2 border-gray-500 border-t-2 cursor-pointer hover:text-gray-800 hover:bg-gray-400" onClick={() => gotoDashboard()}>
            <h4 className='mt-2'>Dashboard</h4>
          </div>
          <div className="bg-gray-400 flex justify-center text-gray-800  border-b-2 border-gray-500 cursor-pointer ">
            <h4 className="mt-2">Treatment Plan</h4>
          </div>
          <div className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400" onClick={() => gotoMedical()}>
            <h4 className="mt-2 mr-2">Medical History</h4>
          </div>
          <div className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400" onClick={() => gotoDental()}>
            <h4 className="mt-2">Dental Chart</h4>
          </div>
          <div
						className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoxray()}>
						<h4 className="mt-2">Dental X-ray (ML model)</h4>
					</div>
        </div>
      </div>
      <div className='w-3/4 bg-none'>
      <div className="bg-white text-black h-12 flex">
      <h2 className="bg-white h-12 text-black font-bold font-serif ml-4 pt-2 underline">
        DOCTOR DASHBOARD
      </h2>
      <h5 className="absolute right-32 mt-2 text-xl uppercase">Welcome</h5>
      <button
      className="absolute right-4 mt-2 bg-cyan-900 w-24 h-8 text-white rounded-full"
        onClick={handleLogout}>
        Log Out
      </button>
      <h5></h5>
    </div>
    <div className="text-white mt-2">
          <h2 className="ml-60 mb-12">Treatment Plan</h2>
          <div className="flex">
            <div className="flex" style={{ width: "100%" }}>
              <button
                onClick={() => setaction("view")}
                style={{ marginLeft: 20 }}
                className="bg-cyan-800 w-2/4 hover:bg-cyan-900 h-10 rounded-lg"
              >
                View Treatment Plans
              </button>
                <button
                   onClick={() => setaction("create")}
                  style={{ marginLeft: 20 }}
                  className="bg-cyan-800 w-2/4 hover:bg-cyan-900 h-10 rounded-lg"
                >
                  Create Treatment Plan
                </button>
            </div>
          </div>
        </div>
        {action ==='view' &&         <div className="bg-white rounded-md shadow-md p-4 col-span-2" style={{
          marginTop:20
        }}>
            <h3 className="text-lg font-semibold mb-2">Treatment Plans</h3>
            <div className="flex flex-col mb-4">
            <label htmlFor="patient">Select Patient</label>
            <select
              id="patient"
              className=" text-black rounded-lg px-3 py-2"
              value={selectedPatient}
              onChange={(e) => {
                fetchtreatmentplans(e.target.value)
                setSelectedPatient(e.target.value)
              }}
            >
              {patients.map((patient) => (
                <option key={patient.id} value={patient._id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2">Patient ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Instructions</th>
                  <th className="px-4 py-2">Medication</th>
                  <th className="px-4 py-2">Diagnosis</th>
                </tr>
              </thead>
              <tbody>
                {treatmentPlans?.data?.map((history, key) => (
                  <tr key={key}>
                    <td className="px-4 py-2">
                      {history.patient.patientId && history.patient.patientId}
                    </td>
                    <td className="px-4 py-2">
                    {history.patient.name && history.patient.name}
                    </td>
                    <td className="px-4 py-2">
                      {history.instructions && history.instructions}
                    </td>
                    <td className="px-4 py-2">
                      {history.medications && history.medications}
                    </td>
                    <td className="px-4 py-2">
                      {history.diagnosis && history.diagnosis}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}
       
        {action ==='create' &&  <form className="text-white flex flex-col w-1/2 ml-80 text-center mt-24" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="patient">Select Patient</label>
            <select
              id="patient"
              className=" text-black rounded-lg px-3 py-2"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
            >
              {patients.map((patient) => (
                <option key={patient.id} value={patient._id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mb-4" >
            <label htmlFor="diagnosis" className="mb-2">
              Enter Diagnosis
            </label>
            <input
              type="text"
              id="diagnosis"
              className="text-black rounded-lg px-3 py-2 "
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="medication" className="mb-2">
              Enter Medication
            </label>
            <input
              type="text"
              id="medication"
              className="text-black rounded-lg px-3 py-2"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="instructions" className="mb-2">
              Enter Instructions
            </label>
            <textarea
              id="instructions"
              className="text-black rounded-lg px-3 py-2"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="bg-cyan-800 hover:bg-cyan-900 text-white rounded-lg px-4 py-2">
            Create Treatment Plan
          </button>
        </form>}
       

      </div>
    </div>
  )
}

export default DoctorTreat