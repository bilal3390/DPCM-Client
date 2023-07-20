import React, { useState, useEffect } from "react";
import backgroundImg from "../../../assets/background1.png";
import Logo from "../../../assets/logo3.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Config } from "../../../config";
const Owner = () => {
	const [showProfile, setShowProfile] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editedProfile, setEditedProfile] = useState({
		username: "",
		email: "",
		contactInfo: "",
	});
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem("ownerId");
		navigate("/ownerlogin", { replace: true });
	};

	const gotoAdmin = () => {
		navigate("/dashboard/owneradmin");
	};

	const gotoProfit = () => {
		navigate("/dashboard/ownerprofit");
	};

	// API FOR GETTING OWNER DATA!!!!!!


  const fetchOwnerDetails = async () => {
    try {
      const ownerId = localStorage.getItem("ownerId");

      // Make the API call to fetch the owner details using the retrieved ownerId
      const response = await axios.get(
        `${Config}api/auth/${ownerId}`
      );
      const ownerData = response.data;

      setShowProfile(ownerData);
    } catch (error) {
      console.log("Error fetching owner details:", error);
    }
  };

  useEffect(() => {
    fetchOwnerDetails();
  }, []);

	const handleEditProfile = () => {
		setIsEditing(true);
		setEditedProfile({
			username: showProfile.username,
			email: showProfile.email,
			contactInfo: showProfile.contactInfo,
		});
	};

	const handleProfileChange = (e) => {
		setEditedProfile((prevProfile) => ({
			...prevProfile,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSaveProfile = async () => {
    try {
      const ownerId = localStorage.getItem("ownerId");
  
      // Make the API call to update the owner profile using the retrieved ownerId
      await axios.put(
        `${Config}api/auth/${ownerId}`,
        editedProfile
      );
  
      // Refresh the owner details after updating
      fetchOwnerDetails();
  
  
      // Clear the input fields
      setEditedProfile({
        username: "",
        email: "",
        contactInfo: "",
      });
      handleCancelEdit()
  
    } catch (error) {
      console.log("Error saving owner profile:", error);
    }
  };
  

	const handleCancelEdit = () => {
		setIsEditing(false);
	};

	return (
		<div
			className="bg-no-repeat bg-cover flex"
			style={{ backgroundImage: `url(${backgroundImg})`, height: "100vh" }}>
			<div className="w-1/4 bg-cyan-950 flex flex-col">
				<img
					src={Logo}
					style={{ height: "300px", width: "300px" }}
					className="ml-12"
				/>
				<div className="w-full h-12 text-white flex flex-col text-center pt-2">
					<div className="bg-gray-400 flex justify-center text-gray-800  border-b-2 border-gray-500 cursor-pointer">
						<h4 className="mt-2">Dashboard</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={gotoAdmin}>
						<h4 className="ml-3 mt-2">Admin</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={gotoProfit}>
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
				<div className="flex justify-center mt-8">
					<div className="bg-gray-900 bg-opacity-50 px-8 py-6 rounded-lg text-white w-[600px] shadow-xl shadow-cyan-900 mt-20">
						{showProfile ? (
							<>
								<h2 className="text-3xl mb-4 font-bold ml-36 underline">
									OWNER PROFILE
								</h2>
								<div className="flex">
									<div>
										<div className="mb-4 flex">
											<label className="block mb-2 mr-3 text-xl font-bold">
												Username
											</label>
											<p className="font-bold text-xl mr-4 ml-4">:</p>
											{isEditing ? (
												<input
													type="text"
													name="username"
													value={editedProfile.username}
													onChange={handleProfileChange}
													className="text-lg text-black"
												/>
											) : (
												<p className="text-lg">{showProfile.username}</p>
											)}
										</div>
										<div className="mb-4 flex">
											<label className="block mb-2 mr-8 ml-5 text-xl font-bold">
												Email
											</label>
											<p className="font-bold text-xl mr-4 ml-5">:</p>
											{isEditing ? (
												<input
													type="text"
													name="email"
													value={editedProfile.email}
													onChange={handleProfileChange}
													className="text-lg text-black"
												/>
											) : (
												<p className="text-lg">{showProfile.email}</p>
											)}
										</div>
										<div className="mb-4 flex">
											<label className="block mb-2 mr-3 text-xl font-bold ml-2">
												Contact
											</label>
											<p className="font-bold text-xl mr-4 ml-8">:</p>
											{isEditing ? (
												<input
													type="text"
													name="contactInfo"
													value={editedProfile.contactInfo}
													onChange={handleProfileChange}
													className="text-lg text-black"
												/>
											) : (
												<p className="text-lg">{showProfile.contactInfo}</p>
											)}
										</div>
										{isEditing ? (
											<>
												<div className="flex">
													<button
														className="bg-red-500 text-white py-2 px-4 w-32 rounded h-12 ml-60 shadow-md shadow-white"
														onClick={handleCancelEdit}>
														Cancel
													</button>
													<button
														className="bg-green-500 text-white py-2 px-4 w-32 rounded h-12 ml-4 shadow-md shadow-white"
														onClick={handleSaveProfile}>
														Save
													</button>
												</div>
											</>
										) : (
											<button
												className="bg-cyan-900 text-white py-2 px-4 w-44 rounded h-12 ml-80 shadow-md shadow-white"
												onClick={handleEditProfile}>
												Edit Profile
											</button>
										)}
									</div>
								</div>
							</>
						) : (
							<>
								<h2 className="text-2xl mb-4">Welcome, Owner!</h2>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Owner;
