import React from "react";
import { Link } from "react-router-dom";

const AdminWheelChair = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Wheelchair Management</h1>
      <div className="space-y-4">
        <Link
          to="/adminoldpeoplewheelchairs"
          className="inline-block px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
        >
          Manage Old People Wheelchairs
        </Link>
        <Link
          to="/adminhandicappedwheelchairs"
          className="inline-block px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
        >
          Manage Handicapped Wheelchairs
        </Link>
      </div>
    </div>
  );
};

export default AdminWheelChair;
