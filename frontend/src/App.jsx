import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-4">
          Tailwind CSS Test
        </h1>
        <p className="text-slate-400 mb-6">
          Nếu bạn thấy nút màu tím và nền tối sang trọng, Tailwind v4 đang hoạt động cực kỳ mượt mà!
        </p>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="px-6 py-3 bg-violet-600 hover:bg-violet-500 active:scale-95 transition-all duration-200 rounded-xl font-semibold shadow-lg shadow-violet-500/30"
        >
          Đếm: {count}
        </button>
      </div>
    </div>
  )
}

export default App
