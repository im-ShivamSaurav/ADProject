import React, { useState, useEffect } from "react";
import axios from "axios";
import kite from "../assets/kiteLogo.png";
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:4000/api/v1";

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Token exists, redirect to dashboard
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.success) {
        // Save token and user's name in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.name); // Store user's name
        alert("Login successful!");
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_URL}/signup`, { name, email, password });
      if (response.data.success) {
        alert("Signup successful! You can now log in.");
        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setError(response.data.message || "Signup failed");
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-10 h-screen my-auto bg-gray-100">
      <img src={kite} width={80} height={80} alt="KiteLogo" className="mb-8" />

      <div className="flex justify-between mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-6 py-2 text-center ${isLogin ? "bg-loginOrange text-white" : "bg-gray-200 text-gray-700"} rounded-l-lg font-medium`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-6 py-2 text-center ${!isLogin ? "bg-loginOrange text-white" : "bg-gray-200 text-gray-700"} rounded-r-lg font-medium`}
        >
          Sign Up
        </button>
      </div>

      <div className="relative w-96 h-80 py-5 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Login Form */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transform transition-transform duration-500 ${
            isLogin ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-80"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-80"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="bg-loginOrange text-white px-4 py-2 rounded w-80"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>

        {/* Signup Form */}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-80"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-80"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="bg-loginOrange text-white px-4 py-2 rounded w-80"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AuthPage;
