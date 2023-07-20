import React, { useState } from "react";
import axios from "axios";
import backgroundImg from "../../../assets/background1.png";
import { Config } from "../../../config";
const ResetPasswordModal = ({setShowModal}) => {
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  

  const handleEmail = async () => {
    try {
      const response = await axios.post(`${Config}api/auth/token`, {
        email: email,
      });

      if (response.data.message === "Password reset token sent successfully") {
        setIsEmailSubmitted(true);
        alert("Verification code sent successfully");
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.log("Error checking user:", error);
      alert("Invalid Email. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`${Config}api/auth/reset`, {
        token: verificationCode,
        newPassword: newPassword,
      });

      if (response.data.message === "Password reset successful") {
        setNewPassword("");
        setEmail("");
        setVerificationCode("");
        alert("Password reset successful!");
      } else {
        alert("Invalid or expired verification code");
      }
    } catch (error) {
      console.log("Error resetting password:", error);
      alert("Password reset failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleResetPassword();
    setShowModal(false);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    await handleEmail();
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})`, height: "100vh" }}
    >
      <div className="bg-black bg-opacity-50 "></div>
      <div className="bg-white w-80 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        {!isEmailSubmitted ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white rounded px-2 py-1"
                required
              />
            </div>
            <div className="text-center">
              <button
                className="bg-cyan-800 hover:bg-cyan-900 text-white py-2 px-4 rounded"
                type="submit"
              >
                Submit Email
              </button>
            </div>
            <div className="text-center">
              <button
                className="bg-red-700 hover:bg-red-900 text-white py-2 px-4 mt-2 rounded"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Verification Code:</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full bg-gray-800 text-white rounded px-2 py-1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-gray-800 text-white rounded px-2 py-1"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-cyan-900 text-white py-2 px-4 rounded"
              >
                Submit Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordModal;
