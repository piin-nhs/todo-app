import React from 'react';

const FilterBar = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'Tất cả' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'pending', label: 'Chưa xong' },
  ];

  return (
    <div className="flex bg-[#f3f4f6] p-1.5 rounded-xl border border-gray-200/50 shadow-inner w-full">
      {filters.map((filter) => {
        const isActive = currentFilter === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className={`flex-1 text-center py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
              isActive
                ? 'bg-white text-emerald-600 shadow-md ring-1 ring-black/5'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
