import React, { useState, useEffect } from "react";
import backgroundImg from "../../../../assets/background1.png";
import Logo from "../../../../assets/logo3.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DentalChartImage from "../../../../assets/DentalChart.jpeg";
import { Config } from "../../../../config";
const DoctorDental = ({  }) => {
  const toothpatern = { toothNumber: 1, newTreatment: "",teethNo:"" };
  const [patientId, setPatientId] = useState("");
  const [dentalchartrecords, setDentalChartrecords] = useState([]);
  const [filterData, setfilterdata] = useState([]);
  const [patients, setpatients] = useState([]);
  const [dentalChart, setDentalChart] = useState([
    { toothNumber: 1, newTreatment: "",teethNo:"" },
    // Add more teeth as needed
  ]);
  console.log(filterData)
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
  const getdentalcharts = () => {
    axios
      .get(`${Config}api/patient/dentalChart`)
      .then((response) => {
        setDentalChartrecords(response.data.record);
      })
      .catch((error) => {
        console.error("Error patients:", error);
      });
  };
  useEffect(() => {
    getdentalcharts()
    getpatients();
  }, []);
  const handleAddRecord = () => {
    if (patientId !== "") {
      console.log({ patientid: patientId,dentalChart});
      axios
        .post(`${Config}api/patient/dentalChart`, {
          patientid: patientId,
          dentalChart,
        })
        .then((response) => {
          alert("Record added successfully");
          console.log("Record added successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error adding record:", error);
        });
    } else {
      alert("Please select patient id");
    }
  };
  const addnew = () => {
    if (dentalChart.length < 32) {
      const array = [...dentalChart];
      array.push({ ...toothpatern, toothNumber: dentalChart.length + 1 });
      setDentalChart(array);
    } else {
      alert("Cannot add more");
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
  const gotoMedical = () => {
    navigate("/dashboard/doctormedical");
  };

  const gotoTreatment = () => {
    navigate("/dashboard/doctortreat");
  };

  const gotoxray = () => {
    window.open("https://huggingface.co/spaces/Arslan7788/DPCM", "_blank");
  };
  const [selectedAction, setSelectedAction] = useState("New Entry");
  const handleActionChange = (action) => {
    setSelectedAction(action);
  };
  const filterarray = (e) =>{
    setPatientId(e.target.value)
    const array = dentalchartrecords.filter((item)=>item.patientid === e.target.value)
    setfilterdata(array[0].dentalChart)
  }
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
          <div
            className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
            onClick={() => gotoMedical()}
          >
            <h4 className="mt-2 mr-2">Medical History</h4>
          </div>
          <div className="bg-gray-400 flex justify-center text-gray-800  border-b-2 border-gray-500 cursor-pointer">
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
      <div className="w-3/4 bg-none" style={{ overflowY: "scroll" }}>
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
        <div className="flex flex-col text-center">
          <div className="mb-4">
            <div className="flex space-x-4 justify-center text-white mt-4">
              <button
                className={`py-2 px-4 rounded ${
                  selectedAction === "dentalchart"
                    ? "bg-cyan-800"
                    : "bg-cyan-800 hover:bg-cyan-900"
                }`}
                onClick={() => handleActionChange("dentalchart")}
              >
                Dental Chart
              </button>

              <button
                className={`py-2 px-4 rounded ml-44 ${
                  selectedAction === "New Entry"
                    ? "bg-cyan-800"
                    : "bg-cyan-800 hover:bg-cyan-900"
                }`}
                onClick={() => handleActionChange("New Entry")}
              >
                New Entry
              </button>
              <button
                className={`py-2 px-4 rounded ml-44 ${
                  selectedAction === "New Entry"
                    ? "bg-cyan-800"
                    : "bg-cyan-800 hover:bg-cyan-900"
                }`}
                onClick={() => handleActionChange("view")}
              >
                View dental chart
              </button>
            </div>
          </div>
        </div>
        {selectedAction === "dentalchart" && (
          <div
            style={{
              width: "100%",
              height: "80vh",
              marginTop: 10,
              paddingLeft: 80,
              paddingRight: 80,
            }}
          >
            <img
              src={DentalChartImage}
              alt=""
              style={{
                width: "100%",
                height: "80vh",
              }}
            />
          </div>
        )}
        {selectedAction === "New Entry" && (
          <div>
            <div
              style={{
                display: "flex",
                width: "98%",
                justifyContent: "space-between",
              }}
            >
              <h2 className="text-2xl font-bold mb-4 text-white ml-8 mt-5">
                Dental Chart
              </h2>
              <h2 className="text-2xl font-bold mb-4 text-white ml-8 mt-5">
               
                <button
                  onClick={addnew}
                  className="px-3 py-1 bg-cyan-800 hover:bg-cyan-900 text-white rounded-md ml-2"
                >
                  Add
                </button>
              </h2>
            </div>

           <div className="grid gap-2">
            <div className="flex flex-col mb-4">
          <label htmlFor="patient">Select Patient</label>
          <select
            id="patient"
            value={patientId}
            onChange={(e) => 
             {
              setPatientId(e.target.value)
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
              {dentalChart &&
                dentalChart.map((tooth, key) => (
                  <div
                    key={key}
                    className="col-span-1 bg-transparent border-2 border-black backdrop-blur-xl shadow-lg rounded-lg text-white p-2 text-center"
                  >
                    <div className="font-bold text-lg">
                      No.{tooth.toothNumber}
                    </div>
                    <div
                      className="mt-2"
                      style={{
                        display: "flex",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Enter Teeth No"
                        className="border border-gray-300 text-black rounded-md px-2 py-1 w-full"
                        value={tooth.teethNo}
                        onChange={(e) => {
                          const updatedChart = dentalChart.map((t) => {
                            if (t.toothNumber === tooth.toothNumber) {
                              return {
                                ...t,
                                teethNo: e.target.value,
                              };
                            }
                            return t;
                          });
                          setDentalChart(updatedChart);
                        }}
                      />
                       <input
                        type="text"
                        placeholder="Enter description"
                        className="border border-gray-300 text-black rounded-md px-2 py-1 w-full"
                        value={tooth.newTreatment}
                        onChange={(e) => {
                          const updatedChart = dentalChart.map((t) => {
                            if (t.toothNumber === tooth.toothNumber) {
                              return {
                                ...t,
                                newTreatment: e.target.value,
                              };
                            }
                            return t;
                          });
                          setDentalChart(updatedChart);
                        }}
                      />
                    </div>
                  </div>
                ))}
              <div className="mt-6" style={{ width: 200 }}>
                <button
                  className="px-4 py-2 bg-cyan-900 hover:bg-cyan-950 text-white rounded-md ml-12"
                  onClick={handleAddRecord}
                >
                  Save Chart
                </button>
              </div>
            </div> 
          </div>
        )}
        {selectedAction === "view" && dentalchartrecords?.length > 0 && (
          <div className="bg-white rounded-md shadow-md p-4 col-span-2">
                        <div className="flex flex-col mb-4">
          <label htmlFor="patient">Select Patient</label>
          <select
            id="patient"
            value={patientId}
            onChange={(e) => filterarray(e)}
            className="text-black rounded-lg px-3 py-2"
            required
          >
            <option value="">Select Patient</option>
            {dentalchartrecords?.map((patient, key) => (
              <option key={key} value={patient.patientid}>
                {patient.patientid}
              </option>
            ))}
          </select>
        </div>
            <h3 className="text-lg font-semibold mb-2">Dental Chart</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2">patientId</th>
                  <th className="px-4 py-2">Teeth No</th>
                  <th className="px-4 py-2">Treatment</th>
                </tr>
              </thead>
              <tbody>
                {filterData?.map((history, key) => (
                  <tr key={key}>
                    <td className="px-4 py-2">
                      {patientId}
                    </td>
                    <td className="px-4 py-2">
                      {history.teethNo && history.teethNo}
                    </td>
                    <td className="px-4 py-2">{history.newTreatment && history.newTreatment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDental;
