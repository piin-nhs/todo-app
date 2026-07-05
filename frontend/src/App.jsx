import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import todoApi from './api/todoApi';

import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTodo, setEditingTodo] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [todoToDelete, setTodoToDelete] = useState(null); // Quản lý custom delete modal


  // Lấy ngày hiện tại định dạng như design mẫu (vd: 12 JAN 2016)
  const [currentDate, setCurrentDate] = useState({ day: '', monthYear: '', weekday: '' });

  useEffect(() => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const monthYear = `${months[date.getMonth()]} ${date.getFullYear()}`;
    const weekdays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const weekday = weekdays[date.getDay()];
    setCurrentDate({ day, monthYear, weekday });
  }, []);

  // Fetch danh sách todos từ backend
  const fetchTodos = async () => {
    setLoading(true);
    try {
      let url = '/todos';
      const params = {};
      if (keyword.trim()) {
        params.keyword = keyword.trim();
      }
      if (filter === 'completed') {
        params.completed = true;
      } else if (filter === 'pending') {
        params.completed = false;
      }

      const response = await todoApi.get(url, { params });
      setTodos(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error('Lỗi khi fetch todos:', error);
      setErrorMessage('Không thể kết nối đến máy chủ. Vui lòng kiểm tra Backend.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch lại danh sách khi filter hoặc keyword thay đổi (Debounce 300ms)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTodos();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [filter, keyword]);


  // Thay đổi trạng thái completed
  const handleToggleStatus = async (id, completed) => {
    try {
      await todoApi.patch(`/todos/${id}/status`, { completed });
      setTodos(todos.map(todo => todo.id === id ? { ...todo, completed } : todo));
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
  };

  // Mở custom modal xác nhận xóa
  const handleDelete = (id) => {
    setTodoToDelete(id);
  };

  // Xác nhận xóa thực tế khi bấm nút Xóa ở modal
  const confirmDelete = async () => {
    if (!todoToDelete) return;
    try {
      await todoApi.delete(`/todos/${todoToDelete}`);
      setTodos(todos.filter(todo => todo.id !== todoToDelete));
    } catch (error) {
      console.error('Lỗi khi xóa todo:', error);
    } finally {
      setTodoToDelete(null);
    }
  };


  // Xử lý submit Form (Thêm hoặc Sửa)
  const handleFormSubmit = async (data) => {
    try {
      if (editingTodo) {
        // Cập nhật Todo
        const response = await todoApi.put(`/todos/${editingTodo.id}`, data);
        setTodos(todos.map(todo => todo.id === editingTodo.id ? response.data : todo));
        setEditingTodo(null);
      } else {
        // Tạo Todo mới
        const response = await todoApi.post('/todos', data);
        setTodos([response.data, ...todos]);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error('Lỗi khi lưu todo:', error);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#ece9e2] text-gray-800 font-sans flex items-center justify-center p-4 antialiased">
      <div className="bg-white max-w-md w-full rounded-lg shadow-sm border border-gray-200/50 flex flex-col relative overflow-visible min-h-[600px] max-h-[850px]">




        {/* Header Ngày tháng giống hệt thiết kế mẫu */}
        <div className="px-8 pt-12 pb-8 flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <span className="text-5xl font-light text-gray-800 tracking-tighter leading-none">{currentDate.day}</span>
            <div className="flex flex-col justify-center leading-none">
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-0.5">{currentDate.monthYear.split(' ')[0]}</span>
              <span className="text-[9px] font-bold text-gray-300 tracking-wider">{currentDate.monthYear.split(' ')[1]}</span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase">{currentDate.weekday}</span>
        </div>


        {/* Cụm Tìm kiếm và Lọc */}
        <div className="px-8 pb-6 space-y-3.5">
          <SearchBar keyword={keyword} setKeyword={setKeyword} />
          <FilterBar currentFilter={filter} onFilterChange={setFilter} />
        </div>





        {/* Lỗi kết nối (nếu có) */}
        {errorMessage && (
          <div className="mx-8 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-medium text-center">
            {errorMessage}
          </div>
        )}

        {/* Danh sách công việc (Cuộn nội dung độc lập) */}
        <div className="flex-1 overflow-y-auto px-8 pb-24 scrollbar-thin">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <TodoList
              todos={todos}
              onToggleStatus={handleToggleStatus}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>

        {/* Nút Thêm mới nổi bật ở đáy, dạng tròn rounded-full đúng như thiết kế mẫu */}
        {!isFormOpen && (
          <button
            onClick={() => {
              setEditingTodo(null);
              setIsFormOpen(true);
            }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-[#2ecc71] hover:bg-[#27ae60] active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg shadow-[#2ecc71]/35 transition-all duration-300 z-10"
            title="Thêm công việc"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        )}




        {/* Form Modal sử dụng Framer Motion trượt mượt mà từ dưới lên */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm p-4 md:p-8 flex flex-col justify-center rounded-lg z-20"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white p-5 md:p-6 rounded-lg border border-gray-200 shadow-lg w-full"
              >
                <h2 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-5">
                  {editingTodo ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}
                </h2>

                <TodoForm
                  initialTodo={editingTodo}
                  onSubmit={handleFormSubmit}
                  onCancel={() => setIsFormOpen(false)}
                />
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Custom Delete Confirmation Modal sử dụng Framer Motion */}
        <AnimatePresence>
          {todoToDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm p-4 md:p-8 flex flex-col justify-center items-center rounded-lg z-30 select-none"

            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white p-5 md:p-6 rounded-lg border border-gray-200 shadow-xl max-w-xs w-full text-center"
              >
                <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-3">
                  Xác nhận xóa
                </h3>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  Bạn có chắc chắn muốn xóa công việc này không? Hành động này không thể hoàn tác.
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setTodoToDelete(null)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-500 text-xs font-semibold rounded-md transition-all duration-200"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-semibold rounded-md shadow-sm transition-all duration-200"
                  >
                    Xóa
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default App;
