import React from "react";
import Card from "../Card/Card";

type Position = 'top' | 'bottom' | 'left' | 'right';

interface Card {
  suit: string;
  value: string;
}

interface PlayerProps {
  name: string;
  cards: Card[];
  position: Position;
  profile: string;
}

const Player: React.FC<PlayerProps> = ({ name, cards, position, profile }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: position === 'top' ? 'row' :
        position === 'bottom' ? 'column' :
          position === 'left' ? 'row' :
            position === 'right' ? 'row' : 'row',
      direction: position === 'left' ? 'ltr' :
        position === 'right' ? undefined: undefined
    }}>
      {position === 'left' ? (
        <>
          <div>
            <img src={profile} style={{ width: 50, height: 50, borderRadius: 25 }} alt={`${name}'s profile`} />
            <div className="text-white text-sm mb-1">{name}</div>
          </div>
          <div className="flex gap-1">
            {cards.map((card, idx) => (
              <Card key={idx} suit={card.suit} value={card.value} />
            ))}
          </div>
        </>
      ) : (
        <>
        <div className="flex gap-1">
            {cards.map((card, idx) => (
              <Card key={idx} suit={card.suit} value={card.value} />
            ))}
          </div>
          <div>
            <img src={profile} style={{ width: 50, height: 50, borderRadius: 25 }} alt={`${name}'s profile`} />
            <div className="text-white text-sm mb-1">{name}</div>
          </div>
          
        </>
      )}
      
      
    </div>
  );
};

export default Player;