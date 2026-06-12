'use client';

import { PlayerStats, OnStatChangeFn } from './../types/types';
import StatControl from './StatControl';

interface StatCellProps {
  playerId: number;
  field: 'attackKill' | 'attackError' | 'attackCont' | 'serveAce' | 'serveCont' | 'serveError' | 'blockPoint' | 'digSuccess' | 'receptionPerfect' | 'receptionGood' | 'receptionInaccurate' | 'receptionError';
  value: number;
  onStatChange: OnStatChangeFn;
  accentClass?: string;
}

export default function StatCell({ playerId, field, value, onStatChange, accentClass }: StatCellProps) {
  return (
    <td className="p-2 border border-slate-600 text-center">
      <StatControl 
        value={value} 
        onIncrement={() => onStatChange(playerId, field, 1)}
        onDecrement={() => onStatChange(playerId, field, -1)}
        accentClass={accentClass}
      />
    </td>
  );
}