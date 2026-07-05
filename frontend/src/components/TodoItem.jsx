import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TodoItem = ({ todo, onToggleStatus, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      onClick={() => setShowActions(!showActions)}
      className="group flex flex-col py-4.5 border-b border-gray-200/50 min-w-0 cursor-pointer select-none"
    >
      <div className="flex items-center justify-between gap-4 w-full min-w-0">
        {/* Vùng chứa văn bản: Chiếm trọn 100% không gian bên trái, cực kỳ rộng rãi trên mobile */}
        <div className="flex-1 min-w-0 text-left">
          <p
            className={`text-[14px] md:text-[15px] font-semibold tracking-wide break-words transition-all duration-300 ${
              todo.completed ? 'text-gray-300 line-through' : 'text-gray-700'
            }`}
          >
            {todo.title}
          </p>
          {todo.description && (
            <p
              className={`text-xs mt-0.5 break-words line-clamp-2 leading-relaxed transition-all duration-300 ${
                todo.completed ? 'text-gray-300/60 line-through' : 'text-gray-500'
              }`}
            >
              {todo.description}
            </p>
          )}
        </div>

        {/* Cụm hành động bên phải: Trên Desktop hiện nút Sửa/Xóa khi hover, trên Mobile chỉ hiện Checkbox */}
        <div className="flex items-center gap-3 flex-shrink-0">
          
          {/* Cụm nút Sửa/Xóa trên Desktop (ẩn hoàn toàn trên Mobile để nhường không gian) */}
          <div className="hidden md:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(todo);
              }}
              className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-emerald-600 transition-all duration-200"
              title="Sửa công việc"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3.5 h-3.5"
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
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todo.id);
              }}
              className="p-1 hover:bg-rose-50 rounded text-gray-500 hover:text-rose-600 transition-all duration-200"
              title="Xóa công việc"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>

          {/* Nút check hoàn thành xanh ngọc */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleStatus(todo.id, !todo.completed);
            }}
            className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
              todo.completed
                ? 'border-emerald-400 bg-emerald-400 text-white'
                : 'border-gray-300 hover:border-emerald-300 text-transparent hover:text-emerald-300/30'
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
        </div>
      </div>

      {/* Menu Action dạng trượt mở rộng thông minh ngay dưới dòng chữ chỉ dành cho Mobile */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden flex items-center gap-4 mt-2.5 pt-2.5 border-t border-gray-100 md:hidden"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(todo);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-emerald-600 py-1 px-2.5 bg-gray-50 rounded-md active:scale-95 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Sửa
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todo.id);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-rose-600 py-1 px-2.5 bg-gray-50 rounded-md active:scale-95 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              Xóa
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoItem;
