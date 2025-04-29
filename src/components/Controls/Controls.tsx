

import React, { useState } from 'react';

type ActionType = 'fold' | 'check' | 'raise';

interface ControlsProps {
  onAction: (action: ActionType, amount?: number) => void;
}

export default function Controls({ onAction }: ControlsProps) {
  const [raiseAmount, setRaiseAmount] = useState(10); 

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRaiseAmount(Number(e.target.value)); 
  };

  return (
    <div
      style={{
        width: '100%',
        height: '80px',
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '95%',
          height: '70%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#546E7A',
          borderRadius: '12px',
        }}
      >
        
        <button
          onClick={() => onAction('fold')}
          style={{
            backgroundColor: '#BF360C',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            margin: '0 10px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Fold
        </button>

       
        <button
          onClick={() => onAction('check')}
          style={{
            backgroundColor: '#0091EA',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            margin: '0 10px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Check
        </button>

        
        <div style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
         
          <button
            onClick={() => onAction('raise', raiseAmount)}
            style={{
              backgroundColor: '#00C853',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '10px',
            }}
          >
            Raise
          </button>

          <input
            type="range"
            min="1"
            max="100"
            value={raiseAmount}
            onChange={handleSliderChange}
            style={{
              width: '150px',
              margin: '0 10px',
            }}
          />
          <span
            style={{
              width: '40px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            {raiseAmount}
          </span>
        </div>
      </div>
    </div>
  );
}