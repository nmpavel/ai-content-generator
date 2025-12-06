"use client";
import { useAuthStore } from "@/store/userStore";
import React, { useEffect, useState } from "react";
import { FaSearch, FaFileAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { getRequest } from "@/services/apiServices";

interface ContentItem {
  _id: string;
  prompt?: string;
  type: string;
  generatedText?: string;
  createdAt: string;
}

interface TypeStat {
  type: string;
  count: number;
}

export default function Dashboard() {
  const userName = useAuthStore((s) => s.userName);
  const router = useRouter();

  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [stats, setStats] = useState<TypeStat[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/");
      return;
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async (search?: string) => {
    try {
      // Fetch content with optional search
      const content = await getRequest<ContentItem[]>("/content", search ? { search } : undefined);
      setContentList(content.slice(0, 3)); // first 3 items

      // Fetch stats
      const stats = await getRequest<TypeStat[]>("/content/stats/type");
      setStats(stats);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    }
  };

  return (
    <div className="text-gray-600">
      <h2 className="text-3xl font-bold mb-6">{`Welcome back, ${userName}!`}</h2>

      {/* Search + Button */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex items-center gap-3 bg-white border rounded-lg px-4 py-3 w-2/3 shadow-sm">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search your content..."
            className="focus:outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchDashboardData(searchTerm);
              }
            }}
          />
        </div>
        <button
          onClick={() => router.push("/create-content")}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 flex items-center gap-2 font-semibold"
        >
          <span className="text-xl">+</span>New Content
        </button>
      </div>

      {/* Recent Content */}
      <h3 className="text-xl font-semibold mb-4">Recent Content</h3>
      <div className="grid grid-cols-3 gap-4 mb-10">
        {contentList.length === 0 ? (
          <p className="text-gray-400 text-sm">No content found</p>
        ) : (
          contentList.map((item) => (
            <div key={item._id} className="bg-white p-5 rounded-xl shadow-sm border">
              <div className="flex items-center gap-3 mb-2">
                <FaFileAlt className="text-blue-600 text-lg" />
                <h4 className="font-semibold">{item.prompt || "Untitled"}</h4>
              </div>
              <p className="text-gray-500 text-sm capitalize">{item.type}</p>
              <p className="text-gray-400 text-xs mt-1">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Quick Stats */}
      <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
      <div className="grid grid-cols-3 gap-4">
        {stats.length === 0 ? (
          <p className="text-gray-400 text-sm">No stats available</p>
        ) : (
          stats.map((item) => (
            <div key={item.type} className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center gap-3">
                <FaFileAlt className="text-blue-600 text-2xl" />
                <div>
                  <p className="font-semibold capitalize">{item.type}</p>
                  <p className="text-gray-500 text-sm">{item.count}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
