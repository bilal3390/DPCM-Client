import React, { useState } from "react";
import Navbar from "../../common/Navbar";
import backgroundImg from "../../../assets/background1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminResetPasswordModal from "../ResetPasswordModals/AdminResetPasswordModal";
import Modal from "react-modal";
import { Config } from "../../../config";
const AdminLogin = () => {
	const [rememberMe, setRememberMe] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [showModal, setShowModal] = useState(false);

	const handleCheckboxChange = (event) => {
		setRememberMe(event.target.checked);
	};

	const navigate = useNavigate();

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
				`${Config}api/admin/loginadmin`,
				{ email, password },
			);
			// Handle successful login
			const token = response.data.token;
			// Store the token or perform any other actions required for successful login
			navigate("/dashboard/admin");
			localStorage.setItem('user',JSON.stringify(response.data))
			localStorage.setItem("token", token);
		} catch (error) {
			// Handle login error
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				const errorMessage = error.response.data.message;
				setErrors({ login: errorMessage });
			} else {
				setErrors({ login: "An error occurred during login" });
			}
		}
	};

	return (
		<div
			className="bg-no-repeat bg-cover"
			style={{ backgroundImage: `url(${backgroundImg})`, height: "100vh" }}>
			<div className="bg-none">
				<Navbar />
			</div>
			<div className="mx-80 flex flex-col bg-none h-96  w-5/12 text-center shadow-cyan-900 shadow-2xl backdrop-filter backdrop-blur-xl">
				<div className="rounded-full w-2/4 ml-44 mt-3 flex justify-center  text-black">
					<div className="w-1/2 rounded-full bg-yellow-700">
						<h4>Login</h4>
					</div>
				</div>

				<div className="mt-4">
					<div className="relative">
						<input
							type="text"
							placeholder="Email ID"
							className={`w-1/2 h-9 bg-transparent border-b-2 border-white text-white ${
								errors.email ? "border-red-500" : ""
							}`}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{errors.email && (
							<p className="text-red-500 absolute top-0 right-44 ">
								*{errors.email}
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
				{errors.login && <p className="text-red-500">*{errors.login}</p>}

				<button
					className="bg-yellow-700 w-1/2 ml-44 mt-3 h-10 rounded-full font-bold text-xl hover:bg-yellow-900 "
					onClick={() => setShowModal(true)}>
					Forgot Password?
				</button>
				<Modal
					isOpen={showModal}
					onRequestClose={() => setShowModal(false)}
					contentLabel="Reset Password Modal">
					<AdminResetPasswordModal setShowModal={setShowModal} />
				</Modal>
			</div>
		</div>
	);
};

export default AdminLogin;
