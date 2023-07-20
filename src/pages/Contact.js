import React, { useState } from 'react';
import backgroundImg from '../assets/background1.png';
import Navbar from '../components/common/Navbar';


const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
    console.log('Form submitted:', { name, email, message });

    // Reset form fields
    setName('');
    setEmail('');
    setMessage('');
  };
  return (
    <div className='bg-no-repeat bg-cover' style={{ backgroundImage: `url(${backgroundImg})`, height: '110vh' }}>
      <div bg="dark" className='nav-bar bg-none  ' >
        <Navbar/>
      </div>
     <div className='flex'>
     <div className="mx-36 my-28 flex flex-col">
        <h2 className='text-white text-5xl'>Contact Us</h2>
        <h3 className='text-white text-lg mt-5'>DPCM Admin</h3>
        <h3 className='text-white text-lg'>dpcm222@gmail.com</h3>
        <h3 className='text-white text-lg'>Lahore</h3>
        <h3 className='text-white text-lg'>03176532352</h3>
      </div>
      <form className="max-w-md mx-auto" style={{width:500}} onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700" htmlFor="name" style={{color:'white'}}>
          Name
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold text-white-700" htmlFor="email" style={{color:'white'}}>
          Email
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700" htmlFor="message" style={{color:'white'}}>
          Message
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          id="message"
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <button
        className="px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-700"
        type="submit"
      >
        Submit
      </button>
    </form>
     </div>
    </div>
  )
}
export default Contact;
