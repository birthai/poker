
//============================================

import React from 'react';
import './Player.css';

interface PlayerProps {
  name: string;
  balance: number;
  profileImage: string;
}

const Player: React.FC<PlayerProps> = ({ name, balance, profileImage }) => {
  return (
    <div className="player-card">
      <img src={profileImage} alt={`${name}'s profile`} className="player-avatar" />
      <div className="player-info">
        <div className="player-name">{name}</div>
        <div className="player-balance">${balance}</div>
      </div>
      <div className="player-cards">
        <div className="card-back"></div>
        <div className="card-back"></div>
      </div>
    </div>
  );
};

export default Player;