// src/components/Table/PokerTable.jsx
import React from "react";
import Player from "../Player/Player";
import Card from "../Card/Card";

const PokerTable = () => {
  const players = [
    { name: "Player 1", cards: ["🂡", "🂱"] },
    { name: "Player 2", cards: ["🂢", "🂲"] },
    { name: "Player 3", cards: ["🂣", "🂳"] },
    { name: "Player 4", cards: ["🂤", "🂴"] },
  ];

  const communityCards = ["🃑", "🃒", "🃓", "🃔", "🃕"];

  return (
    <div className="w-full h-screen bg-green-800 flex items-center justify-center">
      <div className="relative w-[600px] h-[600px] rounded-full bg-green-900 border-8 border-yellow-700 shadow-xl">

        {/* Player 1 - Top */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <Player name={players[0].name} cards={players[0].cards} />
        </div>

        {/* Player 2 - Right */}
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <Player name={players[1].name} cards={players[1].cards} />
        </div>

        {/* Player 3 - Bottom */}
        <div className="absolute bottom-4 right-1/2 transform -translate-x-1/2">
          <Player name={players[2].name} cards={players[2].cards} />
        </div>

        {/* Player 4 - Left */}
        <div className="absolute top-1/2 right-1/2 transform -translate-y-1/2">
          <Player name={players[3].name} cards={players[3].cards} />
        </div>

        {/* Community Cards - Center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-3">
          {communityCards.map((card, idx) => (
            <Card key={idx} value={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokerTable;
