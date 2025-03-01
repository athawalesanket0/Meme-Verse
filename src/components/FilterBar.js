import { useState } from 'react';
import { FaSearch, FaSort, FaFilter, FaChevronDown } from 'react-icons/fa';

const FilterBar = ({
    onFilterChange,
    onSortChange,
    onSearchChange,
    currentFilter = "All",
    currentSort = "All",
    darkMode
}) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearchChange(value);
    };

    const filterOptions = ["All", "Trending", "New", "Classic", "Random"];
    const sortOptions = [
        { value: "All", label: "All" },
        { value: "likes", label: "Most Liked" },
        { value: "comments", label: "Most Comments" },
        { value: "date", label: "Newest First" }
    ];

    return (
        <div className={`mb-8 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <div className="flex flex-col md:flex-row gap-4">

                <div className="flex-grow relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search memes..."
                        value={searchValue}
                        onChange={handleSearchInput}
                        className={`pl-10 p-2 w-full rounded-lg border ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                            } focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-400'
                            }`}
                    />
                </div>

                <div className="md:w-48">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaFilter className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        </div>
                        <select
                            value={currentFilter}
                            onChange={(e) => onFilterChange(e.target.value)}
                            className={`pl-10 p-2 w-full rounded-lg appearance-none border ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-gray-50 border-gray-300 text-gray-900'
                                } focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-400'
                                }`}
                        >
                            {filterOptions.map(option => (
                                <option key={option} value={option}>
                                    {option === "All" ? "All Categories" : `${option} Memes`}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <FaChevronDown className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        </div>
                    </div>
                </div>

                <div className="md:w-48">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSort className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        </div>
                        <select
                            value={currentSort}
                            onChange={(e) => onSortChange(e.target.value)}
                            className={`pl-10 p-2 w-full rounded-lg appearance-none border ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-gray-50 border-gray-300 text-gray-900'
                                } focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-400'
                                }`}
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <FaChevronDown className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;