import React, { useState, useEffect } from 'react';

const TodoForm = ({ initialTodo, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialTodo) {
      setTitle(initialTodo.title || '');
      setDescription(initialTodo.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
    setError('');
  }, [initialTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Tiêu đề công việc là bắt buộc');
      return;
    }
    if (title.length > 100) {
      setError('Tiêu đề không được vượt quá 100 ký tự');
      return;
    }
    onSubmit({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4.5 text-left">
      <div>
        <label htmlFor="title" className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1.5">
          Tiêu đề công việc *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          placeholder="Nhập tiêu đề..."
          className="w-full px-3 py-2 bg-gray-50/50 text-gray-800 placeholder-gray-400 border border-gray-200 rounded-md focus:outline-none focus:bg-gray-50/80 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 transition-all duration-200 text-xs"
        />
        {error && <p className="mt-1 text-[10px] text-rose-500 font-semibold tracking-wide">{error}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1.5">
          Mô tả chi tiết
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Nhập mô tả thêm (không bắt buộc)..."
          rows={3}
          className="w-full px-3 py-2 bg-gray-50/50 text-gray-800 placeholder-gray-400 border border-gray-200 rounded-md focus:outline-none focus:bg-gray-50/80 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 transition-all duration-200 text-xs resize-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 justify-end pt-2 w-full">
        <button
          type="submit"
          className="w-full sm:w-auto text-center px-5 py-2.5 sm:py-2 bg-[#2ecc71] hover:bg-[#27ae60] active:scale-95 text-white text-xs font-semibold rounded-md whitespace-nowrap order-1 sm:order-2 transition-all duration-200"
        >
          {initialTodo ? 'Cập nhật' : 'Thêm công việc'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto text-center px-4 py-2.5 sm:py-2 bg-gray-100/60 hover:bg-gray-100 active:scale-95 text-gray-500 text-xs font-semibold rounded-md whitespace-nowrap order-2 sm:order-1 transition-all duration-200"
          >
            Hủy
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
