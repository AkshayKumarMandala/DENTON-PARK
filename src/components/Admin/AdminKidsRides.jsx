import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const AdminKidsRides = () => {
  const [rides, setRides] = useState([]);
  const [newRide, setNewRide] = useState({
    imgSrc: "",
    title: "",
    description: "",
  });
  const [editRideId, setEditRideId] = useState(null);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    const ridesCollection = collection(db, "kidsRides");
    const rideSnapshot = await getDocs(ridesCollection);
    const rideList = rideSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRides(rideList);
  };

  const handleAddInitialRides = async () => {
    const initialRides = [
      {
        imgSrc: "https://api.zamperla.com/resource/12887",
        title: "Mini Ferris Wheel",
        description:
          "A smaller version of the classic Ferris wheel, designed for little ones!",
      },
      {
        imgSrc:
          "https://media.istockphoto.com/id/462869443/photo/boys-in-bounce-house.jpg?s=612x612&w=0&k=20&c=81n9mNomDw5-FnELUVPcayRk_lgNRiFYgxlwrivuA30=",
        title: "Bouncy Castle",
        description:
          "Jump around and have fun in our safe and colorful bouncy castle!",
      },
      {
        imgSrc:
          "https://media.istockphoto.com/id/1449425093/photo/train-ride-to-childrens-amusement-park.jpg?s=612x612&w=0&k=20&c=Qo8q6j4oyocQ7v1ghDEQNifY2vqIWVR6rO55NK47xUc=",
        title: "Toy Train",
        description:
          "A fun and slow ride around the park on our adorable toy train!",
      },
    ];

    for (const ride of initialRides) {
      await addDoc(collection(db, "kidsRides"), ride);
    }
    fetchRides();
  };

  const handleDeleteRide = async (id) => {
    try {
      await deleteDoc(doc(db, "kidsRides", id));
      fetchRides();
    } catch (error) {
      console.error("Error deleting ride:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRide({ ...newRide, [name]: value });
  };

  const handleAddOrUpdateRide = async (e) => {
    e.preventDefault();
    if (!newRide.imgSrc || !newRide.title || !newRide.description) {
      alert("Please fill in all fields.");
      return;
    }

    if (editRideId) {
      await updateDoc(doc(db, "kidsRides", editRideId), newRide);
      setEditRideId(null);
    } else {
      await addDoc(collection(db, "kidsRides"), newRide);
    }

    setNewRide({ imgSrc: "", title: "", description: "" });
    fetchRides();
  };

  const handleEditRide = (ride) => {
    setNewRide({
      imgSrc: ride.imgSrc,
      title: ride.title,
      description: ride.description,
    });
    setEditRideId(ride.id);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 text-black">Admin Kids Rides</h1>

      <button
        onClick={handleAddInitialRides}
        className="mb-4 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 transition"
      >
        Add Initial Rides
      </button>

      <form onSubmit={handleAddOrUpdateRide} className="mb-4">
        <h2 className="text-xl mb-2 text-black">
          {editRideId ? "Update Ride" : "Add New Ride"}
        </h2>

        <label htmlFor="imgSrc" className="block mb-1 text-gray-900">
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
          className="border rounded px-2 py-1 mr-2 mb-4 text-gray-900"
        />

        <label htmlFor="title" className="block mb-1 text-gray-900">
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
          className="border rounded px-2 py-1 mr-2 mb-4 text-gray-900"
        />

        <label htmlFor="description" className="block mb-1 text-gray-900">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={newRide.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
          className="border rounded px-2 py-1 mr-2 mb-4 text-gray-900"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {editRideId ? "Update Ride" : "Add Ride"}
        </button>
      </form>

      <h2 className="text-xl mb-2 text-black">Current Rides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rides.map((ride) => (
          <div
            key={ride.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-800 ease-in-out"
          >
            <img
              className="w-full h-48 object-cover"
              src={ride.imgSrc}
              alt={ride.title}
            />
            <div className="p-5">
              <h1 className="font-bold text-xl text-black">{ride.title}</h1>
              <p className="text-gray-800">{ride.description}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEditRide(ride)}
                  className="w-1/2 p-2 rounded-lg bg-yellow-800 text-white font-semibold hover:bg-yellow-700 transition duration-800 ease-in-out mr-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRide(ride.id)}
                  className="w-1/2 p-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-800 ease-in-out"
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

export default AdminKidsRides;
