import React, { useState, useEffect } from "react";
import backgroundImg from "../../../../assets/background1.png";
import Logo from "../../../../assets/logo3.png";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine, RiEditFill, RiDeleteBack2Fill } from "react-icons/ri";
import axios from "axios";
import { Config } from "../../../../config";
const AdminPatient = () => {
	const [selectedAction, setSelectedAction] = useState("");
	const [patientName, setPatientName] = useState("");
	const [patientAge, setPatientAge] = useState("");
	const [patientEmail, setPatientEmail] = useState("");
	const [patientPassword, setPatientPassword] = useState("");
	const [patientContact, setPatientContact] = useState("");
	const [patientAddress, setPatientAddress] = useState("");
	const [patientGender, setPatientGender] = useState("");
	const [patientCity, setPatientCity] = useState("");
	const [patientId, setPatientId] = useState("");
	const [selectedPatient, setSelectedPatient] = useState(null);
	const [contactError, setContactError] = useState("");
	const [message, setMessage] = useState("");
	const [editMessage, setEditMessage] = useState("");

	const handleSelectPatient = (patient) => {
		setSelectedPatient(patient);
		handleActionChange("view");
	};

	const handleGoBack = () => {
		setSelectedAction("list");
		setSelectedPatient(null);
	};
	const handleGoBackView = () => {
		setSelectedAction("view");
	};

	const handleAddpatient = async () => {
		try {
			const response = await axios.post(
				`${Config}api/patient/add`,
				{
					name: patientName,
					age: patientAge,
					email: patientEmail,
					password: patientPassword,
					contact: patientContact,
					address: patientAddress,
					gender: patientGender,
					city: patientCity,
				},
			);
			console.log(response.data);
			setMessage("Patient added successfully");
			// Reset the form fields
			setPatientName("");
			setPatientAge("");
			setPatientEmail("");
			setPatientPassword("");
			setPatientContact("");
			setPatientAddress("");
			setPatientGender("");
			setPatientCity("");
			fetchPatients();
		} catch (error) {
			console.error(error.response.data);
			setMessage("Patient added successfully");
		}
	};

	const handleRemovepatient = async () => {
		try {
			const response = await axios.delete(
				`${Config}api/patient/${patientId}`,
			);
			console.log(response.data);
			setMessage("patient removed");
		} catch (error) {
			console.error(error.response.data);
			setMessage("Unable to remove patient");
		}
	};

	const handleViewpatient = async () => {
		try {
		} catch (error) {}
	};

	const handleActionChange = (action) => {
		setSelectedAction(action);
		setPatientName("");
		setPatientEmail("");
		setPatientPassword("");
		setPatientContact("");
		setPatientAddress("");
		setPatientGender("");
		setPatientAge("");
		setPatientCity("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (selectedAction === "add") {
			handleAddpatient();
		} else if (selectedAction === "remove") {
			handleRemovepatient();
		} else if (selectedAction === "update") {
			handleUpdatepatient();
		} else if (selectedAction === "view") {
			handleViewpatient();
		}

		// Reset the form fields
		setSelectedAction("");
		setPatientName("");
		setPatientEmail("");
		setPatientPassword("");
		setPatientContact("");
		setPatientAddress("");
		setPatientGender("");
		setPatientAge("");
		setPatientCity("");
	};

	const navigate = useNavigate();
	
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("ownerId");
		navigate("/ownerlogin", { replace: true });
	};

	const gotopatientDashboard = () => {
		navigate("/dashboard/admin");
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

	const [patients, setPatients] = useState([]);

	const fetchPatients = async () => {
		try {
			const response = await axios.get(`${Config}api/patient`);
			setPatients(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchPatients();
	}, []);

	const handleRemovePatient = async (patientId) => {
		try {
			await axios.delete(`${Config}api/patient/${patientId}`);
			// Remove the patient from the patients state
			setPatients(patients.filter((patient) => patient._id !== patientId));
		} catch (error) {
			console.error(error);
		}
	};

	const handleEditPatient = async (patientId) => {
		try {
			const updatedPatient = {
				PId:patientId,
				name: patientName,
				email: patientEmail,
				password: patientPassword,
				contact: patientContact,
				gender: patientGender,
				address: patientAddress,
				age: patientAge,
				city: patientCity,
			};

			const response = await axios.patch(
				`${Config}api/patient/updateByAdmin`,
				updatedPatient,
			);

			console.log(response.data);
			setEditMessage("Patient Data Edited");
			handleActionChange("view");
			fetchPatients();
		} catch (error) {
			// console.error(error.response.data);
			setEditMessage("Patient Data Edited");
		}
	};

	const handleUpdatepatient = async () => {
		setPatientName(selectedPatient.name);
		setPatientEmail(selectedPatient.email);
		setPatientPassword(selectedPatient.password);
		setPatientContact(selectedPatient.contact);
		setPatientAddress(selectedPatient.address);
		setPatientGender(selectedPatient.gender);
		setPatientAge(selectedPatient.age);
		setPatientCity(selectedPatient.city);
		handleEditPatient(selectedPatient._id);
	};

	function handlePatientContactChange(e) {
		const input = e.target.value.replace(/\D/g, "").slice(0, 11);
		setPatientContact(input);

		if (input.length !== 11) {
			setContactError("Invalid Number");
		} else {
			setContactError("");
		}
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
					<div
						className="bg-gray-700  border-b-2 border-gray-800 border-t-2 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotopatientDashboard()}>
						<h4 className="mt-2">Dashboard</h4>
					</div>
					<div className="bg-gray-400 flex justify-center text-gray-800 border-b-2 border-gray-500 ">
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
			<h5 className="absolute right-32 mt-2 text-xl uppercase">
			Welcome 
		</h5>
					<button
						className="absolute right-2 mt-1 rounded-full bg-cyan-900 w-24 hover:bg-cyan-950 h-8 text-white"
						onClick={handleLogout}>
						Log Out
					</button>
					<h5></h5>
				</div>

				<div className="flex flex-col text-center">
					<h2 className="text-4xl font-bold mb-4 mt-4 text-white">PATIENT</h2>
					<div className="mb-4">
						<div className="flex space-x-4 justify-center text-white mt-4">
							{/* <button
								className={`py-2 px-4 rounded ${
									selectedAction === "add"
										? "bg-cyan-800"
										: "bg-cyan-800 hover:bg-cyan-900"
								}`}
								onClick={() => handleActionChange("add")}>
								Add Patient
							</button> */}

							<button
								className={`py-2 px-4 rounded ml-65 ${
									selectedAction === "list"
										? "bg-cyan-800"
										: "bg-cyan-800 hover:bg-cyan-900"
								}`}
								onClick={() => handleActionChange("list")}>
								Patient Lists
							</button>
						</div>
					</div>
					{selectedAction == "add" && (
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="w-full flex space-x-10 justify-center">
								<div>
									<label
										htmlFor="patientName"
										className="block font-medium text-white">
										Full Name
									</label>
									<input
										type="text"
										id="patientName"
										value={patientName}
										onChange={(e) => setPatientName(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										required
										autoComplete="off"
									/>
								</div>
								<div>
									<label
										htmlFor="patientEmail"
										className="block font-medium text-white">
										Email
									</label>
									<input
										type="email"
										id="patientEmail"
										value={patientEmail}
										onChange={(e) => setPatientEmail(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										required
										autoComplete="off"
									/>
								</div>
							</div>
							<div className="w-full flex space-x-10 justify-center">
								<div>
									<label
										htmlFor="patientPassword"
										className="block font-medium text-white">
										Password
									</label>
									<input
										type="password"
										id="patientPassword"
										value={patientPassword}
										onChange={(e) => setPatientPassword(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										required
										autoComplete="off"
									/>
								</div>
								<div>
									<label
										htmlFor="patientAge"
										className="block font-medium text-white">
										Age
									</label>
									<input
										type="text"
										id="patientAge"
										value={patientAge}
										className="border border-gray-300 p-2 rounded "
										onChange={(e) => {
											const input = e.target.value.replace(/\D/g, "");
											setPatientAge(input);
										}}
										required
										autoComplete="off"
									/>
								</div>
							</div>
							<div className="w-full flex space-x-10 justify-center">
								<div>
									<label
										htmlFor="patientGender"
										className="block font-medium text-white">
										Gender
									</label>
									<select
										id="patientGender"
										value={patientGender}
										onChange={(e) => setPatientGender(e.target.value)}
										className="border border-gray-300 p-2 rounded w-52"
										required>
										<option value="">Select Gender</option>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
										<option value="Other">Others</option>
									</select>
								</div>
								<div>
									<label
										htmlFor="patientContact"
										className="block font-medium text-white">
										Contact
									</label>
									<input
										type="text"
										id="patientContact"
										value={patientContact}
										onChange={handlePatientContactChange}
										className="border border-gray-300 p-2 rounded"
										inputMode="numeric"
										autoComplete="off"
										maxLength={11}
										required
									/>
									{contactError && (
										<p className="text-red-500">{contactError}</p>
									)}
								</div>
							</div>

							<div className="w-full flex space-x-10 justify-center">
								<div>
									<label
										htmlFor="patientAddress"
										className="block font-medium text-white">
										Address
									</label>
									<input
										type="text"
										id="patientAddress"
										value={patientAddress}
										onChange={(e) => setPatientAddress(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										autoComplete="off"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="patientCity"
										className="block font-medium text-white">
										City
									</label>
									<input
										type="text"
										id="patientCity"
										value={patientCity}
										onChange={(e) => setPatientCity(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										autoComplete="off"
										required
									/>
								</div>
							</div>
							<button
								type="submit"
								className="bg-cyan-800 hover:bg-cyan-900 text-white py-2 px-4 rounded">
								Add Patient
							</button>
							<p className="text-white">{message}</p>
						</form>
					)}

					{selectedAction === "list" && (
						<div className="backdrop-filter backdrop-blur-xl w-full">
							<h2 className="text-white">PATIENT LIST</h2>
							<div className="flex items-center justify-between space-x-4">
								<div className="text-white w-1/5">
									<h3 className="text-2xl font-semibold">Name</h3>
								</div>
								<div className="text-white w-1/5">
									<h3 className="text-2xl font-semibold">Email</h3>
								</div>
								{/* <div className="text-white w-2/5">
									<h3 className="text-2xl font-semibold">Contact</h3>
								</div> */}
								<div className="text-white w-1/5">
									<h3 className="text-2xl font-semibold">Actions</h3>
								</div>
							</div>
							<div className="mt-2 max-h-96 overflow-y-auto">
								{patients.map((patient) => (
									<div
										key={patient._id}
										className="flex justify-between space-x-4">
										<div className="text-white w-1/5">
											<p className="text-xl uppercase">{patient.name}</p>
										</div>
										<div className="text-white w-1/5">
											<p className="text-2xl">{patient.email}</p>
										</div>
										{/* <div className="text-white w-2/5">
											<p className="text-2xl">{patient.contact}</p>
										</div> */}
										<div className="text-white w-1/5 flex items-center justify-end">
											<div
												className="text-white  py-2 px-4 rounded cursor-pointer"
												onClick={() => handleSelectPatient(patient)}>
												<RiEditFill className="w-8 h-8 hover:text-gray-600" />
											</div>
											<div
												className="text-red-500 py-2 px-6 mx-4 rounded cursor-pointer"
												onClick={() => handleRemovePatient(patient._id)}>
												<RiDeleteBinLine className="w-10 h-10 hover:text-red-800" />
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
					  

					{selectedAction === "view" && selectedPatient && (
						<div className="backdrop-filter backdrop-blur-xl w-3/4 ml-40">
							<h2 className="text-white">PATIENT PROFILE</h2>
							<div className="mt-6 flex w-full space-x-96">
								<div className="flex flex-col text-white">
									<div className="flex items-center">
										<h3 className="text-xl font-semibold mr-4">Name:</h3>
										<p className="text-xl mt-2 uppercase">
											{selectedPatient.name}
										</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">Email:</h3>
										<p className="text-xl mt-2">{selectedPatient.email}</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">Contact No:</h3>
										<p className="text-xl mt-2">{selectedPatient.contact}</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">Age:</h3>
										<p className="text-xl mt-2 ">{selectedPatient.age}</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">Address:</h3>
										<p className="text-xl mt-2 ">{selectedPatient.address}</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">City:</h3>
										<p className="text-xl mt-2 ">{selectedPatient.city}</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">Gender:</h3>
										<p className="text-xl mt-2 uppercase">
											{selectedPatient.gender}
										</p>
									</div>
								</div>
								<div className="flex flex-col mt-4 space-x-4">
									<button
										className="bg-cyan-800 hover:bg-cyan-900 text-white w-32 py-2 px-4 ml-4 rounded h-12 mb-4"
										onClick={() => handleActionChange("update")}>
										EDIT
									</button>
									<button
										className="bg-cyan-800 hover:bg-cyan-900 w-32 text-white py-2 px-4  rounded h-12"
										onClick={handleGoBack}>
										BACK
									</button>
									<p className="text-lg text-white ">{editMessage}</p>
								</div>
							</div>
						</div>
					)}

					{selectedAction == "update" && (
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="flex w-full justify-center space-x-8">
								<div>
									<label
										htmlFor="name"
										className="block font-medium text-white">
										Enter Name
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={patientName}
										onChange={(e) => setPatientName(e.target.value)}
										className="border border-gray-300 p-2 rounded "
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block font-medium text-white">
										Enter Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={patientEmail}
										onChange={(e) => setPatientEmail(e.target.value)}
										className="border border-gray-300 p-2 rounded "
									/>
								</div>
							</div>

							<div className="flex w-full justify-center space-x-8">
								<div>
									<label
										htmlFor="password"
										className="block font-medium text-white">
										Enter Password
									</label>
									<input
										type="password"
										id="password"
										name="password"
										value={patientPassword}
										onChange={(e) => setPatientPassword(e.target.value)}
										className="border border-gray-300 p-2 rounded "
									/>
								</div>

								<div>
									<label
										htmlFor="patientContact"
										className="block font-medium text-white">
										Contact
									</label>
									<input
										type="text"
										id="patientContact"
										value={patientContact}
										onChange={handlePatientContactChange}
										className="border border-gray-300 p-2 rounded"
										inputMode="numeric"
										maxLength={11}
										required
									/>
									{contactError && (
										<p className="text-red-500">{contactError}</p>
									)}
								</div>
							</div>

							<div className="flex w-full justify-center space-x-8">
								<div>
									<label
										htmlFor="address"
										className="block font-medium text-white">
										Enter Address
									</label>
									<input
										type="text"
										id="address"
										name="address"
										value={patientAddress}
										onChange={(e) => setPatientAddress(e.target.value)}
										className="border border-gray-300 p-2 rounded "
									/>
								</div>
								<div>
									<label htmlFor="age" className="block font-medium text-white">
										Enter Age
									</label>
									<input
										type="number"
										id="age"
										name="age"
										value={patientAge}
										onChange={(e) => setPatientAge(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										inputMode="numeric"
									/>
								</div>
							</div>
							<div>
									<label htmlFor="city" className="block font-medium text-white">
										Enter City
									</label>
									<input
										type="text"
										id="city"
										name="city"
										value={patientCity}
										onChange={(e) => setPatientCity(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										inputMode="numeric"
									/>
								</div>

							<div className="space-x-8">
								<button
									className="bg-cyan-800 hover:bg-cyan-900 text-white py-2 px-4 rounded"
									onClick={handleEditPatient}>
									Save
								</button>
								<button
									className="bg-cyan-800 hover:bg-cyan-900 text-white py-2 px-4 rounded mt-4 "
									onClick={handleGoBackView}>
									Back
								</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminPatient;
