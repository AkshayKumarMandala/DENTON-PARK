import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Firebase import
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"; // Firestore functions

const AdminLandRides = () => {
  const [rides, setRides] = useState([]); // Store the list of rides
  const [newRide, setNewRide] = useState({
    imgSrc: "",
    title: "",
    description: "",
  }); // New ride details
  const [editRideId, setEditRideId] = useState(null); // Store the ride being edited

  useEffect(() => {
    fetchRides(); // Fetch rides on component load
  }, []);

  // Fetch rides from Firestore
  const fetchRides = async () => {
    const ridesCollection = collection(db, "landRides");
    const rideSnapshot = await getDocs(ridesCollection);
    const rideList = rideSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRides(rideList);
  };

  // Add initial rides to the database
  const handleAddInitialRides = async () => {
    const initialRides = [
      {
        imgSrc:
          "https://funderlandpark.com/wp-content/uploads/2016/09/boy-carousel_11a9346e0a8e072646ba660ee773664c.jpg",
        title: "Classic Carousel",
        description:
          "Enjoy a classic carousel ride with beautiful horses and gentle music!",
      },
      {
        imgSrc:
          "https://media.istockphoto.com/id/186293315/photo/looping-roller-coaster.jpg?s=612x612&w=0&k=20&c=r0Uq8QvhEjoFOodlgaD_5gMOYOF4rbFxKIp6UOFrcJA=",
        title: "Ferris Wheel",
        description:
          "Get a bird's eye view of the park from our giant Ferris wheel!",
      },
      {
        imgSrc:
          "https://i.pinimg.com/564x/c8/34/0d/c8340d31ef696a16319515bb53bd340d.jpg",
        title: "Gentle Roller Coaster",
        description:
          "A smooth and gentle roller coaster perfect for the whole family!",
      },
    ];

    for (const ride of initialRides) {
      await addDoc(collection(db, "landRides"), ride); // Add each ride to Firestore
    }
    fetchRides(); // Re-fetch rides to update the list
  };

  // Delete a ride
  const handleDeleteRide = async (id) => {
    try {
      await deleteDoc(doc(db, "landRides", id)); // Delete the ride from Firestore
      fetchRides(); // Re-fetch rides after deletion
    } catch (error) {
      console.error("Error deleting ride:", error);
    }
  };

  // Handle input changes for adding or updating rides
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRide({ ...newRide, [name]: value });
  };

  // Handle adding or updating a ride
  const handleAddOrUpdateRide = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    if (!newRide.imgSrc || !newRide.title || !newRide.description) {
      alert("Please fill in all fields."); // Validation check
      return;
    }

    if (editRideId) {
      await updateDoc(doc(db, "landRides", editRideId), newRide); // Update ride in Firestore
      setEditRideId(null); // Clear edit mode
    } else {
      await addDoc(collection(db, "landRides"), newRide); // Add new ride to Firestore
    }

    setNewRide({ imgSrc: "", title: "", description: "" }); // Clear form fields
    fetchRides(); // Re-fetch rides to update the list
  };

  // Set the form fields for editing a ride
  const handleEditRide = (ride) => {
    setNewRide({
      imgSrc: ride.imgSrc,
      title: ride.title,
      description: ride.description,
    });
    setEditRideId(ride.id); // Set ride ID for editing
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Land Rides</h1>

      <button
        onClick={handleAddInitialRides}
        className="mb-4 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-600 transition"
      >
        Add Initial Rides
      </button>

      {/* Ride form for adding or updating */}
      <form onSubmit={handleAddOrUpdateRide} className="mb-4">
        <h2 className="text-xl mb-2">
          {editRideId ? "Update Ride" : "Add New Ride"}
        </h2>

        {/* Input for image link */}
        <label htmlFor="imgSrc" className="block mb-1">
          Image Link
        </label>
        <input
          id="imgSrc"
          type="text"
          name="imgSrc"
          value={newRide.imgSrc}
          onChange={handleInputChange}
          placeholder="Image Link"
          required
          className="border rounded px-2 py-1 mr-2 mb-4"
        />

        {/* Input for title */}
        <label htmlFor="title" className="block mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={newRide.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
          className="border rounded px-2 py-1 mr-2 mb-4"
        />

        {/* Input for description */}
        <label htmlFor="description" className="block mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={newRide.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
          className="border rounded px-2 py-1 mr-2 mb-4"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-600 transition"
        >
          {editRideId ? "Update Ride" : "Add Ride"}
        </button>
      </form>

      <h2 className="text-xl mb-2">Current Rides</h2>
      {/* Display rides in a grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rides.map((ride) => (
          <div
            key={ride.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <img
              className="w-full h-48 object-cover"
              src={ride.imgSrc}
              alt={ride.title}
            />
            <div className="p-5">
              <h1 className="font-bold text-xl text-gray-800">{ride.title}</h1>
              <p className="text-gray-600">{ride.description}</p>
              <div className="flex justify-between mt-4">
                {/* Edit and Delete buttons */}
                <button
                  onClick={() => handleEditRide(ride)}
                  className="w-1/2 p-2 rounded-lg bg-yellow-800 text-white font-semibold hover:bg-yellow-600 transition duration-200 ease-in-out mr-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRide(ride.id)}
                  className="w-1/2 p-2 rounded-lg bg-red-800 text-white font-semibold hover:bg-red-600 transition duration-200 ease-in-out ml-1"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLandRides;
