
import React from 'react';
import Player from '../Player/Player';
import Card from '../Card/Card';
import './PokerTable.css';
import backgroundImage from '../../assets/profile.jpg';

const communityCards = [
  { rank: '8', suit: '♦️' },
  { rank: 'A', suit: '♠️' },
  { rank: '9', suit: '♥️' },
  { rank: 'K', suit: '♥️' },
  { rank: 'J', suit: '♣️' },
];

const players = [
  { name: 'Tyler', balance: 235 ,profileImage:backgroundImage},
  { name: 'Anthony', balance: 21 ,profileImage:backgroundImage},
  { name: 'Kaylee', balance: 178 ,profileImage:backgroundImage},
  { name: 'Michael', balance: 127 ,profileImage:backgroundImage},
  { name: 'Daniel', balance: 54 ,profileImage:backgroundImage},
  { name: 'Victoria', balance: 340 ,profileImage:backgroundImage},
  { name: 'Joseph', balance: 112 ,profileImage:backgroundImage},
  { name: 'Amelia', balance: 49,profileImage:'https://placehold.co/60x40'},
];



const PokerTable = () => {
  return (
    <div className="table-container">
      <div className="poker-table">
        <div className="pot">
          <span>$261</span>
        </div>
        <div className="community-cards">
          {communityCards.map((card, index) => (
            <Card key={index} rank={card.rank} suit={card.suit} />
          ))}
        </div>
        <div className="players">
          {players.map((player, index) => (
            <div key={index} className={`player player-${index}`}>
              <Player name={player.name} balance={player.balance} profileImage={player.profileImage} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokerTable;
