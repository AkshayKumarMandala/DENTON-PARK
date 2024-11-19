import React, { useState } from "react";
import RentCamera from "./RentCamera";
import BookPhotographer from "./BookPhotographer";

const CameraBooking = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const renderSelectedOption = () => {
    if (selectedOption === "rent") return <RentCamera />;
    if (selectedOption === "photographer") return <BookPhotographer />;
    return null;
  };

  return (
    <div className="container flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-center text-gray-900">
        Camera Booking
      </h1>
      <p className="mt-4 text-lg text-gray-900 text-center">
        Choose between renting high-quality cameras or booking a professional
        photographer to capture your moments. Enjoy a seamless and memorable
        photography experience!
      </p>
      <div className="options-container flex space-x-8 mt-8">
        {/* Rent Camera Option */}
        <div
          onClick={() => setSelectedOption("rent")}
          className={`option-card cursor-pointer p-6 text-center rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
            selectedOption === "rent"
              ? "bg-green-800 border-green-800 border-2 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          <em className="fas fa-camera text-4xl mb-4"></em>
          <h2 className="text-2xl font-semibold mb-2">Rent a Camera</h2>
          <p className="text font mb-2">
            Access high-quality cameras for your special events or travel needs.
          </p>
          <button className="btn btn-primary">Select</button>
        </div>

        {/* Book Photographer Option */}
        <div
          onClick={() => setSelectedOption("photographer")}
          className={`option-card cursor-pointer p-6 text-center rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
            selectedOption === "photographer"
              ? "bg-green-800 border-green-800 border-2 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          <em className="fas fa-user-camera text-4xl mb-4"></em>
          <h2 className="text-2xl font-semibold mb-2">Book a Photographer</h2>
          <p className="text font mb-2">
            Hire a professional photographer to capture your memorable moments.
          </p>
          <button className="btn btn-primary">Select</button>
        </div>
      </div>
      <div className="selected-option mt-8 w-full">
        {renderSelectedOption()}
      </div>
    </div>
  );
};

export default CameraBooking;
