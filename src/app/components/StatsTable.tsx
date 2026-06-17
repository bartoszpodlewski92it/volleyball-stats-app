'use client';

import { useRef } from 'react';
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
  const fakeScrollRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const handleFakeScroll = () => {
    if (fakeScrollRef.current && tableContainerRef.current) {
      tableContainerRef.current.scrollLeft = fakeScrollRef.current.scrollLeft;
    }
  };

  const handleTableScroll = () => {
    if (fakeScrollRef.current && tableContainerRef.current) {
      fakeScrollRef.current.scrollLeft = tableContainerRef.current.scrollLeft;
    }
  };

  return (
    <div className="w-full relative pb-6">
      <div 
        ref={tableContainerRef}
        onScroll={handleTableScroll}
        className="overflow-x-auto w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <table className="w-full border-collapse border-l border-t border-slate-700 bg-slate-800 text-left min-w-[1950px] table-auto">
          <thead>
            <tr className="bg-slate-700 text-sm">
              <TableGroupHeader title="ZAWODNIK" colSpan={2} bgClass="bg-slate-800" textClass="text-slate-300" />
              <TableGroupHeader title="SERWIS" colSpan={4} bgClass="bg-sky-600/30" textClass="text-sky-400" />
              <TableGroupHeader title="PRZYJĘCIE" colSpan={8} bgClass="bg-yellow-600/30" textClass="text-yellow-400" />
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
              <SubHeader title="Perfekcyjne %" extraClass="font-bold text-emerald-400 text-xs" />
              <SubHeader title="Dobre %" extraClass="font-bold text-teal-400 text-xs" />
              <SubHeader title="Pozytywne %" extraClass="font-bold text-yellow-400 text-xs" />
              <SubHeader title="Suma" extraClass="font-bold text-sky-400 text-xs" />

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
          
          <tfoot className="bg-slate-900 font-bold border-t-2 border-slate-600 sticky bottom-0 z-10">
            <tr>
              <td colSpan={2} className="p-3 border border-slate-600 text-center uppercase tracking-wider text-sm text-slate-300">
                Suma Zespołu
              </td>
              
              {/* Serwis Sumy */}
              <td className="p-2 border border-slate-600 text-center text-emerald-400">{players.reduce((sum, p) => sum + p.serveAce, 0)}</td>
              <td className="p-2 border border-slate-600 text-center text-amber-400">{players.reduce((sum, p) => sum + p.serveCont, 0)}</td>
              <td className="p-2 border border-slate-600 text-center text-rose-400">{players.reduce((sum, p) => sum + p.serveError, 0)}</td>
              <td className="p-2 border border-slate-600 text-center text-sky-400">
                {players.reduce((sum, p) => sum + p.serveAce + p.serveCont + p.serveError, 0)}
              </td>

              {/* Przyjęcie Sumy */}
              <td className="p-2 border border-slate-600 text-center text-emerald-400">{players.reduce((sum, p) => sum + p.receptionPerfect, 0)}</td>
              <td className="p-2 border border-slate-600 text-center text-teal-400">{players.reduce((sum, p) => sum + p.receptionGood, 0)}</td>
              <td className="p-2 border border-slate-600 text-center text-amber-400">{players.reduce((sum, p) => sum + p.receptionInaccurate, 0)}</td>
              <td className="p-2 border border-slate-600 text-center text-rose-400">{players.reduce((sum, p) => sum + p.receptionError, 0)}</td>
              
              {/* Obliczenia procentowe oraz łączna Suma Przyjęcia dla Zespołu */}
              {(() => {
                const perf = players.reduce((sum, p) => sum + p.receptionPerfect, 0);
                const good = players.reduce((sum, p) => sum + p.receptionGood, 0);
                const totalRc = players.reduce((sum, p) => sum + p.receptionPerfect + p.receptionGood + p.receptionInaccurate + p.receptionError, 0);
                
                const totalPerfPct = totalRc > 0 ? ((perf / totalRc) * 100).toFixed(2) + '%' : '0.00%';
                const totalGoodPct = totalRc > 0 ? ((good / totalRc) * 100).toFixed(2) + '%' : '0.00%';
                const totalPosPct = totalRc > 0 ? (((perf + good) / totalRc) * 100).toFixed(2) + '%' : '0.00%';

                return (
                  <>
                    <td className="p-2 border border-slate-600 text-center text-emerald-500 bg-emerald-950/20">{totalPerfPct}</td>
                    <td className="p-2 border border-slate-600 text-center text-teal-500 bg-teal-950/20">{totalGoodPct}</td>
                    <td className="p-2 border border-slate-600 text-center text-yellow-500 bg-yellow-950/20">{totalPosPct}</td>
                    <td className="p-2 border border-slate-600 text-center text-sky-400 bg-sky-950/20">{totalRc}</td>
                  </>
                );
              })()}

              {/* Atak Sumy */}
              <td className="p-2 border border-slate-600 text-center text-emerald-400">{players.reduce((sum, p) => sum + p.attackKill, 0)}</td>
              <td className="p-2 border border-slate-600 text-center text-rose-400">{players.reduce((sum, p) => sum + p.attackError, 0)}</td>
              <td className="p-2 border border-slate-600 text-center text-amber-400">{players.reduce((sum, p) => sum + p.attackCont, 0)}</td>
              <td className="p-2 border border-slate-600 text-center text-orange-500 bg-orange-950/20">
                {(() => {
                  const kill = players.reduce((sum, p) => sum + p.attackKill, 0);
                  const err = players.reduce((sum, p) => sum + p.attackError, 0);
                  const cont = players.reduce((sum, p) => sum + p.attackCont, 0);
                  const totalAtk = kill + err + cont;
                  return totalAtk > 0 ? ((kill / totalAtk) * 100).toFixed(2) + '%' : '0.00%';
                })()}
              </td>

              {/* Blok i Obrona Sumy */}
              <td className="p-2 border border-slate-600 text-center text-purple-400">{players.reduce((sum, p) => sum + p.blockPoint, 0)}</td>
              <td className="p-2 border border-slate-600 text-center text-emerald-400">{players.reduce((sum, p) => sum + p.digSuccess, 0)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div 
        ref={fakeScrollRef}
        onScroll={handleFakeScroll}
        className="fixed bottom-0 left-0 w-full overflow-x-auto z-50 bg-transparent"
      >
        <div className="w-[1950px] h-[12px]"></div>
      </div>
    </div>
  );
}
