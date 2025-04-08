import React from "react";
import Navbar from "../components/NavBar";

function Notifications() {
  const notifications = [
    { id: 1, message: "New scan completed for example.com", date: "2025-04-08" },
    { id: 2, message: "High severity vulnerability detected", date: "2025-04-07" },
    { id: 3, message: "System update available", date: "2025-04-06" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center py-10 px-4">
      <Navbar />
      <div className="w-full max-w-2xl bg-white/10 border border-gray-700 backdrop-blur-sm rounded-3xl shadow-lg shadow-cyan-500/10 p-8 mt-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-cyan-400">Notifications</h1>
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="bg-white/5 p-4 rounded-xl border border-gray-700">
                <p className="text-sm text-gray-300">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notif.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No notifications yet.</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;