'use client';

import { PlayerStats } from '../types/types';
import PlayerRow from './PlayerRow';

interface StatsTableProps {
  players: PlayerStats[];
  onInputChange: (id: number, field: 'number' | 'name', value: string) => void;
  onStatChange: (
    id: number, 
    field: keyof Pick<PlayerStats, 'attackKill' | 'attackError' | 'attackCont' | 'serveAce' | 'serveCont' | 'serveError'>, 
    amount: 1 | -1
  ) => void;
}

export default function StatsTable({ players, onInputChange, onStatChange }: StatsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-slate-700 bg-slate-800 text-left">
        <thead>
          <tr className="bg-slate-700/60 text-sm border-b border-slate-600">
            <th colSpan={2} className="p-2 border border-slate-600 text-center font-extrabold tracking-wider bg-slate-800 text-slate-300 text-xs uppercase">
              ZAWODNIK
            </th>
            <th colSpan={4} className="p-2 border border-slate-600 text-center font-extrabold tracking-wider bg-sky-600/30 text-sky-400 text-xs uppercase">
              SERWIS
            </th>
            <th colSpan={4} className="p-2 border border-slate-600 text-center font-extrabold tracking-wider bg-orange-600/30 text-orange-400 text-xs uppercase">
              ATAK
            </th>
          </tr>
          <tr className="bg-slate-700 text-sm">
            <th className="p-3 border border-slate-600 w-16 text-center">Nr</th>
            <th className="p-3 border border-slate-600 w-64">Imię i Nazwisko zawodnika</th>
            
            <th className="p-3 border border-slate-600 text-center bg-emerald-950/20 text-emerald-400">Punktowa (+)</th>
            <th className="p-3 border border-slate-600 text-center bg-amber-950/20 text-amber-400">Wprowadzona (/)</th>
            <th className="p-3 border border-slate-600 text-center bg-rose-950/20 text-rose-400">Zepsuta (-)</th>
            <th className="p-3 border border-slate-600 text-center font-bold text-sky-400">Suma</th>

            <th className="p-3 border border-slate-600 text-center bg-emerald-950/30 text-emerald-400">Skończone (+)</th>
            <th className="p-3 border border-slate-600 text-center bg-rose-950/30 text-rose-400">Błędy (-)</th>
            <th className="p-3 border border-slate-600 text-center bg-amber-950/30 text-amber-400">Nieskończone (/)</th>
            <th className="p-3 border border-slate-600 text-center font-bold text-orange-400">Skuteczność</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <PlayerRow
              key={player.id}
              player={player}
              onInputChange={onInputChange}
              onStatChange={onStatChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
