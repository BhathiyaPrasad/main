'use client';

import { login } from '@/services/auth'; // Import your login function
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

export default function Login() {
  const logo = "/images/Logo.jpeg";
  const router = useRouter();
  // State for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous error
    setError(null);

    // Start loading
    setLoading(true);

    try {
      // Make the POST request to the backend
      const response = await login(username, password);
      console.log("Login successful!", response);
      router.push("/dashboard"); // Redirect to the dashboard on success

    } catch (err: any) {
      setError(err.message); // Set the error message if login fails
    } finally {
      // Stop loading
      setLoading(false);
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
                  required
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
                  required
                />
              </div>
              <button
                type="submit"
                className="px-12 py-2 inline-block bg-blue-500 text-white font-bold rounded-full border-2 border-blue-500 hover:bg-white hover:border-blue-500 hover:text-blue-500"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Logging in..." : "Login"}
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
