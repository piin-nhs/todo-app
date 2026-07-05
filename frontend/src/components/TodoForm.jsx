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
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label htmlFor="title" className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">
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
          className="w-full px-3.5 py-2.5 bg-gray-50/50 text-gray-700 placeholder-gray-300 border border-gray-200/50 rounded-lg focus:outline-none focus:bg-gray-50/80 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 transition-all duration-200 text-xs"
        />
        {error && <p className="mt-1 text-[10px] text-rose-500 font-semibold tracking-wide">{error}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">
          Mô tả chi tiết
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Nhập mô tả thêm (không bắt buộc)..."
          rows={3}
          className="w-full px-3.5 py-2.5 bg-gray-50/50 text-gray-700 placeholder-gray-300 border border-gray-200/50 rounded-lg focus:outline-none focus:bg-gray-50/80 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 transition-all duration-200 text-xs resize-none"
        />
      </div>

      <div className="flex gap-2.5 justify-end pt-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-50 hover:bg-gray-100/80 active:scale-95 text-gray-400 hover:text-gray-600 text-xs font-semibold rounded-lg transition-all duration-200"
          >
            Hủy
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm shadow-emerald-500/10 transition-all duration-200"
        >
          {initialTodo ? 'Cập nhật' : 'Thêm công việc'}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
