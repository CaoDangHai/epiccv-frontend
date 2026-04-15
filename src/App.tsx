export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-6">
        <div className="text-center">
          {/* Test Gradient text và Typography */}
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 pb-2">
            Tailwind v4
          </h1>
          <p className="text-slate-500 font-medium mt-1">Setup thành công cho EpicCV!</p>
        </div>

        {/* Test Flexbox, Spacing và Hover/Transition effects */}
        <div className="space-y-4">
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md shadow-blue-200 transition-all duration-300 hover:-translate-y-1 active:scale-95 cursor-pointer">
            Bắt đầu dự án
          </button>

          <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors duration-300 cursor-pointer">
            Xem tài liệu
          </button>
        </div>
      </div>
    </div>
  );
}
