'use client';

import { PlayerStats } from '../types/types';
import StatControl from './StatControl';

interface PlayerServeCellsProps {
  player: PlayerStats;
  onStatChange: (
    id: number, 
    field: keyof Pick<PlayerStats, 'attackKill' | 'attackError' | 'attackCont' | 'serveAce' | 'serveCont' | 'serveError'>, 
    amount: 1 | -1
  ) => void;
}

export default function PlayerServeCells({ player, onStatChange }: PlayerServeCellsProps) {
  const total = player.serveAce + player.serveCont + player.serveError;

  return (
    <>
      <td className="p-2 border border-slate-600 text-center">
        <StatControl 
          value={player.serveAce} 
          onIncrement={() => onStatChange(player.id, 'serveAce', 1)}
          onDecrement={() => onStatChange(player.id, 'serveAce', -1)}
          accentClass="text-emerald-400"
        />
      </td>

      <td className="p-2 border border-slate-600 text-center">
        <StatControl 
          value={player.serveCont} 
          onIncrement={() => onStatChange(player.id, 'serveCont', 1)}
          onDecrement={() => onStatChange(player.id, 'serveCont', -1)}
          accentClass="text-amber-400"
        />
      </td>

      <td className="p-2 border border-slate-600 text-center">
        <StatControl 
          value={player.serveError} 
          onIncrement={() => onStatChange(player.id, 'serveError', 1)}
          onDecrement={() => onStatChange(player.id, 'serveError', -1)}
          accentClass="text-rose-400"
        />
      </td>

      <td className="p-2 border border-slate-600 text-center font-bold text-base text-sky-400 bg-sky-950/10">
        {total}
      </td>
    </>
  );
}
