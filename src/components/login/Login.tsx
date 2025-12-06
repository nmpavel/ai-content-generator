"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { postRequestNoAuth } from "@/services/apiServices";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/userStore";

export default function Login() {
  const setUserName = useAuthStore((s) => s.setUserName);
  const setUserId = useAuthStore((s) => s.setUserId);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const api = isSignup ? "/auth/register" : "/auth/login";
      const body = isSignup ? { name, email, password } : { email, password };

      const response: any = await postRequestNoAuth(api, body);

      if (!isSignup) {
        Cookies.set("token", response?.token, { expires: 7 });
        setUserName(response?.user?.name);
        setUserId(response?.user?.id);
        router.replace("/dashboard");
      } else {
        alert("Registration successful! Now login Please.");
        setIsSignup(false);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen text-gray-600 flex items-center justify-center bg-[#f8f9fe] p-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-blue-900">AI CONTENT</h1>
        <h2 className="text-xl font-semibold text-blue-800 -mt-1 mb-6">
          Generator
        </h2>

        <h3 className="text-2xl  font-bold mb-2">
          {isSignup ? "Create Account" : "Welcome Back!"}
        </h3>
        <p className="text-gray-700 mb-8">
          {isSignup ? "Sign up to get started" : "Log in to your account"}
        </p>

        {/* Name (Signup Only) */}
        {isSignup && (
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 mb-4">
            <FaUser className="text-gray-700" />
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>
        )}

        {/* Email */}
        <div className="flex items-center gap-3 border rounded-lg px-4 py-3 mb-4">
          <FaEnvelope className="text-gray-700" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center gap-3 border rounded-lg px-4 py-3 mb-4">
          <FaLock className="text-gray-700" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full focus:outline-none"
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Login Button */}
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold shadow-md transition hover:bg-blue-700 mb-3 disabled:opacity-50"
        >
          {loading ? "Please wait..." : isSignup ? "SIGN UP" : "LOG IN"}
        </button>

        {/* Remember me - Only for login */}
        {!isSignup && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="text-gray-600 text-sm">
              Remember me
            </label>
          </div>
        )}

        <button
          onClick={() => setIsSignup(!isSignup)}
          className="text-blue-600 text-sm hover:underline"
        >
          {isSignup
            ? "Already have an account? Log in"
            : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
}
