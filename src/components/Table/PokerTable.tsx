// import React from "react";
// import Player from "../Player/Player";
// import Card from "../Card/Card";
// import UserProfile from '../../assets/profile.jpg';
// import backgroundImage from '../../assets/background.svg';


// interface CardType {
//   suit: string;
//   value: string;
// }

// interface PlayerType {
//   name: string;
//   cards: CardType[];
//   profile: string;
// }

// const PokerTable: React.FC = () => {
//     const players: PlayerType[] = [
//         { name: "Player 1", cards: [{ suit: "♠", value: "A" },{ suit: "♠", value: "A" }], profile: UserProfile },
//         { name: "Player 2", cards: [{ suit: "♠", value: "A" },{ suit: "♠", value: "A" }], profile: UserProfile },
//         { name: "Player 3", cards: [{ suit: "♠", value: "A" },{ suit: "♠", value: "A" }], profile: UserProfile },
//         { name: "Player 4", cards: [{ suit: "♠", value: "A" },{ suit: "♠", value: "A" }], profile: UserProfile },
//     ];

//     const communityCards: CardType[] = [
//         { suit: "♠", value: "A" },
//         { suit: "♥", value: "K" },
//         { suit: "♦", value: "Q" },
//         { suit: "♣", value: "J" },
//         { suit: "♠", value: "10" }
//     ];

//     return (
//         <div 
//             className="w-full h-full flex items-center justify-center relative" 
//             style={{ 
//                 backgroundImage: `url(${backgroundImage})`, 
//                 backgroundSize: '100% auto',
//                 backgroundPosition: 'center',
//                 backgroundRepeat: 'no-repeat',
//                 overflow: 'visible',
//                 backgroundPosition: 'center',
//                 backgroundRepeat: 'no-repeat'
//             }}
//         >
//             {/* Player 1 - Top */}
//             <div style={{ position: 'absolute', left: '0%', top: '50%', transform: 'translateY(-50%)' }}>
//                 <Player name={players[0].name} cards={players[0].cards} profile={players[0].profile} position="left" />
//             </div>

//             {/* Player 2 - Bottom Left */}
//             <div style={{ position: 'fixed', right: '30%', bottom: '3%' , transform: 'translateY(-50%)' }}>
//                 <Player name={players[1].name} cards={players[1].cards} profile={players[1].profile} position="bottom" />
//             </div>

//             {/* Player 3 - Bottom Right */}
//             <div style={{ position: 'absolute', left: '30%', bottom: '3%' , transform: 'translateY(-50%)' }}>
//                 <Player name={players[2].name} cards={players[2].cards} profile={players[2].profile} position="bottom" />
//             </div>

//             {/* Player 4 - Center Right */}
//             <div style={{ position: 'absolute', right: '0%', top: '50%', transform: 'translateY(-50%)' }}>
//                 <Player name={players[3].name} cards={players[3].cards} profile={players[3].profile} position="right" />
//             </div>

//             {/* Community Cards - Center */}
//             <div style={{
//                 height: '10%',
//                 width: '24%',
//                 position: 'absolute',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 display: 'flex',
//                 flexDirection: 'row'
//             }}>
//                 {communityCards.map((card, idx) => (
//                     <Card key={idx} suit={card.suit} value={card.value} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PokerTable;

import React from 'react';
import Player from '../Player/Player';
import Card from '../Card/Card';
import './PokerTable.css';

const communityCards = [
  { rank: '8', suit: '♦️' },
  { rank: 'A', suit: '♠️' },
  { rank: '9', suit: '♥️' },
  { rank: 'K', suit: '♥️' },
  { rank: 'J', suit: '♣️' },
];

const players = [
  { name: 'Tyler', balance: 235 },
  { name: 'Anthony', balance: 21 },
  { name: 'Kaylee', balance: 178 },
  { name: 'Michael', balance: 127 },
  { name: 'Daniel', balance: 54 },
  { name: 'Victoria', balance: 340 },
  { name: 'Joseph', balance: 112 },
  { name: 'Amelia', balance: 49 },
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
              <Player name={player.name} balance={player.balance} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokerTable;
