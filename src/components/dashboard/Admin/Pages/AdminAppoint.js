import React, { useState, useEffect } from 'react';
import backgroundImg from '../../../../assets/background1.png';
import Logo from '../../../../assets/logo3.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment';
import { Config } from '../../../../config';
const AdminAppoint = () => {

  const [appointments, setAppointments] = useState([]);
  console.log(appointments)
  useEffect(() => {
    // Fetch appointments from the backend
    fetchAppointments()
  }, []);
  const fetchAppointments = ( )=>{
    axios.get(`${Config}api/appointment`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        const fetchedAppointments = response.data;
        console.log(fetchedAppointments.data)
        setAppointments(fetchedAppointments.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  }
  const handleApproveAppointment = (appointmentId) => {
    console.log(appointmentId)
    // Send an API request to approve the appointment
    axios.patch(`${Config}api/appointment/${appointmentId}`,{
      "isApproved": true
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log('Appointment approved successfully:', response.data);
        fetchAppointments();
      })
      .catch(error => {
        console.error('Error approving appointment:', error);
      });
  };

  const handleDeclineAppointment = (appointmentId) => {
    // Send an API request to decline the appointment
    axios.patch(`${Config}api/appointment/${appointmentId}`,{
      "isApproved": false
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        // Handle success response
        console.log('Appointment declined successfully:', response.data);
        // Refresh the list of appointments
        fetchAppointments();
      })
      .catch(error => {
        console.error('Error declining appointment:', error);
      });
  };

  const navigate = useNavigate();
  
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("ownerId");
		navigate("/ownerlogin", { replace: true });
	};

  const gotoAdminDashboard = () => {
    navigate('/dashboard/admin');
  };

  const gotoDoctor = () => {
    navigate('/dashboard/admindoctor');
  };

  const gotoPatient = () => {
    navigate('/dashboard/adminpatient');
  };

  const gotoFinance = () => {
    navigate('/dashboard/adminfinance');
  };

  const gotoAppointment = () => {
    navigate('/dashboard/adminappointment');
  };

  return (
    <div
      className='bg-no-repeat bg-cover flex'
      style={{ backgroundImage: `url(${backgroundImg})`, height: '100vh' ,}}
    >
      <div className='w-1/4 bg-cyan-950 flex flex-col'>
        <img src={Logo} style={{ height: '300px', width: '300px' }} className='ml-12' />
        <div className='w-full h-12 text-white flex flex-col text-center pt-2'>
          <div
            className='bg-gray-700  border-b-2 border-gray-800 border-t-2 cursor-pointer hover:text-gray-800 hover:bg-gray-400'
            onClick={() => gotoAdminDashboard()}
          >
            <h4 className='mt-2'>Dashboard</h4>
          </div>
          <div
            className='bg-gray-700 flex justify-center  border-b-2 border-gray-500 hover:text-gray-800 hover:bg-gray-400'
            onClick={() => gotoPatient()}
          >
            <h4 className='mt-2'>Patient</h4>
          </div>
          <div
            className='bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400'
            onClick={() => gotoDoctor()}
          >
            <h4 className='mt-2 mr-2'>Doctor</h4>
          </div>
          <div
            className='bg-gray-700 flex justify-center border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400'
            onClick={() => gotoFinance()}
          >
            <h4 className='mt-2 mr-2'>Finance</h4>
          </div>
          <div
            className='bg-gray-400 flex justify-center text-gray-800 border-b-2 border-gray-500 cursor-pointer'
            onClick={() => gotoAppointment()}
          >
            <h4 className='mt-2 mr-2'>Appointment</h4>
          </div>
        </div>
      </div>
      <div className='w-3/4 bg-none' style={{overflowY:'scroll'}}>
        <div className='bg-white text-black h-12 flex'>
        <h2 className="bg-white h-12 text-black font-bold font-serif ml-4 pt-2 underline">
        ADMIN DASHBOARD
      </h2>
      <h5 className="absolute right-32 mt-2 text-xl uppercase">
      Welcome 
    </h5>
    <button
    className="absolute right-2 mt-1 bg-cyan-900 w-24 h-8 text-white rounded-full"
    onClick={handleLogout}>
    Log Out
  </button>
          <h5></h5>
        </div>
        <div className="p-4 text-white" >
          <h2 className="text-2xl font-bold mb-4">Appointment Approval</h2>
          
          {appointments.map(appointment => (
            <div key={appointment.id} className="bg-white rounded-md shadow-md p-4 mb-4" >
              <h3 className="text-lg font-semibold mb-2">{appointment.patientName}</h3>
              <p className="text-gray-700">Date: {moment(appointment.date).format('YYYY-MM-DD')}</p>
              <p className="text-gray-700">Phone No: {appointment.time}</p>
              <p className="text-gray-700">Status: {appointment.isApproved?"Approved":"Pending"}</p>
              <p className="text-gray-700">Reason: {appointment.reason}</p>

              <div className="flex">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md mt-2 mr-2"
                  onClick={() => handleApproveAppointment(appointment._id)}
                >
                  Approve
                </button>

                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md mt-2"
                  onClick={() => handleDeclineAppointment(appointment._id)}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAppoint;
