// import React, { useState, useEffect } from 'react';

// interface CountdownTimerProps {
//   targetDate: Date;
// }

// export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   function calculateTimeLeft() {
//     const difference = targetDate.getTime() - new Date().getTime();
//     let timeLeft = {};

//     if (difference > 0) {
//       timeLeft = {
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       };
//     }

//     return timeLeft;
//   }

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearTimeout(timer);
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 text-white p-4">
//       <div className="text-center">
//         <div className="mb-8">
//           <video
//             src="https://res.cloudinary.com/dfzcr2ch4/video/upload/v1732544181/WhatsApp_Video_2024-11-25_at_7.44.19_PM_h14pa1.mp4"
//             autoPlay
//             loop
//             muted
//             className="w-40 h-40 mx-auto rounded-lg object-cover mb-4"
//           />
//         </div>
//         <h1 className="text-4xl md:text-5xl font-bold mb-8 relative">
//           Wow... much wait... very big...
//           <span className="absolute top-0 left-1/4 animate-twinkle">✨</span>
//           <span className="absolute bottom-0 right-1/4 animate-twinkle delay-1000">✨</span>
//         </h1>
//         <div className="flex justify-center space-x-4">
//           {Object.entries(timeLeft).map(([unit, value]) => (
//             <div key={unit} className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
//               <div className="text-3xl md:text-4xl font-bold">{value}</div>
//               <div className="text-sm uppercase">{unit}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

