import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Service from "../pages/Service";
import Contact from "../pages/Contact";
import Login from "../components/auth/Logins/Login";
import AdminLogin from "../components/auth/Logins/AdminLogin";
import DoctorLogin from "../components/auth/Logins/DoctorLogin";
import OwnerLogin from "../components/auth/Logins/OwnerLogin";
import OwnerRegister from "../components/auth/Registers/OwnerRegister";
import Register from "../components/auth/Registers/Register";
import Owner from "../components/dashboard/Owner/Owner";
import OwnerAdmin from "../components/dashboard/Owner/Pages/OwnerAdmin";
import OwnerProfit from "../components/dashboard/Owner/Pages/OwnerProfit";
import Admin from "../components/dashboard/Admin/Admin";
import AdminPatient from "../components/dashboard/Admin/Pages/AdminPatient";
import AdminDoctor from "../components/dashboard/Admin/Pages/AdminDoctor";
import AdminFinance from "../components/dashboard/Admin/Pages/AdminFinance";
import AdminAppoint from "../components/dashboard/Admin/Pages/AdminAppoint";
import Doctors from "../components/dashboard/Doctor/Doctors";
import DoctorTreat from "../components/dashboard/Doctor/Pages/DoctorTreat";
import DoctorMedical from "../components/dashboard/Doctor/Pages/DoctorMedical";
import DoctorDental from "../components/dashboard/Doctor/Pages/DoctorDental";
import Patients from "../components/dashboard/Patient/Patients";
import PatientProfile from "../components/dashboard/Patient/Pages/PatientProfile";
import PatientMedical from "../components/dashboard/Patient/Pages/PatientMedical";
import DentalXray from "../components/dashboard/Patient/Pages/DentalXray";
import PatientAppoint from "../components/dashboard/Patient/Pages/PatientAppoint";
import AuthRoute from "./AuthRoute";

function Routs() {
	const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  const [userRole, setUserRole] = React.useState('owner');

  // Check if user is authenticated and set the role
  // This can be done upon successful login or by checking the authentication status from an API
  React.useEffect(() => {
    // Example logic to check authentication status and role
    const user = getCurrentUser(); // Replace with your authentication logic
    if (user.login) {
      setIsAuthenticated(true);
      setUserRole(user.role);
    } else {
      setIsAuthenticated(false);
      setUserRole('');
    }
  }, []);

  function getCurrentUser() {
    // Retrieve the current user from your authentication system
    // This could involve checking the user's session, token, or any other authentication mechanism you are using
  
    // Return the user object if authenticated, or null if not authenticated
    // Replace with your authentication check
    if (localStorage.getItem('token') !== null) {
      return {
        role: 'owner' ,
        login: true// Replace with the user's role
        // Add any other user information you need
      };
    } else {
      return {
        role: null ,
        login: false// Replace with the user's role
        // Add any other user information you need
      };
    }
  }

	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/service" element={<Service />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/login" element={<Login />} />
				<Route path="/adminlogin" element={<AdminLogin />} />
				<Route path="/doctorlogin" element={<DoctorLogin />} />
				<Route path="/ownerlogin" element={<OwnerLogin />} />
				<Route path="/register" element={<Register />} />
				<Route path="/ownerregister" element={<OwnerRegister />} />
				<Route
          path="/dashboard/owner"
          element={
            isAuthenticated && userRole === 'owner' ? (
              <Owner />
            ) : (
              // Handle unauthorized access
              <Navigate to="/ownerlogin" replace />
            )
          }
        />
				<Route
					path="/dashboard/owneradmin"
					element={
            isAuthenticated && userRole === 'owner' ? (
              <OwnerAdmin />
            ) : (
              // Handle unauthorized access
              <Navigate to="/ownerlogin" replace />
            )
          }
				/>
				<Route
					path="/dashboard/ownerprofit"
					element={
            isAuthenticated && userRole === 'owner' ? (
              <OwnerProfit />
            ) : (
              // Handle unauthorized access
              <Navigate to="/ownerlogin" replace />
            )
          }
				/>

				<Route
					path="/dashboard/admin"
					element={
            isAuthenticated ? (
              <Admin />
            ) : (
              // Handle unauthorized access
              <Navigate to="/adminlogin" replace />
            )
          }
				/>
				<Route
					path="/dashboard/adminpatient"
					element={
            isAuthenticated ? (
              <AdminPatient />
            ) : (
              // Handle unauthorized access
              <Navigate to="/adminlogin" replace />
            )
          }
				/>
				<Route
					path="/dashboard/admindoctor"
					element={
            isAuthenticated ? (
              <AdminDoctor />
            ) : (
              // Handle unauthorized access
              <Navigate to="/adminlogin" replace />
            )
          }
				/>
				<Route
					path="/dashboard/adminfinance"
					element={
            isAuthenticated ? (
              <AdminFinance />
            ) : (
              // Handle unauthorized access
              <Navigate to="/adminlogin" replace />
            )
          }
				/>
				<Route
					path="/dashboard/adminappoint"
					element={
            isAuthenticated ? (
              <AdminAppoint />
            ) : (
              // Handle unauthorized access
              <Navigate to="/adminlogin" replace />
            )
          }
				/>
				<Route
					path="/dashboard/doctors"
					element={
            isAuthenticated ? (
              <Doctors />
            ) : (
              // Handle unauthorized access
              <Navigate to="/doctorlogin" replace />
            )
          }
				/>
				<Route
					path="/dashboard/doctortreat"
					element={
            isAuthenticated ? (
              <DoctorTreat />
            ) : (
              // Handle unauthorized access
              <Navigate to="/doctorlogin" replace />
            )
          }
				/>
				<Route
					path="/dashboard/doctormedical"
					element={
            isAuthenticated ? (
              <DoctorMedical />
            ) : (
              // Handle unauthorized access
              <Navigate to="/doctorlogin" replace />
            )
          }
				/>
				<Route
					path="/dashboard/doctordental"
					element={
            isAuthenticated ? (
              <DoctorDental />
            ) : (
              // Handle unauthorized access
              <Navigate to="/doctorlogin" replace />
            )
          }
				/>
				<Route
					path="/dashboard/patients"
					element={
            isAuthenticated ? (
              <Patients />
            ) : (
              // Handle unauthorized access
              <Navigate to="/login" replace />
            )
          }
				/>
				<Route
					path="/dashboard/patientprofile"
					element={
            isAuthenticated ? (
              <PatientProfile />
            ) : (
              // Handle unauthorized access
              <Navigate to="/login" replace />
            )
          }
				/>
				<Route
					path="/dashboard/patientmedical"
					element={
            isAuthenticated ? (
              <PatientMedical />
            ) : (
              // Handle unauthorized access
              <Navigate to="/login" replace />
            )
          }
				/>
				<Route
					path="/dashboard/patientappoint"
					element={
            isAuthenticated ? (
              <PatientAppoint />
            ) : (
              // Handle unauthorized access
              <Navigate to="/login" replace />
            )
          }
				/>
				<Route
					path="/dashboard/dentalxray"
					element={
            isAuthenticated ? (
              <DentalXray />
            ) : (
              // Handle unauthorized access
              <Navigate to="/login" replace />
            )
          }
				/>
			</Routes>
		</Router>
	);
}

export default Routs;
