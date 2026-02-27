import { Canvas } from "./components/Canvas";

export default function App() {
  return (
    <div className="flex flex-col w-full h-full bg-slate-50">
      {/* Top bar */}
      <header className="shrink-0 flex items-center gap-3 px-5 py-3 bg-slate-900 text-white shadow">
        <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center font-bold text-sm">
          FM
        </div>
        <span className="font-semibold tracking-tight text-lg">
          Financial Model
        </span>
        <span className="ml-2 text-slate-400 text-sm">/ Initiative Register</span>
      </header>

      {/* Canvas */}
      <main className="flex-1 overflow-hidden">
        <Canvas />
      </main>
    </div>
  );
}
