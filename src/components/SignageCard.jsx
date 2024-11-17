import React from "react";

const SignageCard = ({ signage }) => {
  return (
    <div className="signage-card border border-gray-800 rounded-lg p-4 mb-4 md:w-[20vw] w-full bg-white">
      <img
        src={signage.src}
        alt={signage.name}
        className="w-full h-32 object-contain rounded-md"
      />
      <h3 className="font-bold text-lg mt-2 text-black">{signage.name}</h3>
      <p className="text-black">{signage.description}</p>
    </div>
  );
};

export default SignageCard;
