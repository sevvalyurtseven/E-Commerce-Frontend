import React from "react";
import { Link } from "react-router-dom";

function ShopCard({ image, title, gender, link }) {
  return (
    <div className="flex flex-col items-center text-center relative transition-transform duration-300 ease-in-out transform hover:scale-105 w-full h-full">
      <Link to={link} className="w-full h-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover filter brightness-75 grayscale-50"
        />
        <div className="absolute inset-7 flex flex-col items-center justify-center text-white font-bold text-base tracking-wider gap-3">
          <h2 className="text-2xl">{title.toUpperCase()}</h2>
          <p className="text-lg font-normal">{gender}</p>
        </div>
      </Link>
    </div>
  );
}

export default ShopCard;
