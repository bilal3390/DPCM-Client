import React, { useEffect, useState } from "react";
import backgroundImg from "../../../../assets/background1.png";
import Logo from "../../../../assets/logo3.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Config } from "../../../../config";
const DoctorMedical = () => {
  const [action, setaction] = useState("history");
  const [patientId, setPatientId] = useState("");
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [patients, setpatients] = useState([]);
  const [state, setstate] = useState({
    fullname: "",
    dob: "",
    contact: "",
    medication: "",
    dentalhistory: "",
  });
  const [edit, setedit] = useState({
    fullname: "",
    dob: "",
    contact: "",
    medication: "",
    dentalhistory: "",
  });
  const inputhandler = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  const inputhandleredit = (e) => {
    setedit({ ...edit, [e.target.name]: e.target.value });
  };
  const getpatients = () => {
    axios
      .get(`${Config}api/patient`)
      .then((response) => {
        setpatients(response.data);
      })
      .catch((error) => {
        console.error("Error patients:", error);
      });
  };
  const getMedicalRecords = () => {
    axios
      .get(`${Config}api/patient/medicalrecords`)
      .then((response) => {
        setMedicalHistory(response.data);
      })
      .catch((error) => {
        console.error("Error patients:", error);
      });
  };
  const searchmedicalrecord = (patientId) => {
    axios
      .get(`${Config}api/patient/${patientId}`)
      .then((response) => {
        console.log(response);
        if (response.data) {
          setMedicalHistory([response.data]);
          setedit({
            ...edit,
            fullname: response.data.fullname,
            dob: response.data.dob,
            contact: response.data.contact,
            medication: response.data.medication,
            dentalhistory: response.data.dentalhistory,
          });
        } else {
          setMedicalHistory([]);
        }
      })
      .catch((error) => {
        console.error("Error patients:", error);
      });
  };
  const handleAddRecord = () => {
    if (patientId !== "") {
      console.log({ patientid: patientId, ...state });
      axios
        .post(`${Config}api/patient/addmedicalrecord`, {
          patientid: patientId,
          ...state,
        })
        .then((response) => {
          alert("Record added successfully");
          setstate({
            fullname: "",
            dob: "",
            contact: "",
            medication: "",
            dentalhistory: "",
          });
          console.log("Record added successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error adding record:", error);
        });
    } else {
      alert("Please select patient id");
    }
  };

  const handleUpdaterecord = () => {
    if (patientId !== "") {
      axios
        .patch(`${Config}api/patient/update/medicalrecord`, {
          patientid: patientId,
          ...edit,
        })
        .then((response) => {
          alert("Record Updated successfully");
          setstate({
            fullname: "",
            dob: "",
            contact: "",
            medication: "",
            dentalhistory: "",
          });
          console.log("Record Updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error adding record:", error);
        });
    } else {
      alert("Please select patient id");
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ownerId");
    navigate("/doctorlogin", { replace: true });
  };

  const gotoDashboard = () => {
    navigate("/dashboard/doctors");
  };
  const gotoTreatment = () => {
    navigate("/dashboard/doctortreat");
  };

  const gotoDental = () => {
    navigate("/dashboard/doctordental");
  };
  const gotoxray = () => {
    window.open("https://huggingface.co/spaces/Arslan7788/DPCM", "_blank");
  };
  useEffect(() => {
    getpatients();
    getMedicalRecords();
  }, []);
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setPatientId(selectedValue);
    // You can perform any additional actions here based on the selected value
    console.log(selectedValue);
  };
  return (
    <div
      className="bg-no-repeat bg-cover flex"
      style={{ backgroundImage: `url(${backgroundImg})`, height: "120vh" }}
    >
      <div className="w-1/4 bg-cyan-950 flex flex-col ">
        <img
          src={Logo}
          style={{ height: "300px", width: "300px" }}
          className="ml-12"
        />
        <div className="w-full h-12 text-white flex flex-col text-center pt-2">
          <div
            className="bg-gray-700 border-b-2 border-gray-500 border-t-2 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
            onClick={() => gotoDashboard()}
          >
            <h4 className="mt-2">Dashboard</h4>
          </div>
          <div
            className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400 "
            onClick={() => gotoTreatment()}
          >
            <h4 className="mt-2">Treatment Plan</h4>
          </div>
          <div className="bg-gray-400 flex justify-center text-gray-800  border-b-2 border-gray-500 cursor-pointer">
            <h4 className="mt-2 mr-2">Medical History</h4>
          </div>
          <div
            className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
            onClick={() => gotoDental()}
          >
            <h4 className="mt-2">Dental Chart</h4>
          </div>
          <div
            className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
            onClick={() => gotoxray()}
          >
            <h4 className="mt-2">Dental X-ray (ML model)</h4>
          </div>
        </div>
      </div>
      <div className="w-3/4 bg-none">
        <div className="bg-white text-black h-12 flex">
          <h2 className="bg-white h-12 text-black font-bold font-serif ml-4 pt-2 underline">
            DOCTOR DASHBOARD
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

        <div className="text-white mt-2">
          <h2 className="ml-60 mb-12">Medical History</h2>
          <div className="flex">
            <div className="flex" style={{ width: "100%" }}>
              <button
                onClick={() => {
                  setaction("edit");
                }}
                className="bg-cyan-800 w-2/4 hover:bg-cyan-900 h-10 rounded-lg"
              >
                Edit Medical Record
              </button>
              <button
                onClick={() => setaction("history")}
                style={{ marginLeft: 20 }}
                className="bg-cyan-800 w-2/4 hover:bg-cyan-900 h-10 rounded-lg"
              >
                View Medical History
              </button>
              {
                <button
                  onClick={() => setaction("new")}
                  className="bg-cyan-800 w-2/4 hover:bg-cyan-900 h-10 rounded-lg"
                  style={{ marginLeft: 20 }}
                >
                  Create Record
                </button>
              }
              {action === "new" && (
                <button
                  onClick={handleAddRecord}
                  style={{ marginLeft: 20 }}
                  className="bg-cyan-800 w-2/4 hover:bg-cyan-900 h-10 rounded-lg"
                >
                  Add Record
                </button>
              )}
              {action === "edit" && (
                <button
                  onClick={handleUpdaterecord}
                  style={{ marginLeft: 20 }}
                  className="bg-cyan-800 w-2/4 hover:bg-cyan-900 h-10 rounded-lg"
                >
                  Update Record
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="patient">Select Patient</label>
          <select
            id="patient"
            value={patientId}
            onChange={(e) => 
             {
              setPatientId(e.target.value)
              searchmedicalrecord(e.target.value)
             }}
            className="text-black rounded-lg px-3 py-2"
            required
          >
            <option value="">Select Patient</option>
            {patients?.map((patient, key) => (
              <option key={key} value={patient.patientId}>
                {patient.patientId}
              </option>
            ))}
          </select>
        </div>
        {action === "history" && medicalHistory.length > 0 && (
          <div className="bg-white rounded-md shadow-md p-4 col-span-2">
            <h3 className="text-lg font-semibold mb-2">dentalhistory</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2">patientId</th>
                  <th className="px-4 py-2">fullname</th>
                  <th className="px-4 py-2">dob</th>
                  <th className="px-4 py-2">contact</th>
                  <th className="px-4 py-2">medication</th>
                  <th className="px-4 py-2">dentalhistory</th>
                </tr>
              </thead>
              <tbody>
                {medicalHistory.length == 0 && (
                  <td className="px-4 py-2">Not found</td>
                )}
                {medicalHistory?.map((history, key) => (
                  <tr key={key}>
                    <td className="px-4 py-2">
                      {history.patientid && history.patientid}
                    </td>
                    <td className="px-4 py-2">
                      {history.fullname && history.fullname}
                    </td>
                    <td className="px-4 py-2">{history.dob && history.dob}</td>
                    <td className="px-4 py-2">
                      {history.contact && history.contact}
                    </td>
                    <td className="px-4 py-2">
                      {history.medication && history.medication}
                    </td>
                    <td className="px-4 py-2">
                      {history.dentalhistory && history.dentalhistory}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {action === "new" && (
          <div className="text-white flex flex-col w-1/2 ml-80 text-center">
            <div className="flex flex-col mb-4">
              <label htmlFor="fullname" className="mb-2">
                Enter Full name
              </label>
              <input
                type="text"
                name="fullname"
                className="text-black rounded-lg px-3 py-2 "
                value={state.fullname}
                onChange={inputhandler}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="dob" className="mb-2">
                Enter Dob
              </label>
              <input
                type="date"
                id="datepicker"
                name="dob"
                className="text-black rounded-lg px-3 py-2 "
                value={state.dob}
                onChange={inputhandler}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="contact" className="mb-2">
                Enter Contact
              </label>
              <input
                type="text"
                id="dob"
                name="contact"
                className="text-black rounded-lg px-3 py-2 "
                value={state.contact}
                onChange={inputhandler}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="medication" className="mb-2">
                Enter Medication
              </label>
              <input
                type="text"
                id="medication"
                name="medication"
                className="text-black rounded-lg px-3 py-2"
                value={state.medication}
                onChange={inputhandler}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="medication" className="mb-2">
                Enter Dental History
              </label>
              <input
                type="text"
                name="dentalhistory"
                className="text-black rounded-lg px-3 py-2"
                value={state.dentalhistory}
                onChange={inputhandler}
              />
            </div>
          </div>
        )}
        {action === "edit" && (
          <div className="text-white flex flex-col w-1/2 ml-80 text-center">
            <div className="flex flex-col mb-4">
              <label htmlFor="fullname" className="mb-2">
                Enter Full name
              </label>
              <input
                type="text"
                name="fullname"
                className="text-black rounded-lg px-3 py-2 "
                value={edit.fullname}
                onChange={inputhandleredit}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="dob" className="mb-2">
                Enter Dob
              </label>
              <input
                type="date"
                id="datepicker"
                name="dob"
                className="text-black rounded-lg px-3 py-2 "
                value={edit.dob}
                onChange={inputhandleredit}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="contact" className="mb-2">
                Enter Contact
              </label>
              <input
                type="text"
                id="dob"
                name="contact"
                className="text-black rounded-lg px-3 py-2 "
                value={edit.contact}
                onChange={inputhandleredit}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="medication" className="mb-2">
                Enter Medication
              </label>
              <input
                type="text"
                id="medication"
                name="medication"
                className="text-black rounded-lg px-3 py-2"
                value={edit.medication}
                onChange={inputhandleredit}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="medication" className="mb-2">
                Enter Dental History
              </label>
              <input
                type="text"
                name="dentalhistory"
                className="text-black rounded-lg px-3 py-2"
                value={edit.dentalhistory}
                onChange={inputhandleredit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorMedical;
