
import React from "react";

const Player = ({ name, cards, position }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-white text-sm mb-1">{name}</div>
      <div className="flex gap-1">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="w-10 h-14 bg-white rounded-md shadow flex items-center justify-center text-xl"
          >
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Player;
