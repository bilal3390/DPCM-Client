import React, { useState, useEffect } from "react";
import backgroundImg from "../../../../assets/background1.png";
import Logo from "../../../../assets/logo3.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Config } from "../../../../config";
const AdminFinance = () => {
  const [state, setstate] = useState({
    description: "",
    expense: 0,
    profit: 0,
    expenseType:""
  });

  const [financialData, setFinancialData] = useState(null);

  // useEffect(() => {
  //   // Fetch financial data from the backend
  //   axios.get('/api/finance')
  //     .then(response => {
  //       const fetchedData = response.data;
  //       setFinancialData(fetchedData);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching financial data:', error);
  //     });
  // }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ownerId");
    navigate("/ownerlogin", { replace: true });
  };

  const gotoAdminDashboard = () => {
    navigate("/dashboard/admin");
  };

  const gotoDoctor = () => {
    navigate("/dashboard/admindoctor");
  };

  const gotoPatient = () => {
    navigate("/dashboard/adminpatient");
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const gotoAppoint = () => {
    navigate("/dashboard/adminappoint");
  };
  const handleSubmit = async (e) => {
    console.log(state,user.data.user._id);

    e.preventDefault();
    try {
      const response = await axios.post(
        `${Config}api/finance/addEntry`,
        {
          adminId:user.data.user._id,
          expenseAmount: Number(state.expense),
          profitAmount: Number(state.profit),
          description: state.description,
          expenseType: state.expenseType
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setstate({
        description: "",
        expense: 0,
        profit: 0,
        expenseType:""
      })
      console.log(response)
    } catch (error) {
      console.log(error)
      // Handle login error
    }

  };
  const handleInput = (e) => {
    console.log(e.target.value);
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
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
            className="bg-gray-700  border-b-2 border-gray-800 border-t-2 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
            onClick={() => gotoAdminDashboard()}
          >
            <h4 className="mt-2">Dashboard</h4>
          </div>
          <div
            className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 hover:text-gray-800 hover:bg-gray-400"
            onClick={() => gotoPatient()}
          >
            <h4 className=" mt-2">Patient</h4>
          </div>
          <div
            className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
            onClick={() => gotoDoctor()}
          >
            <h4 className="mt-2 mr-2">Doctor</h4>
          </div>
          <div className="bg-gray-400 flex justify-center text-gray-800 border-b-2 border-gray-500 cursor-pointer ">
            <h4 className="mt-2 mr-2">Finance</h4>
          </div>
          <div
            className="bg-gray-700 flex justify-center border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
            onClick={() => gotoAppoint()}
          >
            <h4 className="mt-2 mr-2">Appointment</h4>
          </div>
        </div>
      </div>
      <div className="w-3/4 bg-none">
        <div className="bg-white text-black h-12 flex">
          <h2 className="bg-white h-12 text-black font-bold font-serif ml-4 pt-2 underline">
            ADMIN DASHBOARD
          </h2>
          <h5 className="absolute right-32 mt-2 text-xl uppercase">Welcome</h5>
          <button
            className="absolute right-2 mt-1 rounded-full hover:bg-cyan-950 bg-cyan-900 w-24 h-8 text-white"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <h5></h5>
        </div>
        <div className="p-4 text-white">
          <h2 className="text-2xl font-bold mb-4">Finance</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full flex space-x-10 justify-center">
              <div
                style={{
                  width: 500,
                }}
              >
                <label
                  htmlFor="description"
                  className="block font-medium text-white"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={state.description}
                  onChange={handleInput}
                  className="border border-gray-300 p-2 rounded "
                  style={{ width: "100%", color: "black" }}
                  required
                />
              </div>
              <div>
									<label
										htmlFor="expenseType"
										className="block font-medium text-white">
										Type
									</label>
									<select
										id="expenseType"
                    name="expenseType"
										value={state.expenseType}
										onChange={handleInput}
                    style={{color: "black" }}
										className="border border-gray-300 p-2 rounded w-52"
										required>
										<option value="">Select Type</option>
										<option value="patient">Patient</option>
										<option value="clinic">Clinic</option>
										<option value="other">Others</option>
									</select>
								</div>
              <div>
                <label
                  htmlFor="amount"
                  className="block font-medium text-white"
                >
                  Expense
                </label>
                <input
                  type="number"
                  id="expense"
                  name="expense"
                  value={state.expense}
                  onChange={handleInput}
                  className="border border-gray-300 p-2 rounded "
                  style={{ color: "black" }}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="profit"
                  className="block font-medium text-white"
                >
                  Profit
                </label>
                <input
                  type="number"
                  id="Profit"
                  name="profit"
                  value={state.profit}
                  style={{ color: "black" }}
                  onChange={handleInput}
                  className="border border-gray-300 p-2 rounded "
                  required
                />
              </div>
              <div
                style={{
                  marginTop: 25,
                }}
              >
                <button
                  type="submit"
                  className="bg-cyan-800 hover:bg-cyan-900 text-white py-2 px-4 rounded"
                >
                  Add
                </button>
              </div>
            </div>
            {/* <p className="text-white">{message}</p> */}
          </form>
          {/* {financialData ? (
          <div className="bg-white rounded-md shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Financial Summary</h3>
            <p className="text-gray-700">Total Revenue: ${financialData.totalRevenue}</p>
            <p className="text-gray-700">Total Expenses: ${financialData.totalExpenses}</p>
            <p className="text-gray-700">Net Profit: ${financialData.netProfit}</p>
          </div>
        ) : (
          <p>Loading financial data...</p>
        )} */}
        </div>
      </div>
    </div>
  );
};

export default AdminFinance;
