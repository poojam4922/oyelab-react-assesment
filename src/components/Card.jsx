import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, img, title, price, description }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <img className="w-full h-40 object-cover rounded" src={img} alt={title} />

      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <p className="text-gray-600">${price}</p>
    </div>
  );
};

export default Card;
