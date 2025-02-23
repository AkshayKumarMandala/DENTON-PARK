import React, { useState } from "react";
import Restaurant from "./Restaurant";
import Menu from "./Menu";

function Dining() {
  const [restaurantMenu, setRestaurantMenu] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // State to toggle between restaurant list and menu

  const handleMenuClick = (id) => {
    setRestaurantMenu(id);
    setShowMenu(true); // Show the menu when a restaurant is clicked
  };

  const handleBackClick = () => {
    setShowMenu(false); // Go back to the restaurant list
    setRestaurantMenu(null); // Reset the selected restaurant
  };

  return (
    <div>
      {!showMenu ? (
        <Restaurant handleMenuClick={handleMenuClick} />
      ) : (
        <div className="flex items-center flex-col">
          <Menu menuItems={restaurantMenu} />
          <button
            onClick={handleBackClick}
            className="p-2 bg-blue-800 text-white rounded my-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
            aria-label="Back to restaurant list"
          >
            Check Out Other Restaurants
          </button>
        </div>
      )}
    </div>
  );
}

export default Dining;
