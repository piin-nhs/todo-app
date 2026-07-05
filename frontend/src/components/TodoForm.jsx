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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
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
          className="w-full px-4 py-2.5 bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-200 text-sm"
        />
        {error && <p className="mt-1 text-xs text-rose-500 font-medium">{error}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Mô tả chi tiết
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Nhập mô tả thêm (không bắt buộc)..."
          rows={3}
          className="w-full px-4 py-2.5 bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-200 text-sm resize-none"
        />
      </div>

      <div className="flex gap-3 justify-end pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-600 text-sm font-semibold rounded-xl transition-all duration-200"
          >
            Hủy
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-500/10 transition-all duration-200"
        >
          {initialTodo ? 'Cập nhật' : 'Thêm công việc'}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
