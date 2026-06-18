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
  const totalPoints = player.serveAce + player.attackKill + player.blockPoint;

  return (
    <tr className="border-b border-slate-700 hover:bg-slate-750/50 transition-colors">
      <td className="p-3 border border-slate-600 w-16 text-center font-bold text-slate-300 bg-slate-900/30">
        {player.number || '—'}
      </td>

      <td className="p-3 border border-slate-600 w-80 min-w-[150px] font-semibold text-white pl-4">
        {player.name}
      </td>

      <td className="p-3 border border-slate-600 w-24 text-center font-extrabold text-lg text-emerald-400 bg-emerald-950/10">
        {totalPoints}
      </td>

      <PlayerServeCells player={player} onStatChange={onStatChange} />
      <PlayerReceptionCells player={player} onStatChange={onStatChange} />
      <PlayerAttackCells player={player} onStatChange={onStatChange} />
      <StatCell playerId={player.id} field="blockPoint" value={player.blockPoint} onStatChange={onStatChange} accentClass="text-purple-400" />
      <StatCell playerId={player.id} field="digSuccess" value={player.digSuccess} onStatChange={onStatChange} accentClass="text-emerald-400" />
    </tr>
  );
}