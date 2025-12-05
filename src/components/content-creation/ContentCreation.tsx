import React from "react";
import { FaChevronDown, FaFileAlt, FaPlus } from "react-icons/fa";

export default function ContentCreation() {
  return (
    <>
      <h2 className="text-3xl font-bold mb-10">Smart Content Generator</h2>

      {/* Form Section */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {/* Prompt Input */}
        <div className="col-span-2">
          <label className="font-semibold text-gray-700">Prompt</label>
          <textarea
            placeholder="Enter your topic or prompt here..."
            className="w-full bg-white border rounded-xl p-4 h-24 shadow-sm mt-2 focus:outline-none"
          />
        </div>

        {/* Content Type */}
        <div>
          <label className="font-semibold text-gray-700">Content Type</label>
          <div className="bg-white border rounded-xl p-4 shadow-sm mt-2 flex items-center justify-between cursor-pointer">
            <span className="text-gray-500">Select a content type...</span>
            <FaChevronDown className="text-gray-500" />
          </div>

          <div className="bg-white shadow-md border rounded-xl p-4 mt-3">
            <div className="flex items-center gap-3 mb-1">
              <FaFileAlt className="text-blue-600" />
              <div>
                <p className="font-semibold">Product Description</p>
                <p className="text-gray-400 text-xs">20 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-700 mb-10 font-semibold">
        Generate Content
      </button>

      {/* Queue Status */}
      <h3 className="text-xl font-semibold mb-4">Queue Status</h3>
      <div className="bg-white border rounded-xl p-5 shadow-sm mb-4">
        <p className="font-semibold flex items-center gap-2">
          <FaFileAlt className="text-gray-700" /> Job Status: Pending
        </p>
        <p className="text-gray-600 text-sm mt-1">Job ID: #GCAI-2024001</p>
        <p className="text-gray-400 text-sm">Expected Delay: 1 minute</p>
      </div>

      {/* Generated Output Box */}
      <div className="relative mb-6">
        <button className="absolute right-3 top-3 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow">
          <FaPlus />
        </button>
        <textarea className="w-full bg-white border rounded-xl p-4 h-40 shadow-sm focus:outline-none" />
      </div>

      {/* Bottom Buttons */}
      <div className="flex gap-4 mt-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 font-semibold">
          Copy to Clipboard
        </button>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 font-semibold">
          Revise with AI
        </button>
      </div>
    </>
  );
}
