'use client';

import { PlayerStats, OnInputChangeFn, OnStatChangeFn } from '../types/types';
import PlayerAttackCells from './PlayerAttackCells';
import PlayerServeCells from './PlayerServeCells';
import PlayerReceptionCells from './PlayerReceptionCells';
import StatCell from './StatCell';

interface PlayerRowProps {
  player: PlayerStats;
  onInputChange: OnInputChangeFn;
  onStatChange: OnStatChangeFn;
}

export default function PlayerRow({ player, onInputChange, onStatChange }: PlayerRowProps) {
  return (
    <tr className="border-b border-slate-700 hover:bg-slate-750">
      <td className="p-2 border border-slate-600 w-16">
        <input
          type="text"
          placeholder="Nr"
          value={player.number}
          onChange={(e) => onInputChange(player.id, 'number', e.target.value)}
          className="w-full bg-transparent text-center focus:bg-slate-700 outline-none p-1"
        />
      </td>
      
      <td className="p-2 border border-slate-600 w-80 min-w-[100px]">
        <input
          type="text"
          placeholder="zawodnik"
          value={player.name}
          onChange={(e) => onInputChange(player.id, 'name', e.target.value)}
          className="w-full bg-transparent text-center px-3 focus:bg-slate-700 outline-none p-1"
        />
      </td>

      <PlayerServeCells player={player} onStatChange={onStatChange} />
      <PlayerReceptionCells player={player} onStatChange={onStatChange} />
      <PlayerAttackCells player={player} onStatChange={onStatChange} />
      <StatCell playerId={player.id} field="blockPoint" value={player.blockPoint} onStatChange={onStatChange} accentClass="text-purple-400" />
      <StatCell playerId={player.id} field="digSuccess" value={player.digSuccess} onStatChange={onStatChange} accentClass="text-emerald-400" />
    </tr>
  );
}
