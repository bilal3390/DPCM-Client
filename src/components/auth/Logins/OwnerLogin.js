import React, { useState } from "react";
import Navbar from "../../common/Navbar";
import backgroundImg from "../../../assets/background1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ResetPasswordModal from "../ResetPasswordModals/OwnerResetPasswordModal";
import Modal from "react-modal";
import { Config } from "../../../config";
const OwnerLogin = () => {
	const [rememberMe, setRememberMe] = useState(false);
	const [username, setusername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState({});
	const [showModal, setShowModal] = useState(false);

	const handleCheckboxChange = (event) => {
		setRememberMe(event.target.checked);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const validationErrors = {};

		// Perform validation checks
		if (username.trim() === "") {
			validationErrors.username = "Username is required";
		}
		if (password.trim() === "") {
			validationErrors.password = "Password is required";
		}
		// If there are validation errors, set the errors state and return
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		try {
			const response = await axios.post(
				`${Config}api/auth/login`,
				{ username, password },
			);
			// Handle successful login
			const token = response.data.token;
			const ownerId = response.data.ownerId;
			// Store the token or perform any other actions required for successful login
		
				navigate("/dashboard/owner");
		
				localStorage.setItem("token", token);
				localStorage.setItem("ownerId", ownerId);
			

			
		} catch (error) {
			// Handle login error
			const errorMessage = error.response.data.message;
			setErrors({ login: errorMessage });
			setMessage("Invalid Info");
		}
	};

	



	const navigate = useNavigate();
	const gotoRegister = () => {
		navigate("/ownerregister");
	};

	return (
		<div
			className="bg-no-repeat bg-cover"
			style={{ backgroundImage: `url(${backgroundImg})`, height: "100vh" }}>
			<div className="bg-none">
				<Navbar />
			</div>
			<div className="mx-80 flex flex-col bg-none h-96 w-5/12 text-center shadow-cyan-900 shadow-2xl backdrop-filter backdrop-blur-xl">
				<div className="rounded-full w-2/4 ml-44 mt-4 flex shadow-lg text-black">
					<div className="w-1/2 border-2 border-black bg-yellow-700 rounded-full">
						<h4>Login</h4>
					</div>
					<div
						className="w-1/2 rounded-full cursor-pointer"
						onClick={() => gotoRegister()}>
						<h4>Register</h4>
					</div>
				</div>
				<div className="mt-10">
					<p className="text-red-500 text-md absolute top-20 right-80 ">
						{message}
					</p>
					<div className="relative">
						<input
							type="text"
							placeholder="Username"
							className={`w-1/2 h-9 bg-transparent border-b-2 border-white text-white ${
								errors.username ? "border-red-500" : ""
							}`}
							value={username}
							onChange={(e) => setusername(e.target.value)}
						/>
						{errors.username && (
							<p className="text-red-500 absolute top-0 right-44">
								*{errors.username}
							</p>
						)}
					</div>
				</div>
				<div className="mt-4">
					<div className="relative">
						<input
							type="password"
							placeholder="Enter Password"
							className={`w-1/2 h-9 bg-transparent border-b-2 border-white text-white ${
								errors.password ? "border-red-500" : ""
							}`}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{errors.password && (
							<p className="text-red-500 absolute top-0 right-44">
								*{errors.password}
							</p>
						)}
					</div>
				</div>
				<div className="flex ml-44 mt-4">
					<input
						type="checkbox"
						id="remember"
						name="remember"
						checked={rememberMe}
						onChange={handleCheckboxChange}
						className="text-white cursor-pointer"
					/>
					<label
						htmlFor="remember"
						className="text-white font-thin ml-2 cursor-pointer">
						Remember Password
					</label>
				</div>
				<button
					className="bg-yellow-700 w-1/2 ml-44 mt-4 h-10 rounded-full font-bold text-xl hover:bg-yellow-900"
					onClick={handleSubmit}>
					Log in
				</button>
				<button
					className="bg-yellow-700 w-1/2 ml-44 mt-3 h-10 rounded-full font-bold text-xl hover:bg-yellow-900 "
					onClick={() => setShowModal(true)}>
					Forgot Password?
				</button>
				<Modal
					isOpen={showModal}
					onRequestClose={() => setShowModal(false)}
					contentLabel="Reset Password Modal">
					<ResetPasswordModal 
					setShowModal={setShowModal}
					/>
				</Modal>
			</div>
		</div>
	);
};

export default OwnerLogin;
