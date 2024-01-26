import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";


function Register() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    password2: "",
  });

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    setUserData({ ...userData, [name]: value });
  }

  const postData = async () => {
    try {
      const {
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
        password2,
      } = userData;

      const response = await axios.post("/api/user/register", {
        ...userData
      });
      if (response.status === 200) {
        window.alert("User Registration Successful!");
        navigate("/login")
      } else {
        window.alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 400) {
        window.alert("Invalid Registration");
      } else {
        window.alert("Something went wrong!");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.password !== userData.password2) {
      window.alert("Passwords don't match. Please try again.");
      return;
    }
    await postData();
  }

  return (


    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-300">
        <div className="flex flex-col bg-blue-200 shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className='mb-4 text-3xl font-bold text-blue-500 text-center md:text-3xl lg:text-4xl'>
            TaskApp
          </div>
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
            create Account
          </div>

          <div className="mt-10">
            <form method='POST' onSubmit={handleSubmit}>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  First Name:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="text-sm sm:text-base  placeholder-gray-500 pl-5 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 bg-inherit text-black"
                    placeholder="First Name"
                    name="firstName"
                    id="firstName"
                    autoComplete="off"
                    value={userData.firstName}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Last Name:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="text-sm sm:text-base  placeholder-gray-500 pl-5 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 bg-white text-black"
                    placeholder="Last Name"
                    name="lastName"
                    id="lastName"
                    autoComplete="off"
                    value={userData.lastName}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="text-sm sm:text-base  placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 bg-white text-black"
                    placeholder="E-Mail Address"
                    autoComplete="off"
                    value={userData.email}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Mobile Number:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="text-sm sm:text-base  placeholder-gray-500 pl-5 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 bg-white text-black"
                    placeholder="Mobile Number"
                    name="mobileNumber"
                    id="mobileNumber"
                    autoComplete="off"
                    value={userData.mobileNumber}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="text-sm sm:text-base bg-white text-black placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Password"
                    autoComplete="off"
                    value={userData.password}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="text-sm sm:text-base bg-white text-black placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Confirm Password"
                    name="password2"
                    id="password2"
                    autoComplete="off"
                    value={userData.password2}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="flex items-center mb-6 -mt-4">
              </div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Register</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center mt-6">
            <a
              href="#"
              className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
            >
              <span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </span>

              <span className="ml-2">
                <Link to="/login" className="Login">
                  Already Registered
                  {" "}  Login
                </Link></span>
            </a>

          </div>
        </div>
      </div>
    </>
  )
}

export default Register