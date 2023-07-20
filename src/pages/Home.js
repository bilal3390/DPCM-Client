import React from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import backgroundImg from '../assets/background1.png';
import Navbar from '../components/common/Navbar';
import MobileNavbar from '../components/common/MobileNavbar';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const navigate = useNavigate();
  return (
    <div
      className="bg-no-repeat bg-center bg-cover w-full bg-fixed h-screen"
      style={{ backgroundImage: `url(${backgroundImg})`, height: '100vh' }}
    >
      <div className="nav-bar bg-none">
        {isMobile ? <MobileNavbar /> : <Navbar />}
      </div>
      <div className="mx-36 my-28 flex flex-col">
        <h2 className="text-white text-5xl">Your New Smile</h2>
        <button className="bg-indigo-800 w-36 h-10 rounded-md mt-4 text-white font-bold" onClick={()=>navigate('/service')}>
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Home;
