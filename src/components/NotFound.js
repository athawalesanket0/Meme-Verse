import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = ({ darkMode }) => {
  const [randomMeme, setRandomMeme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const memeOptions = [
    {
      url: "https://i.imgflip.com/4bh36.jpg",
      caption: "When I try to find a page that doesn't exist"
    },
    {
      url: "https://i.imgflip.com/1bij.jpg",
      caption: "One does not simply find this page"
    },
    {
      url: "https://i.imgflip.com/19vcz0.jpg",
      caption: "Me trying to understand why this URL should work"
    },
    {
      url: "https://i.imgflip.com/9sw43.jpg",
      caption: "Much 404. Very missing. So error. Wow."
    },
    {
      url: "https://i.imgflip.com/1ihzfe.jpg",
      caption: "Can't get a 404 error if you go back to the homepage"
    }
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * memeOptions.length);
    setRandomMeme(memeOptions[randomIndex]);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !randomMeme) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`max-w-lg mx-auto mt-12 p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="animate-fadeIn" style={{ animationDuration: '1s' }}>
        <div className="text-center">
          <h1 className="text-8xl font-bold mb-4">
            <span className="animate-bounce inline-block mr-2">4</span>
            <span className="animate-bounce inline-block" style={{ animationDelay: '0.2s' }}>0</span>
            <span className="animate-bounce inline-block ml-2" style={{ animationDelay: '0.4s' }}>4</span>
          </h1>

          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            Page Not Found
          </h2>

          <div className="mb-8 relative overflow-hidden rounded-lg transform transition-transform duration-300 hover:scale-105 shadow-xl">
            <img
              src={randomMeme.url}
              alt="404 Meme"
              className="w-full h-auto"
            />
            <div className={`absolute bottom-0 left-0 right-0 p-4 ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} text-center font-bold text-lg`}>
              {randomMeme.caption}
            </div>
          </div>

          <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            The page you're looking for has gone missing... just like my ability to find good memes.
          </p>

          <Link
            to="/"
            className={`inline-block px-6 py-3 rounded-lg font-medium transition-all duration-300
              ${darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/30'
                : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/20'}`}
          >
            <span className="flex items-center justify-center">
              <FaArrowLeft className="w-5 h-5 mr-2" />
              Go Back Home
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default NotFound;