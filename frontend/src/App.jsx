import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import todoApi from './api/todoApi';

import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'alphabet'
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false); // Điều khiển Custom Dropdown
  const [currentDate, setCurrentDate] = useState({ day: '', monthYear: '', weekday: '' });

  // Phân trang (Pagination) state
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 3; // Chỉ hiển thị 3 công việc mỗi trang để tính năng phân trang xuất hiện ngay

  useEffect(() => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const monthYear = `${months[date.getMonth()]} ${date.getFullYear()}`;
    const weekdays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const weekday = weekdays[date.getDay()];
    setCurrentDate({ day, monthYear, weekday });
  }, []);

  // Reset trang về 1 khi người dùng đổi filter hoặc từ khoá tìm kiếm hoặc kiểu sort
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, filter, sortBy]);

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

  // Sắp xếp dữ liệu (Client-side sorting)
  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === 'newest') return b.id - a.id;
    if (sortBy === 'oldest') return a.id - b.id;
    if (sortBy === 'alphabet') return a.title.localeCompare(b.title, 'vi', { sensitivity: 'base' });
    return 0;
  });

  // Phân trang dữ liệu (Client-side pagination)
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = sortedTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(sortedTodos.length / todosPerPage);

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
        <div className="flex-1 overflow-y-auto px-8 pb-24 scrollbar-thin flex flex-col">
          
          {/* Bộ chọn Sắp xếp (Sorting Selection Selector) tối giản */}
          {!loading && todos.length > 0 && (
            <div className="flex justify-between items-center mb-3 select-none flex-shrink-0">
              <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase">
                Danh sách ({todos.length})
              </span>
              
              {/* Custom Combobox Sắp xếp mượt mà */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="flex items-center gap-1.5 text-[9px] font-bold text-gray-500 hover:text-emerald-500 tracking-wider uppercase focus:outline-none transition-colors duration-200"
                >
                  <span>
                    {sortBy === 'newest' && 'Mới nhất'}
                    {sortBy === 'oldest' && 'Cũ nhất'}
                    {sortBy === 'alphabet' && 'Tên A-Z'}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-gray-400">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isSortDropdownOpen && (
                    <>
                      {/* Backdrop để click ra ngoài là tự động đóng */}
                      <div className="fixed inset-0 z-10" onClick={() => setIsSortDropdownOpen(false)} />
                      
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.12 }}
                        className="absolute right-0 mt-1.5 w-24 bg-white border border-gray-100 rounded-md shadow-lg py-1 z-20 overflow-hidden"
                      >
                        {[
                          { value: 'newest', label: 'Mới nhất' },
                          { value: 'oldest', label: 'Cũ nhất' },
                          { value: 'alphabet', label: 'Tên A-Z' }
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setSortBy(opt.value);
                              setIsSortDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-[9px] font-bold tracking-wider uppercase transition-colors ${
                              sortBy === opt.value
                                ? 'bg-emerald-50/50 text-[#2ecc71]'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-12 flex-1">
              <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <TodoList
                todos={currentTodos}
                onToggleStatus={handleToggleStatus}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              {/* Bộ điều khiển Phân trang Pagination tối giản */}
              {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-auto pt-4 pb-2 border-t border-gray-100 select-none flex-shrink-0">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-6 h-6 text-[10px] font-bold rounded-md flex items-center justify-center transition-all ${
                          currentPage === pageNum
                            ? 'bg-emerald-50 text-[#2ecc71] border border-[#2ecc71]/20'
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              )}
            </>
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
