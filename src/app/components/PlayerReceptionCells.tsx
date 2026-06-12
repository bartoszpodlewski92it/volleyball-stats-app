'use client';

import { PlayerStats, OnStatChangeFn } from './../types/types';
import StatCell from './StatCell';

interface PlayerReceptionCellsProps {
  player: PlayerStats;
  onStatChange: OnStatChangeFn;
}

export default function PlayerReceptionCells({ player, onStatChange }: PlayerReceptionCellsProps) {
  return (
    <>
      <StatCell playerId={player.id} field="receptionPerfect" value={player.receptionPerfect} onStatChange={onStatChange} accentClass="text-emerald-400" />
      <StatCell playerId={player.id} field="receptionGood" value={player.receptionGood} onStatChange={onStatChange} accentClass="text-teal-400" />
      <StatCell playerId={player.id} field="receptionInaccurate" value={player.receptionInaccurate} onStatChange={onStatChange} accentClass="text-amber-400" />
      <StatCell playerId={player.id} field="receptionError" value={player.receptionError} onStatChange={onStatChange} accentClass="text-rose-400" />
    </>
  );
}