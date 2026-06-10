'use client';

import { PlayerStats } from '../types/types';
import PlayerAttackCells from './PlayerAttackCells';
import PlayerServeCells from './PlayerServeCells';

interface PlayerRowProps {
  player: PlayerStats;
  onInputChange: (id: number, field: 'number' | 'name', value: string) => void;
  onStatChange: (
    id: number, 
    field: keyof Pick<PlayerStats, 'attackKill' | 'attackError' | 'attackCont' | 'serveAce' | 'serveCont' | 'serveError'>, 
    amount: 1 | -1
  ) => void;
}

export default function PlayerRow({ player, onInputChange, onStatChange }: PlayerRowProps) {
  return (
    <tr className="border-b border-slate-700 hover:bg-slate-750">
      <td className="p-2 border border-slate-600">
        <input
          type="text"
          placeholder="N"
          value={player.number}
          onChange={(e) => onInputChange(player.id, 'number', e.target.value)}
          className="w-full bg-transparent text-center focus:bg-slate-700 outline-none p-1"
        />
      </td>
      
      <td className="p-2 border border-slate-600">
        <input
          type="text"
          placeholder="Wpisz zawodnika..."
          value={player.name}
          onChange={(e) => onInputChange(player.id, 'name', e.target.value)}
          className="w-full bg-transparent focus:bg-slate-700 outline-none p-1"
        />
      </td>

      <PlayerServeCells player={player} onStatChange={onStatChange} />
      <PlayerAttackCells player={player} onStatChange={onStatChange} />
    </tr>
  );
}
