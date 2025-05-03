import React from "react";
import PokerTable from "./components/Table/PokerTable";
import Controls from "./components/Controls/Controls";
import useGame from "./hooks/useGame";
import backgroundImage from "./assets/background.svg";

const App: React.FC = () => {
  const { gameState, handlePlayerAction } = useGame();

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden relative">
      
      <div className="absolute inset-0 w-full h-full">

        <PokerTable 
          players={gameState.players}
          communityCards={gameState.communityCards}
        />
      </div>

      <div className="relative z-10" style={{ width: '100%', position:'absolute',bottom:0}}>
        {gameState.players[gameState.currentPlayer].isHuman && (
          <Controls onAction={handlePlayerAction} />
        )}
      </div>
    </div>
  );
}

export default App;
