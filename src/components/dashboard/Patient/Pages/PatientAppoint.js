import React, { useEffect, useState } from "react";
import backgroundImg from "../../../../assets/background1.png";
import Logo from "../../../../assets/logo3.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Config } from "../../../../config";
const PatientAppoint = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
    adminId:""
  });
  console.log(formData)
  const [clinicList, setclinicList] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Config}api/appointment`,formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }); // Replace '/api/appointments' with your actual API endpoint
      console.log(response)
      alert("Appointement successfully created")
      // Handle the response or any additional logic here
    } catch (error) {
      // Handle error
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  function handleChangeDate(event) {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();
  
    if (selectedDate < currentDate) {
      // The selected date is in the past, you can show an error message or take appropriate action.
      alert("Please select a future date");
      return;
    }
  
    // Update the form data with the selected date
    setFormData({ ...formData, date: event.target.value });
  }
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

  const gotoPatientProfile = () => {
    navigate("/dashboard/patientprofile");
  };
  const getClinics = async () => {
    try {
      const repsonse = await axios.get(
        `${Config}api/admin/clinicList`
      );
      setclinicList(repsonse.data);
      console.log(repsonse);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClinics();
  }, []);
  return (
    <div
      className="bg-no-repeat bg-cover flex"
      style={{ backgroundImage: `url(${backgroundImg})`, height: "100vh" }}
    >
      <div className="w-1/4 bg-cyan-950 flex flex-col ">
        <img
          src={Logo}
          style={{ height: "300px", width: "300px" }}
          className="ml-12"
        />
        <div className="w-full h-12 text-white flex flex-col text-center pt-2">
          <div
            className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
            onClick={() => gotoPatientDashboard()}
          >
            <h4 className="mt-2">Dashboard</h4>
          </div>
          <div
            className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
            onClick={() => gotoPatientProfile()}
          >
            <h4 className="mt-2">Profile</h4>
          </div>
          <div className="bg-gray-400 text-gray-800 border-b-2 border-gray-500 border-t-2">
            <h4 className="mt-2">Appointment</h4>
          </div>
          <div
            className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
            onClick={() => gotoPatientMedical()}
          >
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
            onClick={handleLogout}
          >
            Log Out
          </button>
          <h5></h5>
        </div>
        <form
          onSubmit={handleSubmit}
          className="text-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-56 mt-24 w-1/2 flex flex-col h-1/2 justify-center text-center"
        >
          <h2 className="text-xl font-bold mb-4">Create an Appointment</h2>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              name="date"
              type="date"
              id="datepicker"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter date"
              value={formData.date}
              onChange={handleChangeDate}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="ClinicName"
              className="block text-white text-sm font-bold mb-2"
            >
              Clinic Name
            </label>
            <select
              id="ClinicName"
              name="adminId"
              value={formData.ClinicName}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              onChange={handleChange}
            >
              <option value="">Select Clinic</option>
              {clinicList.clinics && clinicList.clinics.map((Clinic)=><option value={Clinic._id}>{Clinic.clinicName}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="time"
            >
              Phone No
            </label>
            <input
              type="text"
              name="time"
              id="time"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Phone No"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="reason"
            >
              Reason
            </label>
            <textarea
              name="reason"
              id="reason"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter reason"
              value={formData.reason}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-cyan-800 hover:bg-cyan-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientAppoint;
