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

const AdminOldPeopleWheelChair = () => {
  const [wheelchairs, setWheelchairs] = useState([]);
  const [newWheelchair, setNewWheelchair] = useState({
    src: "",
    title: "",
    price: "",
    duration: "",
  });
  const [editWheelchairId, setEditWheelchairId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWheelchairs();
  }, []);

  const fetchWheelchairs = async () => {
    setLoading(true);
    setError(null);
    try {
      const wheelchairCollection = collection(db, "oldPeopleWheelchairs");
      const wheelchairSnapshot = await getDocs(wheelchairCollection);
      const wheelchairList = wheelchairSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWheelchairs(wheelchairList);
    } catch (err) {
      setError("Error fetching wheelchairs. Please try again later.");
      console.error("Error fetching wheelchairs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddInitialWheelchairs = async () => {
    setLoading(true);
    try {
      const initialWheelchairs = [
        {
          src: "https://media.seniority.in/catalog/product/cache/5e761624598432260ed1d4db05cdec91/7/1/71_ngee1d5l.jpg",
          title: "Regular Wheel Chair",
          price: "45$",
          duration: "1 day",
        },
        {
          src: "https://5.imimg.com/data5/SELLER/Default/2024/2/391391565/OB/JG/XI/2118790/front-wheel-drive-power-chair-500x500.jpg",
          title: "Automatic Wheel Chair",
          price: "90$",
          duration: "1 hour",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lR8sWaRUUh3_yL2XaU-Hc4CHAzqMIFtNCw&s",
          title: "Comfort-pro Wheel Chair",
          price: "110$",
          duration: "1 day",
        },
      ];

      for (const wheelchair of initialWheelchairs) {
        await addDoc(collection(db, "oldPeopleWheelchairs"), wheelchair);
      }
      fetchWheelchairs();
    } catch (err) {
      setError("Error adding initial wheelchairs. Please try again later.");
      console.error("Error adding initial wheelchairs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWheelchair = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, "oldPeopleWheelchairs", id));
      fetchWheelchairs();
    } catch (err) {
      setError("Error deleting wheelchair. Please try again later.");
      console.error("Error deleting wheelchair:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWheelchair({ ...newWheelchair, [name]: value });
  };

  const handleAddOrUpdateWheelchair = async (e) => {
    e.preventDefault();
    setError(null);

    if (
      !newWheelchair.src ||
      !newWheelchair.title ||
      !newWheelchair.price ||
      !newWheelchair.duration
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      if (editWheelchairId) {
        await updateDoc(
          doc(db, "oldPeopleWheelchairs", editWheelchairId),
          newWheelchair
        );
        setEditWheelchairId(null);
      } else {
        await addDoc(collection(db, "oldPeopleWheelchairs"), newWheelchair);
      }

      setNewWheelchair({ src: "", title: "", price: "", duration: "" });
      fetchWheelchairs();
    } catch (err) {
      setError("Error adding or updating wheelchair. Please try again later.");
      console.error("Error adding or updating wheelchair:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditWheelchair = (wheelchair) => {
    setNewWheelchair({
      src: wheelchair.src,
      title: wheelchair.title,
      price: wheelchair.price,
      duration: wheelchair.duration,
    });
    setEditWheelchairId(wheelchair.id);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Old People Wheel Chairs</h1>

      <button
        onClick={handleAddInitialWheelchairs}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Add Initial Wheel Chairs
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleAddOrUpdateWheelchair} className="mb-4">
        <h2 className="text-xl mb-2">
          {editWheelchairId ? "Update Wheel Chair" : "Add New Wheel Chair"}
        </h2>

        <label htmlFor="src" className="block mb-1">
          Image Link
        </label>
        <input
          id="src"
          type="text"
          name="src"
          value={newWheelchair.src}
          onChange={handleInputChange}
          placeholder="Image Link"
          required
          className="border rounded px-2 py-1 mr-2 mb-4"
        />

        {newWheelchair.src && (
          <div>
            <h3 className="mt-4">Image Preview:</h3>
            <img
              src={newWheelchair.src}
              alt="Wheelchair Preview"
              className="w-32 h-32 object-cover mt-2"
            />
          </div>
        )}

        <label htmlFor="title" className="block mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={newWheelchair.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
          className="border rounded px-2 py-1 mr-2 mb-4"
        />

        <label htmlFor="price" className="block mb-1">
          Price
        </label>
        <input
          id="price"
          type="text"
          name="price"
          value={newWheelchair.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
          className="border rounded px-2 py-1 mr-2 mb-4"
        />

        <label htmlFor="duration" className="block mb-1">
          Duration
        </label>
        <input
          id="duration"
          type="text"
          name="duration"
          value={newWheelchair.duration}
          onChange={handleInputChange}
          placeholder="Duration"
          required
          className="border rounded px-2 py-1 mr-2 mb-4"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {editWheelchairId ? "Update Wheel Chair" : "Add Wheel Chair"}
        </button>
      </form>

      <div>
        {wheelchairs.map((wheelchair) => (
          <div
            key={wheelchair.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>{wheelchair.title}</span>
            <div>
              <button
                onClick={() => handleEditWheelchair(wheelchair)}
                className="mr-2 text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteWheelchair(wheelchair.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOldPeopleWheelChair;
