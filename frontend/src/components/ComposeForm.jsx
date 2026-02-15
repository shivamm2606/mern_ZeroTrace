import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { Copy, Loader2, Link, ShieldCheck, ChevronDown } from "lucide-react";

const ComposeForm = () => {
  // State for the user's input text
  const [text, setText] = useState("");

  // State for loading status (true when waiting for API)
  const [loading, setLoading] = useState(false);

  // State to store the generated link after success
  const [resultUrl, setResultUrl] = useState(null);

  // State for our dropdown options (View Limit and Expiration)
  const [viewLimit, setViewLimit] = useState(1);
  const [expiration, setExpiration] = useState(1440); // 1440 minutes = 1 day

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from reloading

    // Simple validation check
    if (!text) {
      toast.error("Please enter a secret message!");
      return;
    }

    setLoading(true); // Start spinner

    try {
      // Send POST request to our backend
      const response = await axiosInstance.post("/secrets", {
        text: text,
        viewLimit: viewLimit,
        expiration: expiration,
      });

      // The backend returns { success: true, data: { id: "..." } }
      // We need to grab that ID to make our shareable link
      const secretId = response.data.data.id;
      const fullLink = `${window.location.origin}/v/${secretId}`;

      setResultUrl(fullLink);
      toast.success("Link created successfully!");
      setText(""); // Clear the input
    } catch (error) {
      // If something goes wrong, show the error message from the backend
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  // Helper to copy link to clipboard
  const copyToClipboard = async () => {
    if (!navigator.clipboard) {
      toast.error("Clipboard not available");
      return;
    }
    try {
      await navigator.clipboard.writeText(resultUrl);
      toast.success("Copied!");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  // If we have a result URL, show the "Success" view
  if (resultUrl) {
    return (
      <div className="w-full max-w-lg mx-auto bg-zinc-900/50 backdrop-blur-md p-6 rounded-xl border border-zinc-800 animate-fade-in">
        <div className="mb-6 text-center">
          <div className="mx-auto bg-indigo-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
            <Link className="w-6 h-6 text-indigo-500" />
          </div>
          <h2 className="text-xl font-medium text-slate-100 mb-1">
            Link Ready
          </h2>
          <p className="text-slate-500 text-sm">
            Share this link carefully. It will vanish after use.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-950 p-3 rounded-md border border-zinc-800 mb-6">
          <input
            readOnly
            value={resultUrl}
            className="bg-transparent flex-1 text-slate-300 outline-none text-sm font-mono"
          />
          <button
            onClick={copyToClipboard}
            className="p-1.5 hover:bg-zinc-800 rounded-md transition-colors text-slate-500 hover:text-slate-100"
            title="Copy to clipboard"
          >
            <Copy size={16} />
          </button>
        </div>

        <button
          onClick={() => setResultUrl(null)}
          className="w-full py-2 bg-transparent border border-zinc-800 hover:bg-zinc-800 text-slate-400 hover:text-slate-100 font-medium rounded-md transition-all text-sm"
        >
          Create Another Secret
        </button>
      </div>
    );
  }

  // Otherwise, show the "Compose" form
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto bg-zinc-900/50 backdrop-blur-md p-6 rounded-xl border border-zinc-800"
    >
      <div className="mb-5">
        <h2 className="text-xl font-medium text-slate-100 mb-1">New Secret</h2>
        <p className="text-slate-500 text-sm">Encrypted, Anonymous</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your secret message here..."
        className="w-full h-40 bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none mb-5 font-mono text-sm"
      />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">
            View Limit
          </label>
          <div className="relative">
            <select
              value={viewLimit}
              onChange={(e) => setViewLimit(parseInt(e.target.value))}
              className="w-full bg-zinc-950 appearance-none border border-zinc-800 rounded-md px-3 py-2 text-sm text-slate-300 focus:border-indigo-500/50 outline-none pr-8 cursor-pointer"
            >
              <option value={1}>1 View</option>
              <option value={2}>2 Views</option>
              <option value={5}>5 Views</option>
              <option value={10}>10 Views</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none"
              size={16}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">
            Expiration
          </label>
          <div className="relative">
            <select
              value={expiration}
              onChange={(e) => setExpiration(parseInt(e.target.value))}
              className="w-full bg-zinc-950 appearance-none border border-zinc-800 rounded-md px-3 py-2 text-sm text-slate-300 focus:border-indigo-500/50 outline-none pr-8 cursor-pointer"
            >
              <option value={60}>1 Hour</option>
              <option value={1440}>1 Day</option>
              <option value={4320}>3 Days</option>
              <option value={10080}>7 Days</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !text}
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-md transition-all flex items-center justify-center gap-2 text-sm"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          "Create Secret Link"
        )}
      </button>
    </form>
  );
};

export default ComposeForm;
