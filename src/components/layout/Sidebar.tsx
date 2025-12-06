"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaHome, FaPlus, FaFolderOpen } from "react-icons/fa";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/userStore";

export const Sidebar = () => {
  const router = useRouter();
  const userName = useAuthStore((s) => s.userName);
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };
  return (
    <div className="w-64 min-h-screen bg-[#0d1b3e] text-white flex flex-col p-6">
      <h1 className="text-3xl font-bold">AI CONTENT</h1>
      <h2 className="text-lg -mt-1 mb-10">Generator</h2>

      <nav className="flex flex-col gap-4">
        <a
          href="/dashboard"
          className="flex items-center gap-3 p-3 bg-blue-600 rounded-lg cursor-pointer"
        >
          <FaHome /> Dashboard
        </a>
        <a
          href="/create-content"
          className="flex items-center gap-3 p-3 hover:bg-blue-500/30 rounded-lg cursor-pointer"
        >
          <FaPlus /> New Content
        </a>
      </nav>

      <div className="mt-auto flex items-center gap-3 pt-10">
        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <p className="font-semibold">{userName}</p>
        </div>
        <button
          onClick={() => handleLogout()}
          className="bg-gray-700 hover:bg-blue-600 px-3 py-1 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
