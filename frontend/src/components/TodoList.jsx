import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleStatus, onEdit, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center select-none">
        <div className="text-gray-300/80 mb-4 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 12.408.097.098c.303.303.81.303 1.11 0l3-3a.75.75 0 0 0-1.06-1.06l-1.72 1.72V12a.75.75 0 0 0-1.5 0v3.62l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
            />
          </svg>
        </div>
        <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">
          Chưa có công việc nào
        </h3>
        <p className="text-[11px] text-gray-400 font-normal leading-relaxed max-w-[240px]">
          Hãy thêm một công việc mới hoặc thử thay đổi từ khóa tìm kiếm.
        </p>
      </div>
    );
  }


  return (
    <div className="divide-y divide-gray-100/50">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
