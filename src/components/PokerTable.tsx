import React from 'react';
import { Player, Card } from '../types/game';

interface PokerTableProps {
  players: Player[];
  communityCards: Card[];
}

const PokerTable: React.FC<PokerTableProps> = ({ players, communityCards }) => {
  return (
    <div className="poker-table">
      <div className="community-cards">
        {communityCards.map((card, index) => (
          <div key={index} className="card">
            {card.rank}{card.suit}
          </div>
        ))}
      </div>
      <div className="players">
        {players.map((player, index) => (
          <div key={index} className="player">
            <div className="player-name">{player.name}</div>
            <div className="player-chips">{player.chips}</div>
            <div className="player-cards">
              {player.cards.map((card, cardIndex) => (
                <div key={cardIndex} className="card">
                  {card.rank}{card.suit}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokerTable; 