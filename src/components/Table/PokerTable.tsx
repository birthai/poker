import React from "react";
import Player from "../Player/Player";
import Card from "../Card/Card";
import UserProfile from '../../assets/profile.jpg';

interface CardType {
  suit: string;
  value: string;
}

interface PlayerType {
  name: string;
  cards: CardType[];
  profile: string;
}

const PokerTable: React.FC = () => {
    const players: PlayerType[] = [
        { name: "Player 1", cards: [{ suit: "♠", value: "A" },{ suit: "♠", value: "A" }], profile: UserProfile },
        { name: "Player 2", cards: [{ suit: "♠", value: "A" },{ suit: "♠", value: "A" }], profile: UserProfile },
        { name: "Player 3", cards: [{ suit: "♠", value: "A" },{ suit: "♠", value: "A" }], profile: UserProfile },
        { name: "Player 4", cards: [{ suit: "♠", value: "A" },{ suit: "♠", value: "A" }], profile: UserProfile },
    ];

    const communityCards: CardType[] = [
        { suit: "♠", value: "A" },
        { suit: "♥", value: "K" },
        { suit: "♦", value: "Q" },
        { suit: "♣", value: "J" },
        { suit: "♠", value: "10" }
    ];

    return (
        <div className="w-full h-screen flex items-center justify-center">
            {/* Player 1 - Top */}
            <div style={{ position: 'absolute', left: '3%' }}>
                <Player name={players[0].name} cards={players[0].cards} profile={players[0].profile} position="left" />
            </div>

            {/* Player 2 - Right */}
            <div style={{ position: 'absolute', bottom: '3%', left: '30%' }}>
                <Player name={players[1].name} cards={players[1].cards} profile={players[1].profile} position="bottom" />
            </div>

            {/* Player 3 - Bottom */}
            <div style={{ position: 'absolute', bottom: '3%', right: '30%' }}>
                <Player name={players[2].name} cards={players[2].cards} profile={players[2].profile} position="bottom" />
            </div>

            {/* Player 4 - Left */}
            <div style={{ position: 'absolute', right: '3%' }}>
                <Player name={players[3].name} cards={players[3].cards} profile={players[3].profile} position="right" />
            </div>

            {/* Community Cards - Center */}
            <div style={{
                height: '10%',
                width: '24%',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row'
            }}>
                {communityCards.map((card, idx) => (
                    <Card key={idx} suit={card.suit} value={card.value} />
                ))}
            </div>
        </div>
    );
};

export default PokerTable;