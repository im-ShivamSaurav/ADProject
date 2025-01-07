import React, { useState } from "react";
import kite from '../assets/kiteLogo.png';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  //const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="flex flex-col items-center py-10 h-screen my-auto  bg-gray-100">

        <img src={kite} width={80} height={80} alt="KiteLogo"className="mb-8"></img>

      <div className=" flex justify-between mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 text-center ${
              isLogin ? "bg-loginOrange text-white" : "bg-gray-200 text-gray-700"
            } rounded-l-lg font-medium`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 text-center ${
              !isLogin ? "bg-loginOrange text-white" : "bg-gray-200 text-gray-700"
            } rounded-r-lg font-medium`}
          >
            Sign Up
          </button>
        </div>


      <div className="relative w-96 h-80 py-5 bg-white shadow-lg rounded-lg overflow-hidden">

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transform transition-transform duration-500 ${
            isLogin ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <input
            type="text"
            placeholder="Email"
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-80"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-80"
          />
          <button className="bg-loginOrange text-white px-4 py-2 rounded w-80">
            Login
          </button>
        </div>


        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transform transition-transform duration-500 ${
            isLogin ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-80"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-80"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-80"
          />
          <button className="bg-loginOrange text-white px-4 py-2 rounded w-80">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
