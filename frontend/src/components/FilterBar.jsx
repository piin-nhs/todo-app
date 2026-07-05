import React from 'react';

const FilterBar = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'Tất cả' },
    { value: 'completed', label: 'Đã xong' },
    { value: 'pending', label: 'Chưa xong' },
  ];

  return (
    <div className="flex justify-start gap-5 border-b border-gray-200/50 pb-1.5 w-full select-none">
      {filters.map((filter) => {

        const isActive = currentFilter === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className={`pb-1 text-[11px] font-semibold tracking-widest uppercase transition-all duration-300 relative ${isActive
                ? 'text-emerald-500'
                : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            {filter.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#2ecc71] rounded-full"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
