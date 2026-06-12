'use client';

import { PlayerStats, OnInputChangeFn, OnStatChangeFn } from '../types/types';
import PlayerRow from './PlayerRow';

interface TableGroupHeaderProps {
  title: string;
  colSpan: number;
  bgClass: string;
  textClass: string;
}

function TableGroupHeader({ title, colSpan, bgClass, textClass }: TableGroupHeaderProps) {
  return (
    <th 
      colSpan={colSpan} 
      className={`p-2 border border-slate-700 text-center font-extrabold tracking-wider text-xs uppercase ${bgClass} ${textClass}`}
    >
      {title}
    </th>
  );
}

interface SubHeaderProps {
  title: string;
  widthClass?: string;
  extraClass?: string;
}

function SubHeader({ title, widthClass = '', extraClass = '' }: SubHeaderProps) {
  return (
    <th className={`p-3 border border-slate-700 text-center font-bold text-sm ${widthClass} ${extraClass}`}>
      {title}
    </th>
  );
}

interface StatsTableProps {
  players: PlayerStats[];
  onInputChange: OnInputChangeFn;
  onStatChange: OnStatChangeFn;
}

export default function StatsTable({ players, onInputChange, onStatChange }: StatsTableProps) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse border-l border-t border-slate-700 bg-slate-800 text-left min-w-[1600px]">
        <thead>
          <tr className="bg-slate-700 text-sm">
            <TableGroupHeader title="ZAWODNIK" colSpan={2} bgClass="bg-slate-800" textClass="text-slate-300" />
            <TableGroupHeader title="SERWIS" colSpan={4} bgClass="bg-sky-600/30" textClass="text-sky-400" />
            <TableGroupHeader title="PRZYJĘCIE" colSpan={4} bgClass="bg-yellow-600/30" textClass="text-yellow-400" />
            <TableGroupHeader title="ATAK" colSpan={4} bgClass="bg-orange-600/30" textClass="text-orange-400" />
            <TableGroupHeader title="BLOK" colSpan={1} bgClass="bg-purple-600/30" textClass="text-purple-400" />
            <TableGroupHeader title="DEFENSYWA" colSpan={1} bgClass="bg-emerald-600/30" textClass="text-emerald-400" />
          </tr>
          <tr className="bg-slate-700 text-sm">
            <SubHeader title="Nr" widthClass="w-16" />
            <SubHeader title="Imię i Nazwisko zawodnika" widthClass="w-64" />
            
            <SubHeader title="Punktowa (+)" extraClass="bg-emerald-950/20 text-emerald-400" />
            <SubHeader title="Wprowadzona (/)" extraClass="bg-amber-950/20 text-amber-400" />
            <SubHeader title="Zepsuta (-)" extraClass="bg-rose-950/20 text-rose-400" />
            <SubHeader title="Suma" extraClass="font-bold text-sky-400" />

            <SubHeader title="Perfekcyjne" extraClass="bg-emerald-950/20 text-emerald-400 text-xs" />
            <SubHeader title="Dobre" extraClass="bg-teal-950/20 text-teal-400 text-xs" />
            <SubHeader title="Niedokładne" extraClass="bg-amber-950/20 text-amber-400 text-xs" />
            <SubHeader title="Błędne" extraClass="bg-rose-950/20 text-rose-400 text-xs" />

            <SubHeader title="Skończone (+)" extraClass="bg-emerald-950/30 text-emerald-400" />
            <SubHeader title="Błędy (-)" extraClass="bg-rose-950/30 text-rose-400" />
            <SubHeader title="Nieskończone (/)" extraClass="bg-amber-950/30 text-amber-400" />
            <SubHeader title="Skuteczność" extraClass="font-bold text-orange-400" />

            <SubHeader title="Punktowy (+)" extraClass="bg-purple-950/20 text-purple-400" />
            <SubHeader title="Obronione (+)" extraClass="bg-emerald-950/20 text-emerald-400" />
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