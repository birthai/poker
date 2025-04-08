import React from "react";
import PokerTable from "./components/Table/PokerTable";
import backgroundImage from './assets/1074.png';

const App: React.FC = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden relative bg-[#43A047]">
      <img 
        src={backgroundImage} 
        alt="Poker Table"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div className="relative z-10"
      style={{width:'100%'}}>
        <PokerTable />
      </div>
    </div>
  );
}

export default App;
