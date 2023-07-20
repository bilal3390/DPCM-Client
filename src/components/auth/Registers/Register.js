import React, { useState } from "react";
import Navbar from "../../common/Navbar";
import backgroundImg from "../../../assets/background1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Config } from "../../../config";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords Unmatched");
        return;
      }
      console.log(firstName + ' ' +lastName)
      const response = await axios.post(`${Config}api/patient/signup`, {
        name:firstName + ' ' +lastName,
        email,
        password,
      });

      // Handle successful signup
      console.log(response.data);
      setErrorMessage("");
      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      // Handle signup error
      if (error.response && error.response.data) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.error);
      } else {
        console.error(error);
        setErrorMessage("An error occurred during signup");
      }
    }
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigate = useNavigate();
  const gotoLogin = () => {
    navigate("/login");
  };

  const gotoOwnerRegister = () => {
    navigate("/ownerregister");
  };

  return (
    <div
      className="bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${backgroundImg})`, height: "120vh" }}
    >
      <div className="nav-bar bg-none">
        <Navbar />
      </div>
      <div className="flex flex-row">
        <div className="mx-80 flex flex-col bg-none w-5/12 text-center shadow-cyan-900 shadow-2xl backdrop-filter backdrop-blur-xl">
          <div className="rounded-full w-2/4 ml-44 mt-2 flex shadow-lg text-black">
            <div
              className="w-1/2 rounded-l-full cursor-pointer"
              onClick={() => gotoLogin()}
            >
              <h4>Login</h4>
            </div>
            <div className="w-1/2 rounded-full border-2 border-black bg-yellow-700">
              <h4>Register</h4>
            </div>
          </div>
          <div className="w-1/2 mx-44 my-4 relative">
            <div className="relative">
              <button
                className="bg-yellow-700 text-black w-full h-12 rounded-lg font-semibold cursor-pointer hover:underline"
                onClick={() => toggleDropdown()}
              >
                {dropdownOpen ? "Close" : "Select Register"}
              </button>
              {dropdownOpen && (
                <div className="absolute z-10 w-full  bg-yellow-700 border-2 border-black text-black rounded-lg shadow-lg">
                  <button
                    className="block w-full h-12 px-4 py-2 text-left hover:bg-yellow-900"
                    onClick={() => gotoOwnerRegister()}
                  >
                    Register as an Owner
                  </button>
                </div>
              )}
            </div>
          </div>
          <h4 className="text-white mt-3">Patient's Registration</h4>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 h-9 bg-transparent border-b-2 border-white text-white"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 h-9 bg-transparent border-b-2 border-white text-white"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Email ID"
                className="w-1/2 h-9 bg-transparent border-b-2 border-white text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <input
                type="password"
                placeholder="Enter Password"
                className="w-1/2 h-9 bg-transparent border-b-2 border-white text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-1/2 h-9 bg-transparent border-b-2 border-white text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div>
              <label
                htmlFor="terms"
                className="flex items-center ml-44 mt-4 cursor-pointer"
              >
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
                type="submit"
                className={`mt-4 px-4 py-2 bg-yellow-700 text-black rounded-full w-1/2 font-bold text-xl mb-4 ${
                  isChecked
                    ? "hover:bg-yellow-900"
                    : "opacity-50 cursor-default"
                }`}
                disabled={!isChecked}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
