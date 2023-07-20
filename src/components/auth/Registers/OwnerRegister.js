import React, { useState } from "react";
import Navbar from "../../common/Navbar";
import backgroundImg from "../../../assets/background1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Config } from "../../../config";
const OwnerRegister = () => {
	const [isChecked, setIsChecked] = useState(false);
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [contact, setContact] = useState("");
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState("");

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const navigate = useNavigate();
	const gotoLogin = () => {
		navigate("/ownerlogin");
	};

	const handleRegister = async () => {
		event.preventDefault();
		const validationErrors = {};

		// Perform validation checks
		if (userName.trim() === "") {
			validationErrors.userName = "Username is required";
		}
		if (email.trim() === "") {
			validationErrors.email = "Email is required";
		}
		if (password.trim() === "") {
			validationErrors.password = "Password is required";
		}
		if (contact.trim() === "") {
			validationErrors.contact = "Contact is required";
		}

		// If there are validation errors, set the errors state and return
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		try {
			const response = await axios.post(
				`${Config}api/auth/signup`,
				{
					email: email,
					password: password,
					username: userName,
					contactInfo: contact,
				},
			);
			const { token } = response.data;
			// Handle successful registration, such as storing the token or redirecting to a login page
			localStorage.setItem("token", token);
			navigate("/ownerlogin");
		} catch (error) {
			setMessage("Invalid Info");
			console.log("Registration error:", error);
		}
	};

	const [contactError, setContactError] = useState("");

	function handleDoctorContactChange(e) {
		const input = e.target.value.replace(/\D/g, "").slice(0, 11);
		setContact(input);

		if (input.length !== 11) {
			setContactError("Invalid Number");
		} else {
			setContactError("");
		}
	}

	return (
		<div
			className="bg-no-repeat bg-cover"
			style={{ backgroundImage: `url(${backgroundImg})`, height: "100vh" }}>
			<div className="nav-bar bg-none">
				<Navbar />
			</div>
			<div className="mx-80 flex flex-col bg-none w-5/12 text-center shadow-cyan-900 shadow-2xl backdrop-filter backdrop-blur-xl">
				<div className="rounded-full w-2/4 ml-44 mt-4 flex shadow-lg text-black">
					<div className="w-1/2  cursor-pointer" onClick={() => gotoLogin()}>
						<h4>Login</h4>
					</div>
					<div className="w-1/2 rounded-full border-2 border-black bg-yellow-700">
						<h4>Register</h4>
					</div>
				</div>
				<div className="mt-10">
					<input
						type="text"
						placeholder="User Name"
						className="w-1/2 h-9 bg-transparent border-b-2 border-white text-white"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
					{errors.userName && (
						<p className="text-red-500 absolute top-24 right-44">
							*{errors.userName}
						</p>
					)}
				</div>
				<div className="mt-4">
					<input
						type="text"
						placeholder="Email"
						className="w-1/2 h-9 bg-transparent border-b-2 border-white text-white"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{errors.email && (
						<p className="text-red-500 absolute top-40 right-44">
							*{errors.email}
						</p>
					)}
				</div>
				<div className="mt-4">
					<input
						type="Password"
						placeholder="Password"
						className="w-1/2 h-9 bg-transparent border-b-2 border-white text-white"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{errors.password && (
						<p className="text-red-500 absolute top-56 right-44">
							*{errors.password}
						</p>
					)}
				</div>
				<div className="mt-4">
					<input
						type="text"
						placeholder="Contact"
						className="w-1/2 h-9 bg-transparent border-b-2 border-white text-white"
						value={contact}
						onChange={handleDoctorContactChange}
						inputMode="numeric"
						maxLength={11}
						required
					/>
					{contactError && <p className="text-red-500">{contactError}</p>}
				</div>
				<div>
					<label
						htmlFor="terms"
						className="flex items-center ml-44 mt-4 cursor-pointer">
						<input
							type="checkbox"
							id="terms"
							checked={isChecked}
							onChange={handleCheckboxChange}
							className="form-checkbox mr-2 cursor-pointer"
						/>
						<span className="text-sm text-gray-600">
							I agree to the terms and conditions
						</span>
					</label>

					<button
						type="button"
						className={`mt-4 px-4 py-2 bg-yellow-700 text-black rounded-full w-1/2 font-bold text-xl mb-4 ${
							isChecked ? "hover:bg-yellow-900" : "opacity-50 cursor-default"
						}`}
						disabled={!isChecked}
						onClick={handleRegister}>
						Register
					</button>
				</div>
			</div>
		</div>
	);
};

export default OwnerRegister;
