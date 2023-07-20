import React, { useEffect, useState } from "react";
import backgroundImg from "../../../../assets/background1.png";
import Logo from "../../../../assets/logo3.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Config } from "../../../../config";
const PatientMedical = () => {
	const navigate = useNavigate();
	const [medicalHistory, setMedicalHistory] = useState([]);
	const [user, setuser] = useState(JSON.parse(localStorage.getItem('patient')));
	console.log(user)
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("ownerId");
		navigate("/login", { replace: true });
	};
	const inputhandler = (e) =>{
		setPatientId(e.target.value)
	}
	const gotoPatientDashboard = () => {
		navigate("/dashboard/patients");
	};
	const gotoPatientAppoint = () => {
		navigate("/dashboard/patientappoint");
	};

	const gotoPatientProfile = () => {
		navigate("/dashboard/patientprofile");
	};
	const getsinglemedicalrecord = () => {
		if(user!==''){
			axios
			.get(`${Config}api/patient/${user.user.patientId}`)
			.then((response) => {
			  console.log(response)
			  if(response.data){
				setMedicalHistory([response.data])
			  }
			  else{
				setMedicalHistory([])
			  }
			})
			.catch((error) => {
			  console.error('Error patients:', error);
			});
		}
		else{
			alert("please enter patient id")
		}
	  };
	  useEffect(()=>{
		getsinglemedicalrecord()
	  },[])
	return (
		<div
			className="bg-no-repeat bg-cover flex"
			style={{ backgroundImage: `url(${backgroundImg})`, height: "100vh" }}>
			<div className="w-1/4 bg-cyan-950 flex flex-col ">
				<img
					src={Logo}
					style={{ height: "300px", width: "300px" }}
					className="ml-12"
				/>
				<div className="w-full h-12 text-white flex flex-col text-center pt-2">
					<div
						className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoPatientDashboard()}>
						<h4 className="mt-2">Dashboard</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoPatientProfile()}>
						<h4 className="mt-2">Profile</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoPatientAppoint()}>
						<h4 className="mt-2">Appointment</h4>
					</div>
					<div className="bg-gray-400 text-gray-800 border-b-2 border-gray-500 border-t-2">
						<h4 className="mt-2">Medical History</h4>
					</div>
				</div>
			</div>
			<div className="w-3/4 bg-none">
				<div className="bg-white text-black h-12 flex">
					<h2 className="bg-white h-12 text-black font-bold font-serif ml-4 pt-2 underline">
						PATIENT DASHBOARD
					</h2>
					<h5 className="absolute right-32 mt-2 text-xl uppercase">Welcome</h5>
					<button
						className="absolute right-4 mt-2 bg-cyan-900 w-24 h-8 text-white rounded-full"
						onClick={handleLogout}>
						Log Out
					</button>
				</div>
				 {medicalHistory &&
				<div className="bg-white rounded-md shadow-md p-4 col-span-2">
              <h3 className="text-lg font-semibold mb-2">Medical History</h3>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2">patientId</th>
                    <th className="px-4 py-2">fullname</th>
                    <th className="px-4 py-2">dob</th>
                    <th className="px-4 py-2">contact</th>
                    <th className="px-4 py-2">medication</th>
                    <th className="px-4 py-2">dentalhistory</th>
                  </tr>
                </thead>
                <tbody>
                  {medicalHistory?.map((history,key) => (
                    <tr key={key}>
                      <td className="px-4 py-2">{history.patientid && history.patientid}</td>
                      <td className="px-4 py-2">{history.fullname && history.fullname}</td>
                      <td className="px-4 py-2">{history.dob && history.dob}</td>
                      <td className="px-4 py-2">{history.contact && history.contact}</td>
                      <td className="px-4 py-2">{history.medication && history.medication}</td>
                      <td className="px-4 py-2">{history.dentalhistory && history.dentalhistory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>}
			</div>
		</div>
	);
};

export default PatientMedical;
