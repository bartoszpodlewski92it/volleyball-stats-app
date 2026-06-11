'use client';

import { PlayerStats, OnInputChangeFn, OnStatChangeFn } from '../types/types';
import PlayerAttackCells from './PlayerAttackCells';
import PlayerServeCells from './PlayerServeCells';
import StatCell from './StatCell';

interface PlayerRowProps {
  player: PlayerStats;
  onInputChange: OnInputChangeFn;
  onStatChange: OnStatChangeFn;
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
      
      <StatCell playerId={player.id} field="blockPoint" value={player.blockPoint} onStatChange={onStatChange} accentClass="text-purple-400" />
    </tr>
  );
}
