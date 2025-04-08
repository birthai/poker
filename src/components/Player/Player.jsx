
import React from "react";
import Card from "../Card/Card";

const Player = ({ name, cards, position, profile }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: position === 'top' ? 'row' :
        position === 'bottom' ? 'column' :
          position === 'left' ? 'row' :
            position === 'right' ? 'row' : 'row',
      direction: position === 'left' ? 'rtl' :
        position === 'right' ? 'ltr' : null
    }}>
      <div className="flex gap-1">
        {cards.map((card, idx) => (
          <Card key={idx} suit={card.suit} value={card.value} />
        ))}
      </div>
      <div>
        <img src={profile} style={{ width: 50, height: 50, borderRadius: 25 }} />
        <div className="text-white text-sm mb-1">{name}</div>
      </div>

    </div>
  );
};

export default Player;
