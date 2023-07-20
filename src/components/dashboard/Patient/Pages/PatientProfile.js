import React, { useState, useEffect } from "react";
import backgroundImg from "../../../../assets/background1.png";
import Logo from "../../../../assets/logo3.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Config } from "../../../../config";
const PatientProfile = () => {
	const [profileData, setProfileData] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editedProfileData, setEditedProfileData] = useState({
		name:"",
		email:"",
		address:""
	});

	useEffect(() => {
		fetchProfileData();
	}, []);

	const fetchProfileData = async () => {
		try {
			const response = await axios.get(`${Config}api/patient/myprofile`,{
				headers: {
				  Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			  }); // Replace '/api/profile' with your actual API endpoint
			console.log(response)
			setProfileData(response.data);
			setEditedProfileData(response.data);
		} catch (error) {
			// Handle error
		}
	};

	const handleEditProfile = () => {
		setIsEditing(true);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setEditedProfileData(profileData);
	};

	const handleSaveProfile = async () => {
		console.log(editedProfileData)
		try {
			const response = await axios.patch(`${Config}api/patient/update`, editedProfileData,{
				headers: {
				  Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			  }); // Replace '/api/profile' with your actual API endpoint
			setProfileData(response.data);
			fetchProfileData()
			setIsEditing(false);
		} catch (error) {
			// Handle error
		}
	};

	const handleInputChange = (e) => {
		console.log(e.target.value,e.target.name)
		setEditedProfileData({
			...editedProfileData,
			[e.target.name]: e.target.value,
		});
	};
	const navigate = useNavigate();
  const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("ownerId");
		navigate("/login", { replace: true });
	};

	const gotoPatientDashboard = () => {
		navigate("/dashboard/patients");
	};
	const gotoPatientMedical = () => {
		navigate("/dashboard/patientmedical");
	};

	const gotoPatientAppoint = () => {
		navigate("/dashboard/patientappoint");
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
					<div
						className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoPatientDashboard()}>
						<h4 className="mt-2">Dashboard</h4>
					</div>
					<div className="bg-gray-400 text-gray-800 border-b-2 border-gray-500 border-t-2">
						<h4 className="mt-2">Profile</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoPatientAppoint()}>
						<h4 className="mt-2">Appointment</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoPatientMedical()}>
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

				<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-12">
					<h2 className="text-xl font-bold mb-4">Profile</h2>
					{isEditing ? (
						<div>
							<div className="mb-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="name">
									Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									value={editedProfileData?.name || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="mb-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="email">
									Email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									value={editedProfileData?.email || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="mb-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="address">
									Address
								</label>
								<textarea
									name="address"
									id="address"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									value={editedProfileData?.address || ""}
									onChange={handleInputChange}
								/>
							</div>

							<div className="mt-4">
								<button
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
									onClick={handleSaveProfile}>
									Save Profile
								</button>
								<button
									className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
									onClick={handleCancelEdit}>
									Cancel
								</button>
							</div>
						</div>
					) : (
						<div>
							{profileData ? (
								<div>
									<p>
										<strong>Name:</strong> {profileData.name}
									</p>
									<p>
										<strong>Email:</strong> {profileData.email}
									</p>
									<p>
										<strong>Address:</strong> {profileData.address}
									</p>
									<p>
										<strong>ID:</strong> {profileData.patientId}
									</p>
									<div className="mt-4">
										<button
											className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
											onClick={handleEditProfile}>
											Edit Profile
										</button>
										<button
											className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
											onClick={fetchProfileData}>
											Refresh
										</button>
									</div>
								</div>
							) : (
								<p>Loading profile data...</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PatientProfile;
