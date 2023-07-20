import React from 'react';
import backgroundImg from '../assets/background1.png';
import Navbar from '../components/common/Navbar';
import MobileNavbar from '../components/common/MobileNavbar';
import { useMediaQuery } from '@react-hook/media-query';

const Service = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  return (
    <div className='bg-no-repeat bg-cover flex flex-col min-h-screen' style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="nav-bar bg-none">
        {isLargeScreen ? <Navbar /> : <MobileNavbar />}
      </div>
      <div className='flex flex-col flex-grow'>
        <h2 className='flex justify-center text-white'>OUR SERVICES</h2>
        <div className='flex flex-col space-y-4 p-4 lg:flex-row lg:space-x-4 lg:space-y-0 lg:p-8 lg:ml-8'>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg '>
            <p className='p-3' >Root Canal</p>
            <p className='p-3'  >Oral hygiene is the practice of keeping one's oral cavity clean and free of disease and other problems by regular brushing of the teeth and adopting good hygiene habits. It is important that oral hygiene be carried out on a regular basis to enable prevention of dental disease and bad breath. </p>
          </div>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg'>
            <p  className='p-3'>Alignment teeth </p>
            <p  className='p-3'>Oral hygiene is the practice of keeping one's oral cavity clean and free of disease and other problems by regular brushing of the teeth and adopting good hygiene habits. It is important that oral hygiene be carried out on a regular basis to enable prevention of dental disease and bad breath. </p>
          </div>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg'>
          <p  className='p-3'>Cosmetic teeth</p>
          <p  className='p-3'>Oral hygiene is the practice of keeping one's oral cavity clean and free of disease and other problems by regular brushing of the teeth and adopting good hygiene habits. It is important that oral hygiene be carried out on a regular basis to enable prevention of dental disease and bad breath. </p>
        </div>
        </div>
        <div className='flex flex-col space-y-4 p-4 lg:flex-row lg:space-x-4 lg:space-y-0 lg:p-8 lg:ml-8'>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg '>
            <p className='p-3'>Oral Hygiene</p>
            <p className='p-3'>Oral hygiene is the practice of keeping one's oral cavity clean and free of disease and other problems by regular brushing of the teeth and adopting good hygiene habits. It is important that oral hygiene be carried out on a regular basis to enable prevention of dental disease and bad breath. </p>
          </div>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg'>
            <p>Live advisory</p>
            <p>Oral hygiene is the practice of keeping one's oral cavity clean and free of disease and other problems by regular brushing of the teeth and adopting good hygiene habits. It is important that oral hygiene be carried out on a regular basis to enable prevention of dental disease and bad breath. </p>
          </div>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg'>
            <p  className='p-3'>Cavity Inspection</p>
            <p  className='p-3'>Oral hygiene is the practice of keeping one's oral cavity clean and free of disease and other problems by regular brushing of the teeth and adopting good hygiene habits. It is important that oral hygiene be carried out on a regular basis to enable prevention of dental disease and bad breath. </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
