

// import React from 'react';

// const Card = ({ suit, value }) => {
//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100%',
//       width: '100%',
//       padding: '2px' 
//     }}>
//       <svg style={{
//         height: '100%',
//         width: '100%',
//         marginLeft: '2px', 
//         marginRight: '2px'  
//       }}>
//         <rect width="100%" height="100%" fill="white" stroke="black" />
//         <text x="5" y="10" fontSize="12">
//           {value}
//         </text>
//         <text x="5" y="30" fontSize="12">
//           {suit}
//         </text>
//       </svg>
//     </div>
//   );
// };

// export default Card;

import React from 'react';

const Card = ({ suit, value }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60px',  // ارتفاع ثابت
      width: '40px',   // عرض ثابت
      padding: '2px'
    }}>
      <svg 
        width="40"     // عرض ثابت برای SVG
        height="60"    // ارتفاع ثابت برای SVG
        viewBox="0 0 40 60"  // viewBox برای حفظ نسبت
      >
        <rect width="40" height="60" fill="white" stroke="black" />
        <text x="5" y="15" fontSize="12">
          {value}
        </text>
        <text x="5" y="45" fontSize="12">
          {suit}
        </text>
      </svg>
    </div>
  );
};

export default Card;