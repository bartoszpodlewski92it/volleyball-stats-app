'use client';

import { PlayerStats } from '../types/types';
import StatControl from './StatControl';

interface PlayerAttackCellsProps {
  player: PlayerStats;
  onStatChange: (
    id: number, 
    field: keyof Pick<PlayerStats, 'attackKill' | 'attackError' | 'attackCont' | 'serveAce' | 'serveCont' | 'serveError'>, 
    amount: 1 | -1
  ) => void;
}

export default function PlayerAttackCells({ player, onStatChange }: PlayerAttackCellsProps) {
  const total = player.attackKill + player.attackError + player.attackCont;
  const pct = total > 0 ? ((player.attackKill / total) * 100).toFixed(2) : '0.00';

  return (
    <>
      <td className="p-2 border border-slate-600 text-center">
        <StatControl 
          value={player.attackKill} 
          onIncrement={() => onStatChange(player.id, 'attackKill', 1)}
          onDecrement={() => onStatChange(player.id, 'attackKill', -1)}
          accentClass="text-emerald-400"
        />
      </td>

      <td className="p-2 border border-slate-600 text-center">
        <StatControl 
          value={player.attackError} 
          onIncrement={() => onStatChange(player.id, 'attackError', 1)}
          onDecrement={() => onStatChange(player.id, 'attackError', -1)}
          accentClass="text-rose-400"
        />
      </td>

      <td className="p-2 border border-slate-600 text-center">
        <StatControl 
          value={player.attackCont} 
          onIncrement={() => onStatChange(player.id, 'attackCont', 1)}
          onDecrement={() => onStatChange(player.id, 'attackCont', -1)}
          accentClass="text-amber-400"
        />
      </td>

      <td className="p-2 border border-slate-600 text-center font-bold text-lg text-amber-500 bg-orange-950/10">
        {pct}%
        <span className="block text-xs text-slate-400 font-normal">Suma: {total}</span>
      </td>
    </>
  );
}
