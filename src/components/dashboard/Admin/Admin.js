import React, { useState } from "react";
import backgroundImg from "../../../assets/background1.png";
import Logo from "../../../assets/logo3.png";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
const Admin = () => {

	const handleActionChange = (action) => {
		setSelectedAction(action);
	};
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem("ownerId");
		navigate("/adminlogin", { replace: true });
	};

	const gotoPatient = () => {
		navigate("/dashboard/adminpatient");
	};
	const gotoDoctor = () => {
		navigate("/dashboard/admindoctor");
	};

	const gotoFinance = () => {
		navigate("/dashboard/adminfinance");
	};

	const gotoAppoint = () => {
		navigate("/dashboard/adminappoint");
	};

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
						onClick={() => gotoPatient()}>
						<h4 className=" mt-2">Patient</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoDoctor()}>
						<h4 className="mt-2 mr-2">Doctor</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoFinance()}>
						<h4 className="mt-2 mr-2">Finance</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoAppoint()}>
						<h4 className="mt-2 mr-2">Appointment</h4>
					</div>
				</div>
			</div>
			<div className="w-3/4 bg-none">
				<div className="bg-white text-black h-12 flex">
					<h2 className="bg-white h-12 text-black font-bold font-serif ml-4 pt-2 underline">
						ADMIN DASHBOARD
					</h2>
					<h5 className="absolute right-48 mt-2 text-xl uppercase">Welcome</h5>
					<button
						className="absolute right-20 mt-2 bg-cyan-900 w-24 h-8 text-white rounded-full"
						onClick={handleLogout}>
						Log Out
					</button>
					{/* <div
						className="absolute top-1 right-4 cursor-pointer"
						onClick={() => handleActionChange("updateAdmin")}>
						<Avatar
							src="https://via.placeholder.com/40"
							size={40}
							round={true}
						/>
					</div> */}
				</div>

			</div>
		</div>
	);
};

export default Admin;
