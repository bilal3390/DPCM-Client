import React from 'react';
import backgroundImg from '../assets/background1.png';
import Navbar from '../components/common/Navbar';
import MobileNavbar from '../components/common/MobileNavbar';
import { useMediaQuery } from '@react-hook/media-query';

const About = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  const backgroundHeight = isLargeScreen ? '781px' : 'auto';

  return (
    <div className='bg-no-repeat bg-cover' style={{ backgroundImage: `url(${backgroundImg})`, height: backgroundHeight }}>
      <div className="nav-bar bg-none">
        {isLargeScreen ? <Navbar /> : <MobileNavbar />}
      </div>
      <div className="text-center mx-auto lg:ml-auto lg:mx-44 flex flex-col text-white w-3/4 lg:w-3/4">
        <h4 className="text-3xl lg:text-5xl">Welcome to DPCM</h4>
        <p className="mt-4">
          Our dental management system is designed to streamline and simplify the administrative tasks involved in running a dental clinic. With our user-friendly interface and comprehensive features, we aim to provide dentists and their staff with an efficient and effective tool for managing appointments, patient records, and other essential aspects of their practice.
        </p>
      </div>

      <div className="flex flex-col mt-5 space-y-5 lg:space-y-0 lg:space-x-5 lg:flex-row lg:justify-center">
        <div className="w-full h-auto flex flex-col text-center overflow-hidden pt-8 text-white rounded-full shadow-cyan-900 shadow-2xl backdrop-filter backdrop-blur-xl">
          <h4 className="text-lg lg:text-xl">Appointment Management</h4>
          <p className="text-sm lg:text-base mx-4 mt-2">
            Our system allows you to easily schedule, modify, and track appointments for your patients. You can view a calendar overview, manage multiple providers' schedules, and send automated reminders to patients, reducing no-shows and improving the overall efficiency of your clinic.
          </p>
        </div>
        <div className="w-full h-auto flex flex-col text-center pt-8 text-white overflow-hidden rounded-full shadow-cyan-900 shadow-2xl backdrop-filter backdrop-blur-xl">
          <h4 className="text-lg lg:text-xl">Treatment Planning</h4>
          <p className="text-sm lg:text-base mx-4 mt-2">
            Plan and document dental treatments using our intuitive interface. Create treatment plans, track progress, and collaborate with your team to provide comprehensive care for your patients. Visualize treatment timelines and monitor patient progress at a glance.
          </p>
        </div>
        <div className="w-full h-auto flex flex-col text-center overflow-hidden pt-8 text-white rounded-full shadow-cyan-900 shadow-2xl backdrop-filter backdrop-blur-xl">
          <h4 className="text-lg lg:text-xl">Patient Records</h4>
          <p className="text-sm lg:text-base mx-4 mt-2">
            Maintain detailed electronic records for each patient, including personal information, medical history, treatment plans, and progress notes. Our system ensures secure storage and easy retrieval of patient data, enabling quick access to vital information during appointments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
