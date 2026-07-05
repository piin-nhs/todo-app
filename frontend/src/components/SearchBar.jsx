import React from 'react';

const SearchBar = ({ keyword, setKeyword }) => {
  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm kiếm công việc..."
          className="w-full px-3 py-2 pl-8 bg-gray-50/50 text-gray-700 placeholder-gray-300 border border-gray-100/70 rounded-lg focus:outline-none focus:bg-gray-50/80 focus:border-gray-200/50 transition-all duration-200 text-xs"
        />
        <div className="absolute left-2.5 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
