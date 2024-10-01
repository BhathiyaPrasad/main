"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 h-full w-70 shadow-xl bg-white z-10">
      <div className="flex flex-col justify-between items-center h-full w-full px-4 py-5">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/Logo.jpeg"
            alt="Logo"
            width={100}
            height={75}
            className="cursor-pointer mb-10"
            priority
          />
        </Link>

        {/* Nav Links */}
        <div className="flex flex-col w-full">
          <ul className="flex flex-col items-center w-full">
            <Link href="/dashboard">
              <li
                className={`w-full px-16 py-3 mb-1 text-l cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-500 hover:text-white ${
                  isActive("/dashboard") ? "bg-blue-500 text-white" : ""
                }`}
              >
                Dashboard
              </li>
            </Link>
            <Link href="/invoice">
              <li
                className={`w-full px-16 py-3 mb-1 text-l cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-500 hover:text-white ${
                  isActive("/invoice") ? "bg-blue-500 text-white" : ""
                }`}
              >
                Invoice
              </li>
            </Link>
            <Link href="/item">
              <li
                className={`w-full px-16 py-3 mb-1 text-l cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-500 hover:text-white ${
                  isActive("/item") ? "bg-blue-500 text-white" : ""
                }`}
              >
                Item
              </li>
            </Link>
            <Link href="/customer">
              <li
                className={`w-full px-16 py-3 mb-1 text-l cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-500 hover:text-white ${
                  isActive("/customer") ? "bg-blue-500 text-white" : ""
                }`}
              >
                Customer
              </li>
            </Link>
            <Link href="/supplier">
              <li
                className={`w-full px-16 py-3 mb-1 text-l cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-500 hover:text-white ${
                  isActive("/supplier") ? "bg-blue-500 text-white" : ""
                }`}
              >
                Supplier
              </li>
            </Link>
            <Link href="/account">
              <li
                className={`w-full px-16 py-3 mb-1 text-l cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-500 hover:text-white ${
                  isActive("/account") ? "bg-blue-500 text-white" : ""
                }`}
              >
                Account
              </li>
            </Link>
            <Link href="/employee">
              <li
                className={`w-full px-16 py-3 mb-1 text-l cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-500 hover:text-white ${
                  isActive("/employee") ? "bg-blue-500 text-white" : ""
                }`}
              >
                Employer
              </li>
            </Link>
            <Link href="/creditcheque">
              <li
                className={`w-full px-16 py-3 mb-1 text-l cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-500 hover:text-white ${
                  isActive("/creditcheque") ? "bg-blue-500 text-white" : ""
                }`}
              >
                Credit & Cheque
              </li>
            </Link>
          </ul>
        </div>
        <div className="mt-auto w-70">
          <ul className="flex flex-col items-center w-full">
            <Link href="/">
              <li
                className={`w-full px-4 py-3 mb-1 text-l cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-500 hover:text-white flex items-center ${
                  isActive("/") ? "bg-blue-500 text-white" : ""
                }`}
              >
                <AiOutlineUser
                  className="mr-2 text-gray-800"
                  style={{ fontSize: "1.5rem" }}
                />
                <span>Account</span>
              </li>
            </Link>
            <Link href="/">
              <li
                className={`w-full px-4 py-3 mb-1 text-l cursor-pointer transition-all duration-300 rounded-lg hover:bg-blue-500 hover:text-white flex items-center ${
                  isActive("/") ? "bg-blue-500 text-white" : ""
                }`}
              >
                <AiOutlineLogout
                  className="mr-2 text-gray-800"
                  style={{ fontSize: "1.5rem" }}
                />
                <span>Log Out</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
