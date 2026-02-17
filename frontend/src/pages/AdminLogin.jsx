import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/admin/login", { password });
      toast.success("Admin access granted");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-zinc-900/50 backdrop-blur-md p-6 rounded-xl border border-slate-800"
      >
        <div className="text-center mb-6">
          <div className="mx-auto bg-slate-800 w-10 h-10 rounded-full flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-slate-400" />
          </div>
          <h2 className="text-lg font-medium text-white">Admin Access</h2>
        </div>

        <div className="mb-5">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Master Password"
            className="w-full bg-transparent border border-slate-800 rounded-md px-3 py-2 text-white focus:border-indigo-500/50 outline-none transition-all text-sm placeholder-slate-600"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-md transition-colors text-sm"
        >
          Unlock Dashboard
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
