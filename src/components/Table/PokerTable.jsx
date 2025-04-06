// src/components/Table/PokerTable.jsx
import React from "react";
import Player from "../Player/Player";
import Card from "../Card/Card";
import UserProfile from '../../assets/profile.jpg'

const PokerTable = () => {
    const players = [
        { name: "Player 1", cards: ["🂡", "🂱"] ,profile:UserProfile},
        { name: "Player 2", cards: ["🂢", "🂲"] ,profile:UserProfile},
        { name: "Player 3", cards: ["🂣", "🂳"],profile:UserProfile },
        { name: "Player 4", cards: ["🂤", "🂴"] ,profile:UserProfile},
    ];

    const communityCards = ["🃑", "🃒", "🃓", "🃔", "🃕"];

    return (
        <div className="w-full h-screen  flex items-center justify-center">

            {/* Player 1 - Top */}
    
            <div 
            style={{position:'absolute',left:'3%'}}>
            <Player name={players[0].name} cards={players[0].cards} profile={players[0].profile} position="left" />
            </div>

            {/* Player 2 - Right */}
         
            <div style={{position:'absolute',bottom:'3%',left:'30%'}}>
            <Player name={players[1].name} cards={players[1].cards} profile={players[1].profile} position="bottom"/>
            </div>

            {/* Player 3 - Bottom */}
            <div style={{position:'absolute',bottom:'3%',right:'30%'}}>
            <Player name={players[2].name} cards={players[2].cards} profile={players[2].profile} position="bottom"/>
            </div>

            {/* Player 4 - Left */}
            <div style={{position:'absolute',right:'3%'}}>
                <Player name={players[3].name} cards={players[3].cards} profile={players[3].profile} position="right"/>
            </div>


            {/* Community Cards - Center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-3">
                {communityCards.map((card, idx) => (
                    <Card key={idx} value={card} />
                ))}
            </div>
        </div>

    );
};

export default PokerTable;
