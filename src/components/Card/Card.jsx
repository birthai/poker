
import React from "react";

const Card = ({ value }) => {
  return (
    <div className="w-16 h-24 bg-white rounded shadow-lg flex items-center justify-center text-black text-lg">
      {value}
    </div>
  );
};

export default Card;
