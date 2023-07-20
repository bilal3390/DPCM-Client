import React, { useState } from "react";
import Navbar from "../../common/Navbar";
import backgroundImg from "../../../assets/background1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import PatientResetPasswordModal from "../ResetPasswordModals/PatientResetPasswordModal";
import { Config } from "../../../config";
const Login = () => {
	const [rememberMe, setRememberMe] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [showModal, setShowModal] = useState(false);

	const navigate = useNavigate();

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const handleCheckboxChange = (event) => {
		setRememberMe(event.target.checked);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const validationErrors = {};

		// Perform validation checks
		if (email.trim() === "") {
			validationErrors.email = "Email is required";
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
				`${Config}api/patient/login`,
				{
					email,
					password,
				},
			);
			// Handle successful login
			console.log(response.data);
			const { message, token ,data} = response.data;
			setMessage(message);
			// Save the token in local storage or a cookie for authentication
			localStorage.setItem("token", token);
			localStorage.setItem('patient',JSON.stringify(data))
			// Reset form fields and state
			setEmail("");
			setPassword("");
			setErrors({});
			navigate("/dashboard/patients");
		} catch (error) {
			// Handle login error
			if (error.response && error.response.data) {
				console.log(error.response.data);
				setMessage("Login failed");
			} else {
				console.error(error);
				setMessage("An error occurred during login");
			}
		}
	};

	const gotoRegister = () => {
		navigate("/register");
	};

	const gotoDoctor = () => {
		navigate("/doctorlogin");
	};

	const gotoAdmin = () => {
		navigate("/adminlogin");
	};

	const gotoOwner = () => {
		navigate("/ownerlogin");
	};

	return (
		<div
			className="bg-no-repeat bg-cover"
			style={{ backgroundImage: `url(${backgroundImg})`, height: "110vh" }}>
			<div className="nav-bar bg-none">
				<Navbar />
			</div>
			<div className="flex flex-row">
				<div className="mx-80 flex flex-col bg-none w-5/12 text-center shadow-cyan-900 shadow-2xl backdrop-filter backdrop-blur-xl">
					<div className="rounded-full w-2/4 ml-44 mt-2 flex shadow-lg text-black">
						<div className="w-1/2 rounded-full  border-2 border-black bg-yellow-700">
							<h4>Login</h4>
						</div>
						<div
							className="w-1/2 rounded-r-full cursor-pointer "
							onClick={() => gotoRegister()}>
							<h4>Register</h4>
						</div>
					</div>
					<p className="text-lg text-red-500">{message}</p>
					<div className="w-1/2 mx-44 my-4 relative">
						<div className="relative">
							<button
								className="bg-yellow-700 text-black w-full h-12 rounded-lg font-semibold cursor-pointer hover:underline"
								onClick={() => toggleDropdown()}>
								{dropdownOpen ? "Close" : "Select Login"}
							</button>
							{dropdownOpen && (
								<div className="absolute z-10 w-full  bg-yellow-700 border-2 border-black text-black rounded-lg shadow-lg">
									<button
										className="block w-full h-12 px-4 py-2 text-left hover:bg-yellow-900"
										onClick={() => gotoOwner()}>
										Login as an Owner
									</button>
									<button
										className="block w-full h-12 px-4 py-2 text-left hover:bg-yellow-900"
										onClick={() => gotoAdmin()}>
										Login as an Administrator
									</button>
									<button
										className="block w-full h-12 px-4 py-2 text-left hover:bg-yellow-900"
										onClick={() => gotoDoctor()}>
										Login as an Doctor
									</button>
								</div>
							)}
						</div>
					</div>
					<h4 className="text-white">Patient's Login</h4>
					<div className="mt-4 ml-8">
						<input
							type="email"
							placeholder="Email ID"
							className="w-1/2 h-9 pl-2 bg-transparent border-b-2 border-white text-white"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete="off"
						/>
						{errors.email && (
							<p className="text-red-500 absolute  right-44 ">
								*{errors.email}
							</p>
						)}
					</div>
					<div className="mt-4 ml-8">
						<input
							type="password"
							placeholder="Enter Password"
							className="w-1/2 h-9 pl-2 bg-transparent border-b-2 border-white text-white"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						{errors.password && (
							<p className="text-red-500 absolute right-44">
								*{errors.password}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor="terms"
							className="flex items-center ml-44 mt-4 cursor-pointer">
							<input
								type="checkbox"
								id="terms"
								checked={rememberMe}
								onChange={handleCheckboxChange}
								className="form-checkbox mr-2 cursor-pointer"
							/>
							<span className="text-sm text-gray-600">
								Remember my Password
							</span>
						</label>
							<div className="flex flex-col ml-44 w-full">
						<button
							type="button"
							className="mt-4 px-4 py-2 bg-yellow-700 text-black rounded-full w-1/2 font-bold text-xl mb-4"
							onClick={handleSubmit}>
							Login
						</button>
						<button
							className="bg-yellow-700 w-1/2 mb-2 h-10 rounded-full font-bold text-xl hover:bg-yellow-900 "
							onClick={() => setShowModal(true)}>
							Forgot Password?
						</button>
						<Modal
							isOpen={showModal}
							onRequestClose={() => setShowModal(false)}
							contentLabel="Reset Password Modal">
							<PatientResetPasswordModal setShowModal={setShowModal} />
						</Modal>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
