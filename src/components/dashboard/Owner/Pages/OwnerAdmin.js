import React, { useState, useEffect } from "react";
import backgroundImg from "../../../../assets/background1.png";
import Logo from "../../../../assets/logo3.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Config } from "../../../../config";
const OwnerAdmin = ({ admins }) => {
	const [selectedAction, setSelectedAction] = useState("");
	const [adminName, setAdminName] = useState("");
	const [adminAge, setAdminAge] = useState("");
	const [adminEmail, setAdminEmail] = useState("");
	const [adminPassword, setAdminPassword] = useState("");
	const [adminContact, setAdminContact] = useState("");
	const [clinicName, setClinicName] = useState("");
	const [adminAddress, setAdminAddress] = useState("");
	const [adminGender, setAdminGender] = useState("");
	const [adminQualification, setAdminQualification] = useState("");
	const [adminSalary, setAdminSalary] = useState("");
	const [selectedAdmin, setSelectedAdmin] = useState(null);
	const [contactError, setContactError] = useState("");
	const [message, setMessage] = useState("");
	const [editMessage, setEditMessage] = useState("");

	const handleSelectAdmin = (admin) => {
		setSelectedAdmin(admin);
		handleActionChange("view");
	};

	const handleGoBack = () => {
		setSelectedAction("list");
		setSelectedAdmin(null);
	};
	const handleGoBackView = () => {
		setSelectedAction("view");
	};

	const handleAddAdmin = async () => {
		try {
			const response = await axios.post(
				`${Config}api/admin/addadmin`,
				{
					name: adminName,
					age: adminAge,
					email: adminEmail,
					clinicName:clinicName,
					password: adminPassword,
					contact: adminContact,
					address: adminAddress,
					gender: adminGender,
					qualification: adminQualification,
					salary: adminSalary,
				},
			);
			console.log(response);
			setMessage("Admin added successfully");
			// Reset the form fields
			setAdminName("");
			setAdminAge("");
			setAdminEmail("");
			setClinicName("")
			setAdminPassword("");
			setAdminContact("");
			setAdminAddress("");
			setAdminGender("");
			setAdminQualification("");
			setAdminSalary("");
		} catch (error) {
			console.error(error.response.data);
			setMessage("Failed to add admin");
		}
	};

	const handleActionChange = (action) => {
		setSelectedAction(action);
		setAdminName("");
		setAdminEmail("");
		setAdminPassword("");
		setAdminContact("");
		setClinicName("")
		setAdminAddress("");
		setAdminGender("");
		setAdminQualification("");
		setAdminSalary("");
		setAdminAge("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (selectedAction === "add") {
			handleAddAdmin();
		} else if (selectedAction === "remove") {
			handleRemoveAdmin();
		} else if (selectedAction === "update") {
			handleEditAdmin();
		} else if (selectedAction === "view") {
			handleViewAdmin();
		}

		// Reset the form fields
		setSelectedAction("");
		setAdminName("");
		setAdminEmail("");
		setAdminPassword("");
		setClinicName("")
		setAdminContact("");
		setAdminAddress("");
		setAdminGender("");
		setAdminAge("");
		setAdminQualification("");
		setAdminSalary("");
	};

	const [admin, setAdmin] = useState([]);

	const fetchAdmin = async () => {
		try {
			const response = await axios.get(`${Config}api/admin/get`);

			setAdmin(response.data.admins);
		} catch (error) {
			console.error("Error fetching admin data:", error);
		}
	};


		
	
	console.log(admin);

	const handleViewAdmin = async () => {
		try {
		} catch (error) {}
	};

	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("ownerId");
		navigate("/ownerlogin", { replace: true });
	};

	const gotoOwner = () => {
		navigate("/dashboard/owner");
	};
	const gotoProfit = () => {
		navigate("/dashboard/ownerprofit");
	};

	const handleEditAdmin = async (adminId) => {
		try {
			const updatedAdmin = {
				name: adminName,
				email: adminEmail,
				password: adminPassword,
				contact: adminContact,
				gender: adminGender,
				address: adminAddress,
				age: adminAge,
				qualification: adminQualification,
				salary: adminSalary,
			};

			const response = await axios.put(
				`${Config}api/admin/updateadmin/${adminId}`,
				updatedAdmin,
			);

			console.log(response.data);
			setEditMessage("Admin Data Edited");
			handleActionChange("view");
			fetchAdmin();
		} catch (error) {
			console.error(error.response.data);
			setEditMessage("Admin Data Not Edited");
		}
	};

	const handleRemoveAdmin = async (adminId) => {
		try {
			await axios.delete(
				`${Config}api/admin/removeadmin/${adminId}`,
			);
			console.log(adminId);
			setAdmin(admin.filter((admin) => admin._id !== adminId));
		} catch (error) {
			console.error(error);
		}
	};

	function handleAdminContactChange(e) {
		const input = e.target.value.replace(/\D/g, "").slice(0, 11);
		setAdminContact(input);

		if (input.length !== 11) {
			setContactError("Invalid Number");
		} else {
			setContactError("");
		}
	}
	useEffect(()=>{
		fetchAdmin();
	},[])
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
						className="bg-gray-700 flex justify-center border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoOwner()}>
						<h4 className="mt-2">Dashboard</h4>
					</div>
					<div className="bg-gray-400 flex justify-center text-gray-800  border-b-2 border-gray-500 cursor-pointer">
						<h4 className="ml-3 mt-2">Admin</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoProfit()}>
						<h4 className="mt-2 mr-2">Profit & Lost</h4>
					</div>
				</div>
			</div>
			<div className="w-3/4 bg-none">
				<div className="bg-white text-black h-12 flex">
					<h2 className="bg-white h-12 text-black font-bold font-serif ml-4 pt-2 underline">
						OWNER DASHBOARD
					</h2>
					<h5 className="absolute right-32 mt-2 text-xl uppercase">
						Welcome 
					</h5>
					<button
						className="absolute right-2 mt-2 bg-cyan-900 w-24 h-8 text-white rounded-full"
						onClick={handleLogout}>
						Log Out
					</button>
				</div>

				<div className="flex flex-col text-center">
					<h2 className="text-2xl font-semibold mb-4 text-white">Admin</h2>
					<div className="mb-4">
						<div className="flex space-x-4 justify-center ">
							<button
								className={`py-2 px-4 rounded shadow-xl shadow-cyan-600 ${
									selectedAction === "add"
										? "bg-cyan-800 hover:bg-cyan-900 text-white"
										: "bg-cyan-800 hover:bg-cyan-900 text-white"
								}`}
								onClick={() => handleActionChange("add")}>
								Add Admin
							</button>
							<button
								className={`py-2 px-4 rounded ml-44 shadow-xl shadow-cyan-600 text-white ${
									selectedAction === "list"
										? "bg-cyan-800"
										: "bg-cyan-800 hover:bg-cyan-900"
								}`}
								onClick={() => {
									fetchAdmin();
									handleActionChange("list")
								}}>
								Admin Lists
							</button>
						</div>
					</div>
					{selectedAction == "add" && (
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="w-full flex space-x-10 justify-center">
								<div >
									<label
										htmlFor="clinicName"
										className="block font-medium text-white">
										Clinic Name
									</label>
									<input
										type="text"
										id="adminName"
										style={{width:450}}
										value={clinicName}
										onChange={(e) => setClinicName(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										required
										autoComplete="off"
									/>
								</div>
							</div>
							<div className="w-full flex space-x-10 justify-center">
								<div>
									<label
										htmlFor="adminName"
										className="block font-medium text-white">
										Full Name
									</label>
									<input
										type="text"
										id="adminName"
										value={adminName}
										onChange={(e) => setAdminName(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										required
										autoComplete="off"
									/>
								</div>
								<div>
									<label
										htmlFor="adminEmail"
										className="block font-medium text-white">
										Email
									</label>
									<input
										type="email"
										id="adminEmail"
										value={adminEmail}
										onChange={(e) => setAdminEmail(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										required
										autoComplete="off"
									/>
								</div>
							</div>
							<div className="w-full flex space-x-10 justify-center">
								<div>
									<label
										htmlFor="adminPassword"
										className="block font-medium text-white">
										Password
									</label>
									<input
										type="password"
										id="adminPassword"
										value={adminPassword}
										onChange={(e) => setAdminPassword(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										required
										autoComplete="off"
									/>
								</div>
								<div>
									<label
										htmlFor="adminAge"
										className="block font-medium text-white">
										Age
									</label>
									<input
										type="number"
										id="adminAge"
										value={adminAge}
										onChange={(e) => setAdminAge(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										required
										autoComplete="off"
									/>
								</div>
							</div>
							<div className="w-full flex space-x-10 justify-center">
								<div>
									<label
										htmlFor="adminGender"
										className="block font-medium text-white">
										Gender
									</label>
									<select
										id="adminGender"
										value={adminGender}
										onChange={(e) => setAdminGender(e.target.value)}
										className="border border-gray-300 p-2 rounded w-52 cursor-pointer"
										required>
										<option value=""></option>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
										<option value="Other">Others</option>
									</select>
								</div>
								<div>
									<label
										htmlFor="adminContact"
										className="block font-medium text-white">
										Contact
									</label>
									<input
										type="text"
										placeholder="Contact"
										className="border border-gray-300 p-2 rounded "
										value={adminContact}
										onChange={handleAdminContactChange}
										inputMode="numeric"
										maxLength={11}
										required
										autoComplete="off"
									/>
								</div>
							</div>
							<div className="w-full flex space-x-10 justify-center">
								<div>
									<label
										htmlFor="adminAddress"
										className="block font-medium text-white">
										Address
									</label>
									<input
										type="text"
										id="adminAddress"
										value={adminAddress}
										onChange={(e) => setAdminAddress(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										required
										autoComplete="off"
									/>
								</div>
								<div>
									<label
										htmlFor="adminQualification"
										className="block font-medium text-white">
										Qualification
									</label>
									<input
										type="text"
										id="adminQualification"
										value={adminQualification}
										placeholder="Type in Text"
										onChange={(e) => setAdminQualification(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										required
										autoComplete="off"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="adminSalary"
									className="block font-medium text-white">
									Salary
								</label>
								<input
									type="number"
									id="adminSalary"
									value={adminSalary}
									onChange={(e) => setAdminSalary(e.target.value)}
									className="border border-gray-300 p-2 rounded "
									required
									autoComplete="off"
								/>
							</div>
							<button
								type="submit"
								className="bg-cyan-800 hover:bg-cyan-900 text-white py-2 px-4 rounded shadow-md shadow-white">
								Add Admin
							</button>
							<p className="text-red-500">{message}</p>
						</form>
					)}
					{selectedAction === "list" && (
						<div className="backdrop-filter backdrop-blur-xl w-3/4 ml-40">
							<h2 className="text-white">ADMIN LIST</h2>
							<div className="flex items-center justify-between space-x-4">
								<div className="text-white w-1/3">
									<h3 className="text-2xl font-semibold">Name</h3>
								</div>
								<div className="text-white w-1/3">
									<h3 className="text-2xl font-semibold">Email</h3>
								</div>
								<div className="text-white w-1/3">
									<h3 className="text-2xl font-semibold">Actions</h3>
								</div>
							</div>
							<div className="mt-2 max-h-96 overflow-y-auto">
								{admin.length > 0 ? (
									admin.map((admin) => (
										<div
											key={admin._id}
											className="flex justify-between space-x-4">
											<div className="text-white w-1/3">
												<p className="text-xl">{admin.name}</p>
											</div>
											<div className="text-white w-1/3">
												<p className="text-2xl">{admin.email}</p>
											</div>
											<div className="text-white w-1/3">
												<p className="text-2xl">{admin.clinicName}</p>
											</div>
											<div className="text-white flex items-center justify-center">
												<button
													className="bg-cyan-900 hover:bg-cyan-950 text-white py-2 px-4 rounded"
													onClick={() => handleSelectAdmin(admin)}>
													View
												</button>
												<button
													className="bg-cyan-900 hover:bg-cyan-950 text-white py-2 px-6 mx-4 rounded"
													onClick={() => handleRemoveAdmin(admin._id)}>
													Remove
												</button>
											</div>
										</div>
									))
								) : (
									<p>No admin data available.</p>
								)}
							</div>
						</div>
					)}

					{selectedAction === "view" && selectedAdmin && (
						<div className="backdrop-filter backdrop-blur-xl w-3/4 ml-40">
							<h2 className="text-white">ADMIN PROFILE</h2>
							<div className="mt-6 flex w-full space-x-96">
								<div className="flex flex-col text-white">
									<div className="flex items-center">
										<h3 className="text-xl font-semibold mr-4">Name:</h3>
										<p className="text-xl mt-2 uppercase">
											{selectedAdmin.name}
										</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">Email:</h3>
										<p className="text-xl mt-2">{selectedAdmin.email}</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">Contact No:</h3>
										<p className="text-xl mt-2">{selectedAdmin.contact}</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">Age:</h3>
										<p className="text-xl mt-2 ">{selectedAdmin.age}</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">Address:</h3>
										<p className="text-xl mt-2 uppercase">
											{selectedAdmin.address}
										</p>
									</div>
									<div className="flex items-center mt-2">
										<h3 className="text-xl font-semibold mr-4">Gender:</h3>
										<p className="text-xl mt-2 uppercase">
											{selectedAdmin.gender}
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
										value={adminName}
										onChange={(e) => setAdminName(e.target.value)}
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
										value={adminEmail}
										onChange={(e) => setAdminEmail(e.target.value)}
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
										value={adminPassword}
										onChange={(e) => setAdminPassword(e.target.value)}
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
										value={adminContact}
										onChange={handleAdminContactChange}
										className="border border-gray-300 p-2 rounded"
										autoComplete="off"
										inputMode="numeric"
										maxLength={11}
									
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
										value={adminAddress}
										onChange={(e) => setAdminAddress(e.target.value)}
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
										value={adminAge}
										onChange={(e) => setAdminAge(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										inputMode="numeric"
										autoComplete="off"
									/>
								</div>
							</div>
							<div className="flex w-full justify-center space-x-8">
								<div>
									<label
										htmlFor="doctorQualification"
										className="block font-medium text-white">
										Qualification
									</label>
									<input
										type="text"
										id="doctorQualification"
										value={adminQualification}
										placeholder="Type in text"
										onChange={(e) => setAdminQualification(e.target.value)}
										className="border border-gray-300 p-2 rounded "
										autoComplete="off"
										
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
									value={adminSalary}
									onChange={(e) => setAdminSalary(e.target.value)}
									className="border border-gray-300 p-2 rounded "
									autoComplete="off"
								
								/>
							</div>
							</div>

							<div className="space-x-8">
								<button
									className="bg-cyan-800 hover:bg-cyan-900 text-white py-2 px-4 rounded"
									onClick={handleEditAdmin}>
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

export default OwnerAdmin;
