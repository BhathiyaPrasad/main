'use client'

import { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";


export default function Login() {
  const logo = "/images/Logo.jpeg";
  
  // State for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Handle login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous error
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send username and password
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      // Assuming tokens are stored in the response cookies, or else store them manually.
      console.log("Login success:", data);

      // Redirect or handle successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center h-screen">
      <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
        <div className="w-3/5 p-5">
          <div>
            <img src={logo} alt="Logo" className="w-28 h-28" />
          </div>
          <div className="py-10">
            <h2 className="text-2xl font-bold mb-2 text-blue-500">
              Log in to System
            </h2>
            <div className="border-2 w-16 border-blue-500 inline-block mb-2 rounded-lg"></div>
            <p className="text-gray-400 text-xs my-2">
              Please enter your username and password
            </p>

            {error && <p className="text-red-500">{error}</p>} {/* Display error */}

            <form onSubmit={handleLogin} className="flex flex-col items-center gap-y-2">
              <div className="bg-gray-100 w-64 p-2 rounded-md flex items-center">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  className="bg-gray-100 outline-none text-xs flex-1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Update state
                />
              </div>
              <div className="bg-gray-100 w-64 p-2 rounded-md flex items-center mb-5">
                <MdLockOutline className="text-gray-400 m-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="bg-gray-100 outline-none text-xs flex-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update state
                />
              </div>
              <button
                type="submit"
                className="px-12 py-2 inline-block bg-blue-500 text-white font-bold rounded-full border-2  border-blue-500 hover:bg-white hover:border-blue-500 hover:text-blue-500"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="w-2/5 bg-blue-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
          <h2 className="text-2xl font-bold mb-2">Hello, User!</h2>
          <div className="border-2 w-16 border-white inline-block mb-2 rounded-lg"></div>
          <p className="mb-2 font-normal">Welcome to Asiri Auto Wheels!</p>
        </div>
      </div>
    </main>
  );
}
