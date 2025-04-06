
import React from "react";

const Player = ({ name, cards, position,profile }) => {
  return (
    <div className="flex flex-col items-center">
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
      <img src={profile} style={{width:50,height:50,borderRadius:25}}/>
      <div className="text-white text-sm mb-1">{name}</div>
    </div>
  );
};

export default Player;
