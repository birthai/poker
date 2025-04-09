import React from "react";
import PokerTable from "./components/Table/PokerTable";
import Controls from "./components/Controls/Controls";
import useGame from "./hooks/useGame";
import backgroundImage from "./assets/background.svg";

const App: React.FC = () => {
  const { gameState, handlePlayerAction } = useGame();

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden relative bg-[#43A047]">
      <img 
        src={backgroundImage} 
        alt="Poker Table"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10" style={{width:'100%'}}>
        <PokerTable 
          players={gameState.players}
          communityCards={gameState.communityCards}
        />
        {gameState.players[gameState.currentPlayer].isHuman && (
          <Controls onAction={handlePlayerAction} />
        )}
      </div>
    </div>
  );
}

export default App;
