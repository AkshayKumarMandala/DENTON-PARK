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

const AdminHighRides = () => {
  const [highRides, setHighRides] = useState([]);
  const [newRide, setNewRide] = useState({
    src: "",
    title: "",
    description: "",
  });
  const [editRideId, setEditRideId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHighRides();
  }, []);

  const fetchHighRides = async () => {
    setLoading(true);
    try {
      const highRidesCollection = collection(db, "highRides");
      const highRideSnapshot = await getDocs(highRidesCollection);
      const highRideList = highRideSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHighRides(highRideList);
    } catch (error) {
      setError("Error fetching high rides");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddInitialHighRides = async () => {
    setLoading(true);
    try {
      const initialHighRides = [
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Kingda_Ka_tower.jpg/390px-Kingda_Ka_tower.jpg",
          title: "RollerCoaster Tycoon",
          description:
            "Get ready for the ultimate roller coaster experience with twists, turns, and a breathtaking drop!",
        },
        {
          src: "https://www.intamin.com/wp-content/uploads/2019/09/intamin-amusement-rides-vertical-rides-products-overview-gyro-drop-370x200.jpg",
          title: "Vertical Drop",
          description:
            "Experience the thrill of falling from a height with a straight drop that will leave you breathless!",
        },
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Chair-O-Planes%2C_night.jpg/330px-Chair-O-Planes%2C_night.jpg",
          title: "Spinning Swing",
          description:
            "Feel the rush as you swing high above the park while spinning in circles!",
        },
      ];

      for (const ride of initialHighRides) {
        await addDoc(collection(db, "highRides"), ride);
      }
      fetchHighRides();
    } catch (error) {
      setError("Error adding initial high rides");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRide = async (id) => {
    try {
      await deleteDoc(doc(db, "highRides", id));
      fetchHighRides();
    } catch (error) {
      setError("Error deleting ride");
      console.error("Error deleting ride:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRide({ ...newRide, [name]: value });
  };

  const validateImageUrl = (url) => {
    const pattern = /^https?:\/\/[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return pattern.test(url);
  };

  const handleAddOrUpdateRide = async (e) => {
    e.preventDefault();
    if (!newRide.src || !newRide.title || !newRide.description) {
      alert("Please fill in all fields.");
      return;
    }

    if (!validateImageUrl(newRide.src)) {
      alert("Please enter a valid image URL.");
      return;
    }

    setLoading(true);
    try {
      if (editRideId) {
        await updateDoc(doc(db, "highRides", editRideId), newRide);
        setEditRideId(null);
      } else {
        await addDoc(collection(db, "highRides"), newRide);
      }

      setNewRide({ src: "", title: "", description: "" });
      fetchHighRides();
    } catch (error) {
      setError("Error adding or updating ride");
      console.error("Error adding/updating ride:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditRide = (ride) => {
    setNewRide({
      src: ride.src,
      title: ride.title,
      description: ride.description,
    });
    setEditRideId(ride.id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Admin High Rides</h1>

      <button
        onClick={handleAddInitialHighRides}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Add Initial High Rides
      </button>

      <form onSubmit={handleAddOrUpdateRide} className="mb-4">
        <h2 className="text-xl mb-2">
          {editRideId ? "Update Ride" : "Add New Ride"}
        </h2>

        <label htmlFor="src" className="sr-only">
          Image Link
        </label>
        <input
          id="src"
          type="text"
          name="src"
          value={newRide.src}
          onChange={handleInputChange}
          placeholder="Image Link"
          required
          className="border rounded px-2 py-1 mr-2"
        />

        <label htmlFor="title" className="sr-only">
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
          className="border rounded px-2 py-1 mr-2"
        />

        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <input
          id="description"
          type="text"
          name="description"
          value={newRide.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
          className="border rounded px-2 py-1 mr-2"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {editRideId ? "Update Ride" : "Add Ride"}
        </button>
      </form>

      <ul>
        {highRides.map((ride) => (
          <li key={ride.id} className="mb-4 flex justify-between items-center">
            <div>
              <img src={ride.src} alt={ride.title} className="w-24 h-24 mr-4" />
              <span className="font-semibold">{ride.title}</span>
              <p>{ride.description}</p>
            </div>
            <div>
              <button
                onClick={() => handleEditRide(ride)}
                className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteRide(ride.id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminHighRides;
