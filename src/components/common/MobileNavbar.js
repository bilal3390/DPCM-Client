import React, { useState } from 'react';
import Logo from '../../assets/logo3.png'
import { useNavigate } from 'react-router-dom';

const MobileNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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
        <nav className="bg-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-50">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                src={Logo}
                                style={{ height: '100px', width: '120px' }}
                                className="cursor-pointer rounded-full mt-3 -ml-5"
                                onClick={() => gotoHome()}
                                alt="Logo"
                            />
                        </div>
                    </div>
                    <div className="">
                        <button
                            className="bg-none mt-1 p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            onClick={toggleMenu}
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isOpen ? (
                <div className={`fixed inset-0 mt-[64px] z-40 w-full bg-none  backdrop-blur-xl transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                    <div className="flex flex-col justify-center text-2xl items-center">
                        <p className="text-white  hover:text-white px-3 my-3 rounded-md font-medium" onClick={() => gotoHome()}>Home</p>
                        <p className="text-white  hover:text-white px-3 mb-3 rounded-md font-medium" onClick={() => gotoAbout()}>About</p>
                        <p className="text-white  hover:text-white px-3 mb-3 rounded-md font-medium" onClick={() => gotoService()}>Services</p>
                        <p className="text-white  hover:text-white px-3 mb-3 rounded-md font-medium" onClick={() => gotoContact()}>Contact</p>
                        <p className="text-white  hover:text-white px-3  rounded-md font-medium" onClick={() => gotoLogin()}>Sign Up / Login</p>
                    </div>
                </div>
            ) : null}
        </nav>
    );
};

export default MobileNavbar;
