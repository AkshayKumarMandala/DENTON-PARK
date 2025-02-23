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

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    src: "",
    title: "",
    price: "",
    duration: "",
  });
  const [editVehicleId, setEditVehicleId] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const vehiclesCollection = collection(db, "vehicles");
    const vehicleSnapshot = await getDocs(vehiclesCollection);
    const vehicleList = vehicleSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setVehicles(vehicleList);
  };

  const handleAddInitialVehicles = async () => {
    const initialVehicles = [
      {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScQ8iNdbUksVL82kB2DGXrAxNu7Qi5wfH2uA&s",
        title: "Scooter",
        price: "23$",
        duration: "1 hour",
      },
      {
        src: "https://5.imimg.com/data5/SELLER/Default/2023/7/329417836/QA/LY/BK/11567184/14-seater-electric-sightseeing-bus-800x800.png",
        title: "Shuttle",
        price: "100$",
        duration: "1 hour",
      },
      {
        src: "https://www.eichertrucksandbuses.com/_next/image?url=https%3A%2F%2Fcms.eichertrucksandbuses.com%2F%2Fuploads%2Ftruck%2Fsub-category%2F4e6bee24bedc8aaeebe89ee4d31d93f6.png&w=1080&q=75",
        title: "Bus",
        price: "11$",
        duration: "1 hour",
      },
    ];

    for (const vehicle of initialVehicles) {
      await addDoc(collection(db, "vehicles"), vehicle);
    }
    fetchVehicles(); // Refresh vehicle list
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await deleteDoc(doc(db, "vehicles", id));
      fetchVehicles(); // Refresh vehicle list
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleAddOrUpdateVehicle = async (e) => {
    e.preventDefault();
    if (
      !newVehicle.src ||
      !newVehicle.title ||
      !newVehicle.price ||
      !newVehicle.duration
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editVehicleId) {
      // Update existing vehicle
      await updateDoc(doc(db, "vehicles", editVehicleId), newVehicle);
      setEditVehicleId(null); // Reset edit state
    } else {
      // Add new vehicle
      await addDoc(collection(db, "vehicles"), newVehicle);
    }

    setNewVehicle({ src: "", title: "", price: "", duration: "" }); // Reset form
    fetchVehicles(); // Refresh vehicle list
  };

  const handleEditVehicle = (vehicle) => {
    setNewVehicle({
      src: vehicle.src,
      title: vehicle.title,
      price: vehicle.price,
      duration: vehicle.duration,
    });
    setEditVehicleId(vehicle.id); // Set the ID for the vehicle being edited
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 text-black">Admin Vehicles</h1>

      <button
        onClick={handleAddInitialVehicles}
        className="mb-4 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900 transition"
      >
        Add Initial Vehicles
      </button>

      <form onSubmit={handleAddOrUpdateVehicle} className="mb-4">
        <h2 className="text-xl mb-2 text-black">
          {editVehicleId ? "Update Vehicle" : "Add New Vehicle"}
        </h2>

        <label htmlFor="src" className="block mb-1 text-black">
          Image Link
        </label>
        <input
          id="src"
          type="text"
          name="src"
          value={newVehicle.src}
          onChange={handleInputChange}
          placeholder="Image Link"
          required
          className="border rounded px-2 py-1 mr-2 text-black"
        />

        <label htmlFor="title" className="block mb-1 text-black">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={newVehicle.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
          className="border rounded px-2 py-1 mr-2 text-black"
        />

        <label htmlFor="price" className="block mb-1 text-black">
          Price
        </label>
        <input
          id="price"
          type="text"
          name="price"
          value={newVehicle.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
          className="border rounded px-2 py-1 mr-2 text-black"
        />

        <label htmlFor="duration" className="block mb-1 text-black">
          Duration
        </label>
        <input
          id="duration"
          type="text"
          name="duration"
          value={newVehicle.duration}
          onChange={handleInputChange}
          placeholder="Duration"
          required
          className="border rounded px-2 py-1 mr-2 text-black"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 transition"
        >
          {editVehicleId ? "Update Vehicle" : "Add Vehicle"}
        </button>
      </form>

      <h2 className="text-xl mb-2 text-black">Current Vehicles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-800 ease-in-out"
          >
            <img
              className="w-full h-48 object-cover"
              src={vehicle.src}
              alt={vehicle.title}
            />
            <div className="p-5">
              <h1 className="font-bold text-xl text-gray-900">
                {vehicle.title}
              </h1>
              <p className="text-gray-800">Price: {vehicle.price}</p>
              <p className="text-gray-800">Duration: {vehicle.duration}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEditVehicle(vehicle)}
                  className="w-1/2 p-2 rounded-lg bg-yellow-800 text-white font-semibold hover:bg-yellow-900 transition duration-800 ease-in-out mr-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteVehicle(vehicle.id)}
                  className="w-1/2 p-2 rounded-lg bg-red-800 text-white font-semibold hover:bg-red-900 transition duration-800 ease-in-out"
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

export default AdminVehicles;
