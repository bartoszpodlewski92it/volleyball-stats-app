'use client';

import { PlayerStats, OnStatChangeFn } from './../types/types';
import StatCell from './StatCell';

interface PlayerAttackCellsProps {
  player: PlayerStats;
  onStatChange: OnStatChangeFn;
}

export default function PlayerAttackCells({ player, onStatChange }: PlayerAttackCellsProps) {
  const total = player.attackKill + player.attackError + player.attackCont;
  const pct = total > 0 ? ((player.attackKill / total) * 100).toFixed(2) : '0.00';

  return (
    <>
      <StatCell playerId={player.id} field="attackKill" value={player.attackKill} onStatChange={onStatChange} accentClass="text-emerald-400" />
      <StatCell playerId={player.id} field="attackError" value={player.attackError} onStatChange={onStatChange} accentClass="text-rose-400" />
      <StatCell playerId={player.id} field="attackCont" value={player.attackCont} onStatChange={onStatChange} accentClass="text-amber-400" />
      <td className="p-2 border border-slate-600 text-center font-bold text-lg text-amber-500 bg-orange-950/10">
        {pct}%
        <span className="block text-xs text-slate-400 font-normal">Suma: {total}</span>
      </td>
    </>
  );
}
