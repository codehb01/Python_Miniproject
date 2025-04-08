import React from "react";
import Navbar from "../components/NavBar";

function Settings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center py-10 px-4">
      <Navbar />
      <div className="w-full max-w-2xl bg-white/10 border border-gray-700 backdrop-blur-sm rounded-3xl shadow-lg shadow-cyan-500/10 p-8 mt-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-cyan-400">
          Settings
        </h1>
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-xl border border-gray-700">
            <h3 className="text-lg font-medium text-cyan-300 mb-2">
              Notification Preferences
            </h3>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="text-cyan-500 focus:ring-cyan-500"
              />
              <span>Email Notifications</span>
            </label>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-gray-700">
            <h3 className="text-lg font-medium text-cyan-300 mb-2">Security</h3>
            <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-md hover:bg-cyan-500/30 transition">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
