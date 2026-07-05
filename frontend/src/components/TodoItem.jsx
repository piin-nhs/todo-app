import React from 'react';

const TodoItem = ({ todo, onToggleStatus, onEdit, onDelete }) => {
  return (
    <div className="group flex items-center justify-between py-4 border-b border-gray-100/80 transition-all duration-300">
      <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
        {/* Nút check tròn xanh ngọc giống mẫu thiết kế */}
        <button
          type="button"
          onClick={() => onToggleStatus(todo.id, !todo.completed)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            todo.completed
              ? 'border-emerald-400 bg-emerald-400/10 text-emerald-500'
              : 'border-gray-200 hover:border-emerald-400 text-transparent hover:text-emerald-400/50'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-3.5 h-3.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={`text-[15px] font-normal leading-relaxed transition-all duration-300 ${
              todo.completed ? 'text-gray-300 line-through' : 'text-gray-700'
            }`}
          >
            {todo.title}
          </p>
          {todo.description && (
            <p
              className={`text-xs mt-0.5 transition-all duration-300 ${
                todo.completed ? 'text-gray-300/70 line-through' : 'text-gray-400'
              }`}
            >
              {todo.description}
            </p>
          )}
        </div>
      </div>

      {/* Action buttons hiển thị rõ ràng và có hiệu ứng hover mượt mà */}
      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
        <button
          type="button"
          onClick={() => onEdit(todo)}
          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-emerald-500 transition-all duration-200"
          title="Chỉnh sửa"
        >
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          className="p-1.5 hover:bg-rose-50 rounded-lg text-gray-400 hover:text-rose-500 transition-all duration-200"
          title="Xóa công việc"
        >
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
