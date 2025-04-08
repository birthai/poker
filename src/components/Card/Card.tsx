// import React from 'react';

// interface CardProps {
//   suit: string;
//   value: string;
// }

// const Card: React.FC<CardProps> = ({ suit, value }) => {
//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '60px',  
//       width: '40px',   
//       padding: '2px'
//     }}>
//       <svg 
//         width="40"     
//         height="60"    
//         viewBox="0 0 40 60"  
//       >
//         <rect width="40" height="60" fill="white" stroke="black" />
//         <text x="5" y="15" fontSize="12">
//           {value}
//         </text>
//         <text x="5" y="45" fontSize="12">
//           {suit}
//         </text>
//       </svg>
//     </div>
//   );
// };

// export default Card;

// src/components/Card/Card.tsx
import React from 'react';

interface CardProps {
  suit: string;
  value: string;
}

const getCardColor = (suit: string): string => {
  switch(suit) {
    case '♥':
    case '♦':
      return 'red';
    case '♠':
    case '♣':
      return 'black';
    default:
      return 'black';
  }
};

const Card: React.FC<CardProps> = ({ suit, value }) => {
  const color = getCardColor(suit);
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60px',
      width: '40px',
      padding: '2px'
    }}>
      <svg 
        width="40"
        height="60"
        viewBox="0 0 40 60"
      >
        <rect width="40" height="60" fill="white" stroke="black" />
        <text x="5" y="15" fontSize="12" fill={color}>
          {value}
        </text>
        <text x="5" y="45" fontSize="12" fill={color}>
          {suit}
        </text>
      </svg>
    </div>
  );
};

export default Card;