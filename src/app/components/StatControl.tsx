'use client';

import { memo } from 'react';

interface StatControlProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  accentClass?: string;
}

const StatControl = memo(function StatControl({ 
  value, 
  onIncrement, 
  onDecrement, 
  accentClass = 'text-white' 
}: StatControlProps) {
  
  const isZero = value <= 0;

  return (
    <div className="flex items-center justify-center gap-2">
      <button 
        type="button"
        onClick={onIncrement}
        className="bg-emerald-600 hover:bg-emerald-500 px-2 py-0.5 rounded text-xs font-bold cursor-pointer transition-colors"
      >
        +
      </button>
      
      <span className={`w-6 text-center font-bold ${accentClass}`}>{value}</span>
      
      <button 
        type="button"
        onClick={onDecrement}
        disabled={isZero}
        className={`px-2 py-0.5 rounded text-xs font-bold transition-colors ${
          isZero 
            ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50' 
            : 'bg-slate-700 hover:bg-slate-600 cursor-pointer text-white'
        }`}
      >
        -
      </button>
    </div>
  );
});

export default StatControl;
