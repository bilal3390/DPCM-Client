import React, { useState } from "react";
import backgroundImg from "../../../assets/background1.png";
import Logo from "../../../assets/logo3.png";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem("ownerId");
		navigate("/doctorlogin", { replace: true });
	};
	const gotoTreatment = () => {
		navigate("/dashboard/doctortreat");
	};
	const gotoMedical = () => {
		navigate("/dashboard/doctormedical");
	};

	const gotoDental = () => {
		navigate("/dashboard/doctordental");
	};
	const gotoxray = () =>{
		window.open("https://huggingface.co/spaces/Arslan7788/DPCM",'_blank')
	}
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
					<div className="bg-gray-400 text-gray-800 border-b-2 border-gray-500 border-t-2">
						<h4 className="mt-2">Dashboard</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoTreatment()}>
						<h4 className="mt-2">Treatment Plan</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoMedical()}>
						<h4 className="mt-2 mr-2">Medical History</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoDental()}>
						<h4 className="mt-2">Dental Chart</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoxray()}>
						<h4 className="mt-2">Dental X-ray (ML model)</h4>
					</div>
				</div>
			</div>
			<div className="w-3/4 bg-none">
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
			</div>
		</div>
	);
};

export default Doctors;
