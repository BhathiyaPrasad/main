import React from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

export default function Login() {
  const logo = "/images/Logo.jpeg";

  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
        <div className="w-3/5 p-5">
          <div>
            <img src={logo} alt="Logo" className="w-28 h-28" />
          </div>
          <div className="py-10">
            <h2 className="text-2xl font-bold mb-2 text-blue-500">
              Login in to System
            </h2>
            <div className="border-2 w-16 border-blue-500 inline-block mb-2 rounded-lg"></div>
            <p className="text-gray-400 text-xs my-2">
              Please enter your username and password
            </p>
            <div className="flex flex-col items-center gap-y-2">
              <div className="bg-gray-100 w-64 p-2 rounded-md flex items-center">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Username"
                  className="bg-gray-100 outline-none text-xs flex-1"
                />
              </div>
              <div className="bg-gray-100 w-64 p-2 rounded-md flex items-center mb-5">
                <MdLockOutline className="text-gray-400 m-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="bg-gray-100 outline-none text-xs flex-1"
                />
              </div>
              <a
                href="/login"
                className="px-12 py-2 inline-block bg-blue-500 text-white font-bold rounded-full border-2  border-blue-500 hover:bg-white hover:border-blue-500 hover:text-blue-500"
              >
                Login
              </a>
            </div>
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
