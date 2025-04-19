// // src/components/ThemeToggle.jsx
// import React from 'react';
// import { useTheme } from '../contexts/ThemeContext';
// import { Moon, Sun } from 'lucide-react';

// export default function ThemeToggle() {
//   const { isDark, toggleTheme } = useTheme();
  
//   return (
//     <button
//       onClick={toggleTheme}
//       className="p-2 rounded-md"
//       aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
//     >
//       {isDark ? (
//         <Sun className="w-5 h-5" />
//       ) : (
//         <Moon className="w-5 h-5" />
//       )}
//     </button>
//   );
// }