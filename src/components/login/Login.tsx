import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fe] p-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-blue-900">AI CONTENT</h1>
        <h2 className="text-xl font-semibold text-blue-800 -mt-1 mb-6">Generator</h2>

        <h3 className="text-2xl font-bold mb-2">Welcome Back!</h3>
        <p className="text-gray-500 mb-8">Log in to your account</p>

        {/* Email */}
        <div className="flex items-center gap-3 border rounded-lg px-4 py-3 mb-4">
          <FaEnvelope className="text-gray-500" />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center gap-3 border rounded-lg px-4 py-3 mb-4">
          <FaLock className="text-gray-500" />
          <input
            type="password"
            placeholder="Password"
            className="w-full focus:outline-none"
          />
        </div>

        {/* Login Button + Remember me */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold shadow-md transition hover:bg-blue-700 mb-3">
          LOG IN
        </button>

        <div className="flex items-center justify-center gap-2 mb-4">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember" className="text-gray-600 text-sm">
            Remember me
          </label>
        </div>

        <a className="text-blue-600 text-sm hover:underline block mb-3" href="#">
          Forgot Password?
        </a>

        <a className="text-blue-600 text-sm hover:underline" href="#">
          Don't have an account? Sign up
        </a>
      </div>
    </div>
  );
}
