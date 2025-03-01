import { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { FaFrown } from "react-icons/fa";
import MemeCard from "./components/MemeCard";
import Header from "./components/Header";
import MemeDetails from "./components/MemeDetails";
import FilterBar from "./components/FilterBar";
import NotFound from "./components/NotFound";

function App() {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const MEMES_PER_PAGE = 12;

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetch('https://api.imgflip.com/get_memes');
      const json = await data.json();
      const memesWithMetadata = json.data.memes.map(meme => ({
        ...meme,
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 20),
        date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        category: ["Trending", "New", "Classic", "Random"][Math.floor(Math.random() * 4)]
      }));

      setMemes(memesWithMetadata);
      setFilteredMemes(memesWithMetadata);
    } catch (error) {
      console.error("Failed to fetch memes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    let result = [...memes];

    if (filterType !== "All") {
      result = result.filter(meme => meme.category === filterType);
    }
    if (searchTerm.trim()) {
      result = result.filter(meme =>
        meme.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    result.sort((a, b) => {
      switch (sortBy) {
        case "likes":
          return b.likes - a.likes;
        case "comments":
          return b.comments - a.comments;
        case "date":
          return new Date(b.date) - new Date(a.date);
        default:
          return 0;
      }
    });

    setFilteredMemes(result);
    setCurrentPage(1);
  }, [memes, filterType, searchTerm, sortBy]);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce(value => {
      setSearchTerm(value);
    }, 500),
    []
  );

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const openMemeDetails = (meme) => {
    setSelectedMeme(meme);
    setShowDetails(true);
  };

  const closeMemeDetails = () => {
    setShowDetails(false);
  };

  const indexOfLastMeme = currentPage * MEMES_PER_PAGE;
  const indexOfFirstMeme = indexOfLastMeme - MEMES_PER_PAGE;
  const currentMemes = filteredMemes.slice(indexOfFirstMeme, indexOfLastMeme);
  const totalPages = Math.ceil(filteredMemes.length / MEMES_PER_PAGE);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const getPaginationNumbers = () => {
    const pageNumbers = [];
    const showEllipsisLeft = currentPage > 3;
    const showEllipsisRight = currentPage < totalPages - 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (showEllipsisLeft) {
        pageNumbers.push("ellipsis-left");
      }
      const rangeStart = Math.max(2, currentPage - 1);
      const rangeEnd = Math.min(totalPages - 1, currentPage + 1);
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pageNumbers.push(i);
      }
      if (showEllipsisRight) {
        pageNumbers.push("ellipsis-right");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const renderMemeGallery = () => (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <FilterBar
        onFilterChange={setFilterType}
        onSortChange={setSortBy}
        onSearchChange={debouncedSearch}
        currentFilter={filterType}
        currentSort={sortBy}
        darkMode={darkMode}
      />

      {filterType !== "All" && (
        <h2 className={`text-2xl font-semibold mb-6 ${darkMode ? "text-white" : ""}`}>
          {filterType} Memes
        </h2>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="max-w-screen-xl m-auto mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentMemes.map((meme, index) => (
              <div
                key={meme.id}
                className="opacity-0 animate-fadeIn hover:translate-y-[-5px] transition-transform duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MemeCard
                  url={meme.url}
                  name={meme.name}
                  id={meme.id}
                  darkMode={darkMode}
                  likesCount={meme.likes}
                  commentsCount={meme.comments}
                  onOpenDetails={() => openMemeDetails({
                    url: meme.url,
                    name: meme.name,
                    id: meme.id,
                    likes: meme.likes,
                    comments: meme.comments,
                    date: meme.date
                  })}
                />
              </div>
            ))}
          </div>

          {filteredMemes.length > 0 ? (
            <div className="flex justify-center mt-8">
              <nav>
                <ul className="flex space-x-2">
                  <li>
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded ${darkMode
                        ? "bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500"
                        : "bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                        } transition-colors duration-300`}
                    >
                      &laquo;
                    </button>
                  </li>

                  {getPaginationNumbers().map((number, index) => (
                    <li key={`page-${number}-${index}`}>
                      {number === "ellipsis-left" || number === "ellipsis-right" ? (
                        <span className={`px-3 py-1 ${darkMode ? "text-white" : "text-gray-600"}`}>
                          &hellip;
                        </span>
                      ) : (
                        <button
                          onClick={() => paginate(number)}
                          className={`px-3 py-1 rounded transition-colors duration-300 ${currentPage === number
                            ? darkMode
                              ? "bg-blue-600 text-white"
                              : "bg-blue-500 text-white"
                            : darkMode
                              ? "bg-gray-700 text-white hover:bg-gray-600"
                              : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                          {number}
                        </button>
                      )}
                    </li>
                  ))}

                  <li>
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded ${darkMode
                        ? "bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500"
                        : "bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                        } transition-colors duration-300`}
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          ) : (
            <div
              className={`text-center py-10 ${darkMode ? "text-white" : "text-gray-700"} transition-all duration-500 transform hover:scale-105`}
            >
              <div className="inline-block">
                <FaFrown className={`w-12 h-12 mb-4 mx-auto ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                <p className="text-lg font-medium">No memes found matching your criteria</p>
                <p className="mt-2 text-sm opacity-75">Try adjusting your filters or search terms</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-slate-300"}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <Routes>
          <Route path="/" element={renderMemeGallery()} />
          <Route path="/memes" element={renderMemeGallery()} />
          <Route path="/memes/:id" element={<MemeDetails darkMode={darkMode} />} />
          <Route path="/404" element={<NotFound darkMode={darkMode} />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>

        {selectedMeme && (
          <MemeDetails
            meme={selectedMeme}
            isOpen={showDetails}
            onClose={closeMemeDetails}
            darkMode={darkMode}
          />
        )}
      </div>
    </Router>
  );
}

export default App;