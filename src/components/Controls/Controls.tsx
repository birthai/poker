import React from 'react';

type ActionType = 'fold' | 'check' | 'raise';

interface ControlsProps {
  onAction: (action: ActionType) => void;
}

export default function Controls({ onAction }: ControlsProps) {
    return (
      // <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
        // <button onClick={() => onAction('fold')} className="btn">Fold</button>
        // <button onClick={() => onAction('check')} className="btn">Check</button>
        // <button onClick={() => onAction('raise')} className="btn">Raise</button>
      // </div>
      <div style={{width:'100%',height:80,position:'absolute',bottom:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div style={{width:'95%',height:'70%',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#546E7A',borderRadius:12}}>
          <button onClick={() => onAction('fold')} className="btn">Fold</button>
          <button onClick={() => onAction('check')} className="btn">Check</button>
          <button onClick={() => onAction('raise')} className="btn">Raise</button>
        </div>
      </div>
    );
}