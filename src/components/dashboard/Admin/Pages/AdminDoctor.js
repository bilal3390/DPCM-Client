import React, { useState, useEffect } from "react";
import backgroundImg from "../../../../assets/background1.png";
import Logo from "../../../../assets/logo3.png";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine, RiEditFill, RiDeleteBack2Fill } from "react-icons/ri";
import axios from "axios";
import { Config } from "../../../../config";
const AdminDoctor = () => {
	const [selectedAction, setSelectedAction] = useState("");
	const [doctorName, setDoctorName] = useState("");
	const [doctorAge, setDoctorAge] = useState("");
	const [doctorEmail, setDoctorEmail] = useState("");
	const [doctorPassword, setDoctorPassword] = useState("");
	const [doctorContact, setDoctorContact] = useState("");
	const [doctorAddress, setDoctorAddress] = useState("");
	const [doctorGender, setDoctorGender] = useState("");
	const [doctorQualification, setDoctorQualification] = useState("");
	const [doctorSalary, setDoctorSalary] = useState("");
	const [doctorExperience, setDoctorExperience] = useState("");
	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [contactError, setContactError] = useState("");
	const [message, setMessage] = useState("");
	const [editMessage, setEditMessage] = useState("");

	const handleSelectDoctor = (doctor) => {
		setSelectedDoctor(doctor);
		handleActionChange("view");
	};

	const handleGoBack = () => {
		setSelectedAction("list");
		setSelectedDoctor(null);
	};
	const handleGoBackView = () => {
		setSelectedAction("view");
	};
	const user = JSON.parse(localStorage.getItem('user'))
	const handleAddDoctor = async () => {
		
		try {
			const response = await axios.post(`${Config}api/doctor`, {
				name: doctorName,
				age: doctorAge,
				email: doctorEmail,
				password: doctorPassword,
				contactNo: doctorContact,
				address: doctorAddress,
				gender: doctorGender,
				experience: doctorExperience,
				qualification: doctorQualification,
				salary: doctorSalary,
				admin:user.data.user._id
			});
			const { token } = response.data;
			localStorage.setItem("token", token);
			console.log(response.data);
			setMessage("Doctor added successfully");
			// Reset the form fields
			setDoctorName("");
			setDoctorAge("");
			setDoctorEmail("");
			setDoctorPassword("");
			setDoctorContact("");
			setDoctorAddress("");
			setDoctorGender("");
			setDoctorQualification("");
			setDoctorSalary("");
			setDoctorExperience("");
			fetchDoctor();
		} catch (error) {
			console.error(error.response.data);
			setMessage("Failed to add Doctor");
		}
	};

	const handleViewDoctor = async () => {
		try {
		} catch (error) {}
	};

	const handleActionChange = (action) => {
		setSelectedAction(action);
		setDoctorName("");
		setDoctorEmail("");
		setDoctorPassword("");
		setDoctorContact("");
		setDoctorAddress("");
		setDoctorGender("");
		setDoctorAge("");
		setDoctorQualification("");
		setDoctorSalary("");
		setDoctorExperience("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (selectedAction === "add") {
			handleAddDoctor();
		} else if (selectedAction === "remove") {
			handleRemoveDoctor();
		} else if (selectedAction === "update") {
			handleUpdateDoctor();
		} else if (selectedAction === "view") {
			handleViewDoctor();
		}

		// Reset the form fields
		setSelectedAction("");
		setDoctorName("");
		setDoctorEmail("");
		setDoctorPassword("");
		setDoctorContact("");
		setDoctorAddress("");
		setDoctorGender("");
		setDoctorAge("");
		setDoctorQualification("");
		setDoctorSalary("");
		setDoctorExperience("");
	};

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("ownerId");
		navigate("/ownerlogin", { replace: true });
	};

	const gotoAdminDashboard = () => {
		navigate("/dashboard/admin");
	};

	const gotoPatient = () => {
		navigate("/dashboard/adminpatient");
	};

	const gotoFinance = () => {
		navigate("/dashboard/adminfinance");
	};

	const gotoAppoint = () => {
		navigate("/dashboard/adminappoint");
	};

	const [doctor, setDoctor] = useState([]);

	const fetchDoctor = async () => {
		try {
			const response = await axios.get(`${Config}api/doctor/get`);
			setDoctor(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchDoctor();
	}, []);

	const handleRemoveDoctor = async (doctorId) => {
		try {
			await axios.delete(`${Config}api/doctor/${doctorId}`);
			setDoctor(doctor.filter((doctor) => doctor._id !== doctorId));
		} catch (error) {
			console.error(error);
		}
	};

	const handleEditDoctor = async (doctorId) => {
		try {
			const updatedDoctor = {
				name: doctorName,
				email: doctorEmail,
				password: doctorPassword,
				contact: doctorContact,
				gender: doctorGender,
				address: doctorAddress,
				age: doctorAge,
				qualification: doctorQualification,
				salary: doctorSalary,
				experience: doctorExperience,
			};

			const response = await axios.put(
				`${Config}api/doctor/${doctorId}`,
				updatedDoctor,
			);

			console.log(response.data);
			setEditMessage("Doctor Data Edited");
			handleActionChange("view");
			fetchDoctor();
		} catch (error) {
			console.error(error.response.data);
			setEditMessage("Doctor Data Not Edited");
		}
	};

	const handleUpdateDoctor = async () => {
		setDoctorName(selectedDoctor.name);
		setDoctorEmail(selectedDoctor.email);
		setDoctorPassword(selectedDoctor.password);
		setDoctorContact(selectedDoctor.contact);
		setDoctorAddress(selectedDoctor.address);
		setDoctorGender(selectedDoctor.gender);
		setDoctorAge(selectedDoctor.age);
		setDoctorQualification(selectedDoctor.qualification);
		setDoctorSalary(selectedDoctor.salary);
		setDoctorExperience(selectedDoctor.experience);

		handleEditDoctor(selectedDoctor._id);
	};

	function handleDoctorContactChange(e) {
		const input = e.target.value.replace(/\D/g, "").slice(0, 11);
		setDoctorContact(input);

		if (input.length !== 11) {
			setContactError("Invalid Number");
		} else {
			setContactError("");
		}
	}

	return (
		<div
			className="bg-no-repeat bg-cover flex"
			style={{ backgroundImage: `url(${backgroundImg})`, height: "120vh" }}>
			<div className="w-1/4 bg-cyan-950 flex flex-col ">
				<img
					src={Logo}
					style={{ height: "300px", width: "300px" }}
					className="ml-12"
				/>
				<div className="w-full h-12 text-white flex flex-col text-center pt-2">
					<div
						className="bg-gray-700  border-b-2 border-gray-800 border-t-2 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoAdminDashboard()}>
						<h4 className="mt-2">Dashboard</h4>
					</div>
					<div className=" flex justify-center bg-gray-700 border-b-2 border-gray-500 cursor-pointer ">
						<h4 className=" mt-2" onClick={() => gotoPatient()}>
							Patient
						</h4>
					</div>
					<div className="bg-gray-400 text-gray-800 flex justify-center  border-b-2 border-gray-500  hover:text-gray-800 hover:bg-gray-400">
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
					<h5 className="absolute right-32 mt-2 text-xl uppercase">Welcome</h5>
					<button
						className="absolute right-2 mt-1 rounded-full bg-cyan-900 w-24 hover:bg-cyan-950 h-8 text-white"
						onClick={handleLogout}>
						Log Out
					</button>
					<h5></h5>
				</div>

				<div className="flex flex-col text-center">
					<h2 className="text-4xl font-bold mb-4 mt-4 text-white">DOCTOR</h2>
					<div className="mb-4">
						<div className="flex space-x-4 justify-center text-white mt-4">
							<button
								className={`py-2 px-4 rounded ${
									selectedAction === "add"
										? "bg-cyan-800"
										: "bg-cyan-800 hover:bg-cyan-900"
								}`}
								onClick={() => handleActionChange("add")}>
								Add Doctor
							</button>

							<button
								className={`py-2 px-4 rounded ml-44 ${
									selectedAction === "list"
										? "bg-cyan-800"
										: "bg-cyan-800 hover:bg-cyan-900"
								}`}
								onClick={() => handleActionChange("list")}>
								Doctor Lists
							</button>
						</div>
					</div>
					{selectedAction == "add" && (
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="w-full flex space-x-10 justify-center">
								<div>
									<label
										htmlFor="doctorName"
										className="block font-medium text-white">
										Full Name
									</label>
									<input
										type="text"
										id="doctorName"
										value={doctorName}
										onChange={(e) => setDoctorName(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										required
										autoComplete="off"
									/>
								</div>
								<div>
									<label
										htmlFor="doctorEmail"
										className="block font-medium text-white">
										Email
									</label>
									<input
										type="email"
										id="doctorEmail"
										value={doctorEmail}
										onChange={(e) => setDoctorEmail(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										required
										autoComplete="off"
									/>
								</div>
							</div>
							<div className="w-full flex space-x-10 justify-center">
								<div>
									<label
										htmlFor="doctorPassword"
										className="block font-medium text-white">
										Password
									</label>
									<input
										type="password"
										id="doctorPassword"
										value={doctorPassword}
										onChange={(e) => setDoctorPassword(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										required
										autoComplete="off"
									/>
								</div>
								<div>
									<label
										htmlFor="doctorAge"
										className="block font-medium text-white">
										Age
									</label>
									<input
										type="text"
										id="doctorAge"
										value={doctorAge}
										className="border border-gray-300 p-2 rounded "
										onChange={(e) => {
											const input = e.target.value.replace(/\D/g, "");
											setDoctorAge(input);
										}}
										required
										autoComplete="off"
									/>
								</div>
							</div>
							<div className="w-full flex space-x-10 justify-center">
								<div>
									<label
										htmlFor="doctorGender"
										className="block font-medium text-white">
										Gender
									</label>
									<select
										id="doctorGender"
										value={doctorGender}
										onChange={(e) => setDoctorGender(e.target.value)}
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
										htmlFor="doctorContact"
										className="block font-medium text-white">
										Contact
									</label>
									<input
										type="text"
										id="doctorContact"
										value={doctorContact}
										onChange={handleDoctorContactChange}
										className="border border-gray-300 p-2 rounded"
										autoComplete="off"
										inputMode="numeric"
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
										htmlFor="doctorAddress"
										className="block font-medium text-white">
										Address
									</label>
									<input
										type="text"
										id="doctorAddress"
										value={doctorAddress}
										onChange={(e) => setDoctorAddress(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										autoComplete="off"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="doctorQualification"
										className="block font-medium text-white">
										Qualification
									</label>
									<input
										type="text"
										id="doctorQualification"
										value={doctorQualification}
										onChange={(e) => setDoctorQualification(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										autoComplete="off"
										required
									/>
								</div>
							</div>
							<div className="w-full flex space-x-10 justify-center">
								<div>
									<label
										htmlFor="doctorExperience"
										className="block font-medium text-white">
										Experience
									</label>
									<input
										type="text"
										id="doctorExperience"
										value={doctorExperience}
										onChange={(e) => setDoctorExperience(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										autoComplete="off"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="doctorSalary"
										className="block font-medium text-white">
										Salary
									</label>
									<input
										type="text"
										id="doctorSalary"
										value={doctorSalary}
										onChange={(e) => setDoctorSalary(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										required
										autoComplete="off"
									/>
								</div>
							</div>
							<button
								type="submit"
								className="bg-cyan-800 hover:bg-cyan-900 text-white py-2 px-4 rounded">
								Add Doctor
							</button>
							<p className="text-white">{message}</p>
						</form>
					)}

					{selectedAction === "list" && (
						<div className="backdrop-filter backdrop-blur-xl w-full">
							<h2 className="text-white">DOCTOR LIST</h2>
							<div className="flex items-center justify-between space-x-4">
								<div className="text-white w-1/5">
									<h3 className="text-2xl font-semibold">Name</h3>
								</div>
								<div className="text-white w-1/5">
									<h3 className="text-2xl font-semibold">Email</h3>
								</div>
								<div className="text-white w-2/5">
									<h3 className="text-2xl font-semibold">Experience</h3>
								</div>
								<div className="text-white w-1/5">
									<h3 className="text-2xl font-semibold">Actions</h3>
								</div>
							</div>
							<div className="mt-2 max-h-96 overflow-y-auto">
								{doctor.map((doctor) => (
									<div
										key={doctor._id}
										className="flex justify-between space-x-4">
										<div className="text-white w-1/5">
											<p className="text-xl uppercase">{doctor.name}</p>
										</div>
										<div className="text-white w-1/5">
											<p className="text-2xl">{doctor.email}</p>
										</div>
										<div className="text-white w-2/5">
											<p className="text-2xl">{doctor.experience} Years</p>
										</div>
										<div className="text-white w-1/5 flex items-center justify-end">
											<div
												className="text-white  py-2 px-4 rounded cursor-pointer"
												onClick={() => handleSelectDoctor(doctor)}>
												<RiEditFill className="w-8 h-8 hover:text-gray-600" />
											</div>
											<div
												className="text-red-500 py-2 px-6 mx-4 rounded cursor-pointer"
												onClick={() => handleRemoveDoctor(doctor._id)}>
												<RiDeleteBinLine className="w-10 h-10 hover:text-red-800" />
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{selectedAction === "view" && selectedDoctor && (
						<div className="backdrop-filter backdrop-blur-xl w-3/4 ml-40">
							<h2 className="text-white">DOCTOR PROFILE</h2>
							<div className="mt-6 flex w-full space-x-96">
								<div className="flex flex-col text-white">
									<div className="flex items-center">
										<h3 className="text-xl font-semibold mr-4">Name:</h3>
										<p className="text-xl mt-2 uppercase">
											{selectedDoctor.name}
										</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">Email:</h3>
										<p className="text-xl mt-2">{selectedDoctor.email}</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">Contact No:</h3>
										<p className="text-xl mt-2">{selectedDoctor.contact}</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">Age:</h3>
										<p className="text-xl mt-2 ">{selectedDoctor.age}</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">Address:</h3>
										<p className="text-xl mt-2 uppercase">
											{selectedDoctor.address}
										</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">Gender:</h3>
										<p className="text-xl mt-2 uppercase">
											{selectedDoctor.gender}
										</p>
									</div>
								</div>
								<div className="flex flex-col mt-4 space-x-4">
									<div
										className=" text-white w-32 py-2 px-4 ml-4 rounded h-12 mb-4 flex cursor-pointer"
										onClick={() => handleActionChange("update")}>
										<RiEditFill className="w-10 h-10" />
										<h5 className="ml-2 mt-2 text-2xl hover:text-gray-700">
											Edit
										</h5>
									</div>
									<div
										className="w-32 text-white py-2 px-4  rounded h-12 flex cursor-pointer"
										onClick={handleGoBack}>
										<RiDeleteBack2Fill className="w-10 h-10" />
										<h5 className="ml-2 mt-1 text-2xl hover:text-gray-700">
											Back
										</h5>
									</div>
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
										value={doctorName}
										onChange={(e) => setDoctorName(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										autoComplete="off"
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
										value={doctorEmail}
										onChange={(e) => setDoctorEmail(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										autoComplete="off"
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
										value={doctorPassword}
										onChange={(e) => setDoctorPassword(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										autoComplete="off"
									/>
								</div>

								<div>
									<label
										htmlFor="doctorContact"
										className="block font-medium text-white">
										Contact
									</label>
									<input
										type="text"
										id="doctorContact"
										value={doctorContact}
										onChange={handleDoctorContactChange}
										className="border border-gray-300 p-2 rounded"
										inputMode="numeric"
										maxLength={11}
										required
										autoComplete="off"
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
										value={doctorAddress}
										onChange={(e) => setDoctorAddress(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										autoComplete="off"
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
										value={doctorAge}
										onChange={(e) => setDoctorAge(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										inputMode="numeric"
										autoComplete="off"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="doctorExperience"
									className="block font-medium text-white">
									Experience
								</label>
								<input
									type="text"
									id="doctorExperience"
									value={doctorExperience}
									onChange={(e) => setDoctorExperience(e.target.value)}
									className="border border-gray-300 p-2 rounded "
									required
									autoComplete="off"
								/>
							</div>

							<div className="space-x-8">
								<button
									className="bg-cyan-800 hover:bg-cyan-900 text-white py-2 px-4 rounded"
									onClick={handleEditDoctor}>
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

export default AdminDoctor;
