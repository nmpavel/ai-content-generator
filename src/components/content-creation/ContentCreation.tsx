"use client";
import { getRequest, postRequest } from "@/services/apiServices";
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaFileAlt, FaPlus } from "react-icons/fa";

const CONTENT_TYPES = ["blog", "caption", "product_description"];

export default function ContentCreation() {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState<string | null>(null);

  // 🔄 Polling job status if a job exists
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      try {
        const data = await getRequest<any>(`/content/${jobId}/status`);
        console.log("Job status response:", data);
        setStatus(data.status);

        if (data.status === "done") {
          setGeneratedText(data.generatedText);
          clearInterval(interval);
        }
      } catch (err) {
        console.log(err);
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [jobId]);

  const handleGenerate = async () => {
    if (!prompt || !type) return alert("Enter prompt & select a content type");

    try {
      const result = await postRequest<any>("/content/generate", {
        prompt,
        type,
      });

      setJobId(result.jobId);
      setStatus("QUEUED");
      setGeneratedText(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className=" text-gray-600 ">
       <h2 className="text-3xl font-bold mb-10">Smart Content Generator</h2>

      {/* Form Section */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {/* Prompt Input */}
        <div className="col-span-2">
          <label className="font-semibold text-gray-700">Prompt</label>
          <textarea
            placeholder="Enter your topic or prompt here..."
            className="w-full bg-white border rounded-xl p-4 h-24 shadow-sm mt-2 focus:outline-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        {/* Content Type Dropdown */}
        <div>
          <label className="font-semibold text-gray-700">Content Type</label>

          <div
            className="bg-white border rounded-xl p-4 shadow-sm mt-2 flex items-center justify-between cursor-pointer select-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-gray-700">
              {type || "Select a content type..."}
            </span>
            <FaChevronDown className="text-gray-500" />
          </div>

          {isDropdownOpen && (
            <div className="bg-white shadow-md border rounded-xl p-2 mt-2 absolute z-10 w-60">
              {CONTENT_TYPES.map((item) => (
                <div
                  key={item}
                  className="p-2 hover:bg-blue-50 cursor-pointer rounded-md flex gap-2 items-center"
                  onClick={() => {
                    setType(item);
                    setIsDropdownOpen(false);
                  }}
                >
                  <FaFileAlt className="text-blue-600" />
                  <span className="capitalize">{item.replace("_", " ")}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-700 mb-10 font-semibold"
      >
        Generate Content
      </button>

      {/* Queue Status */}
      {jobId && (
        <>
          <h3 className="text-xl font-semibold mb-4">Queue Status</h3>
          <div className="bg-white border rounded-xl p-5 shadow-sm mb-4">
            <p className="font-semibold flex items-center gap-2">
              <FaFileAlt className="text-gray-700" /> Job Status: {status}
            </p>
            <p className="text-gray-600 text-sm mt-1">Job ID: {jobId}</p>
            <p className="text-gray-400 text-sm">Expected Delay: 1 minute</p>
          </div>
        </>
      )}

      {/* Generated Output Box */}
      {generatedText && (
        <>
          <div className="relative mb-6">
            <button className="absolute right-3 top-3 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow">
              <FaPlus />
            </button>
            <textarea
              className="w-full bg-white border rounded-xl p-4 h-40 shadow-sm focus:outline-none"
              value={generatedText}
              readOnly
            />
          </div>

          {/* Bottom Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 font-semibold"
              onClick={() => navigator.clipboard.writeText(generatedText)}
            >
              Copy to Clipboard
            </button>
          </div>
        </>
      )}
    </div>
  );
}
