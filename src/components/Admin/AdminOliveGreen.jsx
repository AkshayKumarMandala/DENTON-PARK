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

const AdminOliveGreen = () => {
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({ src: "", name: "", price: "" });
  const [editDishId, setEditDishId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const dishesCollection = collection(db, "oliveGreenDishes");
      const dishesSnapshot = await getDocs(dishesCollection);
      const dishesList = dishesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDishes(dishesList);
    } catch (error) {
      setMessage("Error fetching dishes: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateDish = async (e) => {
    e.preventDefault();
    if (!newDish.src || !newDish.name || !newDish.price) {
      alert("Please fill in all fields.");
      return;
    }
    if (isNaN(newDish.price)) {
      alert("Please enter a valid price.");
      return;
    }

    setLoading(true);
    try {
      if (editDishId) {
        await updateDoc(doc(db, "oliveGreenDishes", editDishId), newDish);
        setMessage("Dish updated successfully!");
        setEditDishId(null);
      } else {
        await addDoc(collection(db, "oliveGreenDishes"), newDish);
        setMessage("Dish added successfully!");
      }
      setNewDish({ src: "", name: "", price: "" });
      fetchDishes();
    } catch (error) {
      setMessage("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDish = async (id) => {
    try {
      await deleteDoc(doc(db, "oliveGreenDishes", id));
      setMessage("Dish deleted successfully!");
      fetchDishes(); // Refresh dishes list
    } catch (error) {
      setMessage("Error deleting dish: " + error.message);
    }
  };

  const handleEditDish = (dish) => {
    setNewDish({ src: dish.src, name: dish.name, price: dish.price });
    setEditDishId(dish.id);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Admin - Olive & Green Dishes</h1>

      {message && (
        <div className="p-2 mb-4 bg-green-800 text-white">{message}</div>
      )}

      <form onSubmit={handleAddOrUpdateDish} className="mb-4">
        <h2 className="text-xl mb-2">
          {editDishId ? "Update Dish" : "Add New Dish"}
        </h2>

        <label htmlFor="src" className="block mb-1">
          Image Link
        </label>
        <input
          id="src"
          type="text"
          name="src"
          value={newDish.src}
          onChange={(e) => setNewDish({ ...newDish, src: e.target.value })}
          placeholder="Image Link"
          required
          className="border rounded px-2 py-1 mr-2"
        />

        <label htmlFor="name" className="block mb-1">
          Dish Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={newDish.name}
          onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
          placeholder="Dish Name"
          required
          className="border rounded px-2 py-1 mr-2"
        />

        <label htmlFor="price" className="block mb-1">
          Price
        </label>
        <input
          id="price"
          type="text"
          name="price"
          value={newDish.price}
          onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
          placeholder="Price"
          required
          className="border rounded px-2 py-1 mr-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-900 transition"
        >
          {loading ? "Processing..." : editDishId ? "Update Dish" : "Add Dish"}
        </button>
      </form>

      <h2 className="text-xl mb-2">Current Dishes</h2>

      {loading ? (
        <p>Loading dishes...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-800 ease-in-out"
            >
              <img
                className="w-full h-48 object-cover"
                src={dish.src}
                alt={dish.name}
              />
              <div className="p-5">
                <h1 className="font-bold text-xl text-gray-800">{dish.name}</h1>
                <p className="text-gray-900">Price: {dish.price}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEditDish(dish)}
                    className="w-1/2 p-2 rounded-lg bg-yellow-800 text-white font-semibold hover:bg-yellow-900 transition duration-800 ease-in-out mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteDish(dish.id)}
                    className="w-1/2 p-2 rounded-lg bg-red-800 text-white font-semibold hover:bg-red-900 transition duration-800 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOliveGreen;
