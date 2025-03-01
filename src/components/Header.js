import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className={`sticky top-0 z-10 shadow-md p-4 transition-colors duration-300 flex justify-between items-center 
        ${!darkMode ? "bg-slate-100" : "bg-slate-600"} `}>
      <h1 className={`ml-4 font-bold text-2xl ${darkMode ? "text-white" : ""}`}>
        Meme<span className="text-blue-600">Verse</span>
      </h1>
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-full transition-all duration-300 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <FaSun className="h-6 w-6" />
        ) : (
          <FaMoon className="h-6 w-6" />
        )}
      </button>
    </header>
  );
};

export default Header;