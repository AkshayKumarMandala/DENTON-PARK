import React from "react";
import { Link } from "react-router-dom";

const AdminRides = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Admin Rides Management</h1>
      <div className="space-y-4">
        <Link
          to="/adminhighrides"
          className="inline-block px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-600 transition duration-800 ease-in-out"
        >
          Manage High Rides
        </Link>
        <Link
          to="/adminlandrides"
          className="inline-block px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-green-600 transition duration-800 ease-in-out"
        >
          Manage Dry Rides
        </Link>
        <Link
          to="/adminwaterrides"
          className="inline-block px-6 py-3 bg-indigo-800 text-white rounded-lg hover:bg-indigo-600 transition duration-800 ease-in-out"
        >
          Manage Water Rides
        </Link>
        <Link
          to="/adminkidsrides"
          className="inline-block px-6 py-3 bg-purple-800 text-white rounded-lg hover:bg-purple-600 transition duration-800 ease-in-out"
        >
          Manage Kids Rides
        </Link>
      </div>
    </div>
  );
};

export default AdminRides;
