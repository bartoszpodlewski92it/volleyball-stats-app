'use client';

import { PlayerStats, OnStatChangeFn } from './../types/types';
import StatCell from './StatCell';
import { calculateReceptionPercentages } from '../helpers/statCalculators';

interface PlayerReceptionCellsProps {
  player: PlayerStats;
  onStatChange: OnStatChangeFn;
}

export default function PlayerReceptionCells({ player, onStatChange }: PlayerReceptionCellsProps) {
  const { total, perfPct, goodPct, posPct } = calculateReceptionPercentages(
    player.receptionPerfect,
    player.receptionGood,
    player.receptionInaccurate,
    player.receptionError
  );

  return (
    <>
      <StatCell playerId={player.id} field="receptionPerfect" value={player.receptionPerfect} onStatChange={onStatChange} accentClass="text-emerald-400" />
      <StatCell playerId={player.id} field="receptionGood" value={player.receptionGood} onStatChange={onStatChange} accentClass="text-teal-400" />
      <StatCell playerId={player.id} field="receptionInaccurate" value={player.receptionInaccurate} onStatChange={onStatChange} accentClass="text-amber-400" />
      <StatCell playerId={player.id} field="receptionError" value={player.receptionError} onStatChange={onStatChange} accentClass="text-rose-400" />

      <td className="p-2 border border-slate-600 text-center font-bold text-sm text-emerald-500 bg-emerald-950/10">
        {perfPct}%
      </td>
      <td className="p-2 border border-slate-600 text-center font-bold text-sm text-teal-500 bg-teal-950/10">
        {goodPct}%
      </td>
      <td className="p-2 border border-slate-600 text-center font-bold text-base text-yellow-500 bg-yellow-950/10">
        {posPct}%
      </td>
      <td className="p-2 border border-slate-600 text-center font-bold text-base text-sky-400 bg-sky-950/10">
        {total}
      </td>
    </>
  );
}
