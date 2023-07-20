import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo3.png';

const Navbar = () => {
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate('/');
  };
  const gotoAbout = () => {
    navigate('/about');
  };
  const gotoService = () => {
    navigate('/service');
  };
  const gotoContact = () => {
    navigate('/contact');
  };
  const gotoLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-6 lg:px-12 xl:px-16 2xl:px-20">
      <img
        src={logoImg}
        style={{ height: '150px', width: '150px' }}
        className="cursor-pointer rounded-full"
        onClick={() => gotoHome()}
        alt="Logo"
      />
      <div className="hidden md:flex items-center space-x-8 text-white text-xl md:text-2xl font-bold">
        <p className="cursor-pointer hover:text-gray-600" onClick={() => gotoHome()}>
          Home
        </p>
        <p className="cursor-pointer hover:text-gray-600" onClick={() => gotoAbout()}>
          About
        </p>
        <p className="cursor-pointer hover:text-gray-600" onClick={() => gotoService()}>
          Service
        </p>
        <p className="cursor-pointer hover:text-gray-600" onClick={() => gotoContact()}>
          Contact
        </p>
        <p className="cursor-pointer hover:text-gray-600" onClick={() => gotoLogin()}>
          Login
        </p>
      </div>
    </div>
  );
};

export default Navbar;
