import React from 'react';

const SearchBar = ({ keyword, setKeyword, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm kiếm công việc..."
          className="w-full px-4 py-3 pl-11 bg-slate-800/50 text-slate-100 placeholder-slate-400 border border-slate-700/60 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200"
        />
        <div className="absolute left-4 text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z"
            />
          </svg>
        </div>
        <button
          type="submit"
          className="absolute right-2 px-4 py-1.5 bg-violet-600 hover:bg-violet-500 active:scale-95 text-white text-sm font-medium rounded-lg shadow-md shadow-violet-500/20 transition-all duration-200"
        >
          Tìm
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
