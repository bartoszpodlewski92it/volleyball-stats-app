'use client';

import { PlayerStats, OnStatChangeFn } from './../types/types';
import StatCell from './StatCell';

interface PlayerServeCellsProps {
  player: PlayerStats;
  onStatChange: OnStatChangeFn;
}

export default function PlayerServeCells({ player, onStatChange }: PlayerServeCellsProps) {
  const total = player.serveAce + player.serveCont + player.serveError;

  return (
    <>
      <StatCell playerId={player.id} field="serveAce" value={player.serveAce} onStatChange={onStatChange} accentClass="text-emerald-400" />
      <StatCell playerId={player.id} field="serveCont" value={player.serveCont} onStatChange={onStatChange} accentClass="text-amber-400" />
      <StatCell playerId={player.id} field="serveError" value={player.serveError} onStatChange={onStatChange} accentClass="text-rose-400" />
      <td className="p-2 border border-slate-600 text-center font-bold text-base text-sky-400 bg-sky-950/10">
        {total}
      </td>
    </>
  );
}
