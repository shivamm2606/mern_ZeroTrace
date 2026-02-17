import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Shield, Activity, LogOut } from "lucide-react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  // 1. State for holding our data and UI status
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hook to move to different pages
  const navigate = useNavigate();

  // 2. Fetch data as soon as this page loads
  useEffect(() => {
    fetchStats();
  }, []);

  // Helper function to get stats from backend
  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      // If the user isn't logged in (401), send them to login page
      if (error.response?.status === 401) {
        navigate("/admin/login");
      } else {
        toast.error("Failed to fetch stats");
      }
    } finally {
      // stop loading whether it worked or failed
      setLoading(false);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/admin/logout");
      navigate("/admin/login"); // Go back to login
    } catch (error) {
      console.error(error);
      toast.error("Logout failed. Please try again.");
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-slate-500 text-sm">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-4xl mx-auto pt-10">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-10">
          <h1 className="text-xl font-medium text-white flex items-center gap-2">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-500 font-medium text-sm">
                Active Secrets
              </h3>
              <Activity className="text-emerald-500" size={18} />
            </div>
            <p className="text-3xl font-medium text-white tracking-tight">
              {stats?.activeSecrets || 0}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Currently stored in database
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
