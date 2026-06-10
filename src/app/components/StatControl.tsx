'use client';

interface StatControlProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  accentClass?: string;
}

export default function StatControl({ value, onIncrement, onDecrement, accentClass = 'text-white' }: StatControlProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button 
        onClick={onIncrement}
        className="bg-emerald-600 hover:bg-emerald-500 px-2 py-0.5 rounded text-xs font-bold cursor-pointer"
      >
        +
      </button>
      <span className={`w-6 text-center font-bold ${accentClass}`}>{value}</span>
      <button 
        onClick={onDecrement}
        className="bg-slate-700 hover:bg-slate-600 px-2 py-0.5 rounded text-xs font-bold cursor-pointer"
      >
        -
      </button>
    </div>
  );
}
