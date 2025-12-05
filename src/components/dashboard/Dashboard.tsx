import React from "react";
import { FaSearch, FaFileAlt } from "react-icons/fa";

export default function Dashboard() {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Welcome back, John!</h2>

      {/* Search + Button */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex items-center gap-3 bg-white border rounded-lg px-4 py-3 w-full shadow-sm">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search your content..."
            className="focus:outline-none w-full"
          />
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 flex items-center gap-2 font-semibold">
          Generate New Content <span className="text-xl">+</span>
        </button>
      </div>

      {/* Recent Content */}
      <h3 className="text-xl font-semibold mb-4">Recent Content</h3>
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <FaFileAlt className="text-blue-600 text-lg" />
              <h4 className="font-semibold">Sample Content Title</h4>
            </div>
            <p className="text-gray-500 text-sm">1. Intro • AI Tools</p>
            <p className="text-gray-400 text-xs mt-1">10 hours ago</p>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
      <div className="grid grid-cols-3 gap-4">
        {["Total Content", "Blog Posts", "Captions"].map((item) => (
          <div key={item} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <FaFileAlt className="text-blue-600 text-2xl" />
              <div>
                <p className="font-semibold">{item}</p>
                <p className="text-gray-500 text-sm">150</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
