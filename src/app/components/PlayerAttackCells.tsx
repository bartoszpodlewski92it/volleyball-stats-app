'use client';

import { PlayerStats, OnStatChangeFn } from './../types/types';
import StatCell from './StatCell';

interface PlayerAttackCellsProps {
  player: PlayerStats;
  onStatChange: OnStatChangeFn;
}

export default function PlayerAttackCells({ player, onStatChange }: PlayerAttackCellsProps) {
  const total = player.attackKill + player.attackError + player.attackCont;
  const killPct = total > 0 ? ((player.attackKill / total) * 100).toFixed(2) : '0.00';
  const effPct = total > 0 ? (((player.attackKill - player.attackError) / total) * 100).toFixed(2) : '0.00';

  return (
    <>
      <StatCell playerId={player.id} field="attackKill" value={player.attackKill} onStatChange={onStatChange} accentClass="text-emerald-400" />
      <StatCell playerId={player.id} field="attackError" value={player.attackError} onStatChange={onStatChange} accentClass="text-rose-400" />
      <StatCell playerId={player.id} field="attackCont" value={player.attackCont} onStatChange={onStatChange} accentClass="text-amber-400" />

      <td className="p-3 border border-slate-600 text-center font-bold min-w-[160px] bg-orange-950/10">
        <div className="flex flex-col gap-1 items-center justify-center h-full">
          <div className="flex items-center gap-2 text-xs border-b border-slate-700/50 pb-1 w-full justify-center">
            <span className="text-slate-400 font-normal">Skuteczność:</span>
            <span className="text-orange-500 font-bold text-sm">{killPct}%</span>
          </div>
          <div className="flex items-center gap-2 text-xs w-full justify-center">
            <span className="text-slate-400 font-normal">Efektywność:</span>
            <span className="text-amber-400 font-bold text-sm">{effPct}%</span>
          </div>
          <div className="text-[10px] text-slate-500 font-normal w-full text-center mt-0.5">
            Suma ataków: {total}
          </div>
        </div>
      </td>
    </>
  );
}
