import React from "react";
import PokerTable from "./components/Table/PokerTable";
import backgroundImage from './assets/1074.svg';


function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center"
    style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <PokerTable />
    </div>
  );
}

export default App;
