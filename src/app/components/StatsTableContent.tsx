'use client';

import { PlayerStats, OnInputChangeFn, OnStatChangeFn } from '../types/types';
import PlayerRow from './PlayerRow';
import { getTeamSum } from '../helpers/statCalculators';

interface TableGroupHeaderProps {
    title: string;
    colSpan: number;
    bgClass: string;
    textClass: string;
}

function TableGroupHeader({ title, colSpan, bgClass, textClass }: TableGroupHeaderProps) {
    return (
        <th colSpan={colSpan} className={`p-2 border border-slate-700 text-center font-extrabold tracking-wider text-xs uppercase ${bgClass} ${textClass}`}>
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

interface StatsTableContentProps {
    players: PlayerStats[];
    onInputChange: OnInputChangeFn;
    onStatChange: OnStatChangeFn;
    teamPoints: number;
    rcStats: { total: number; perfPct: string; goodPct: string; posPct: string };
    atkStats: { total: number; killPct: string; effPct: string };
}

export default function StatsTableContent({ players, onInputChange, onStatChange, teamPoints, rcStats, atkStats }: StatsTableContentProps) {
    return (
        <table className="w-full border-collapse border-l border-t border-slate-700 bg-slate-800 text-left min-w-[2100px] table-auto">
            <thead>
                <tr className="bg-slate-700 text-sm">
                    <TableGroupHeader title="ZAWODNIK" colSpan={3} bgClass="bg-slate-800" textClass="text-slate-300" />
                    <TableGroupHeader title="SERWIS" colSpan={4} bgClass="bg-sky-600/30" textClass="text-sky-400" />
                    <TableGroupHeader title="PRZYJĘCIE" colSpan={8} bgClass="bg-yellow-600/30" textClass="text-yellow-400" />
                    <TableGroupHeader title="ATAK" colSpan={4} bgClass="bg-orange-600/30" textClass="text-orange-400" />
                    <TableGroupHeader title="BLOK" colSpan={1} bgClass="bg-purple-600/30" textClass="text-purple-400" />
                    <TableGroupHeader title="DEFENSYWA" colSpan={1} bgClass="bg-emerald-600/30" textClass="text-emerald-400" />
                </tr>
                <tr className="bg-slate-700 text-sm">
                    <SubHeader title="Nr" widthClass="w-16" />
                    <SubHeader title="Imię i Nazwisko zawodnika" widthClass="w-64" />
                    <SubHeader title="PKT" widthClass="w-24" extraClass="font-extrabold text-emerald-400 bg-emerald-950/20" />

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
                    <SubHeader title="Analiza Ataku" widthClass="w-40 min-w-[160px]" extraClass="font-bold text-orange-400 bg-orange-950/5" />

                    <SubHeader title="Punktowy (+)" extraClass="bg-purple-950/20 text-purple-400" />
                    <SubHeader title="Obronione (+)" extraClass="bg-emerald-950/20 text-emerald-400" />
                </tr>
            </thead>
            <tbody>
                {players.map((player) => (
                    <PlayerRow key={player.id} player={player} onInputChange={onInputChange} onStatChange={onStatChange} />
                ))}
            </tbody>
            <tfoot className="bg-slate-900 font-bold border-t-2 border-slate-600 sticky bottom-0 z-10 text-xs">
                <tr>
                    <td colSpan={2} className="p-3 border border-slate-600 text-center uppercase tracking-wider text-sm text-slate-300">Suma Zespołu</td>
                    <td className="p-2 border border-slate-600 text-center text-lg text-emerald-400 bg-emerald-950/20">{teamPoints}</td>

                    <td className="p-2 border border-slate-600 text-center text-emerald-400">{getTeamSum(players, 'serveAce')}</td>
                    <td className="p-2 border border-slate-600 text-center text-amber-400">{getTeamSum(players, 'serveCont')}</td>
                    <td className="p-2 border border-slate-600 text-center text-rose-400">{getTeamSum(players, 'serveError')}</td>
                    <td className="p-2 border border-slate-600 text-center text-sky-400">
                        {getTeamSum(players, 'serveAce') + getTeamSum(players, 'serveCont') + getTeamSum(players, 'serveError')}
                    </td>

                    <td className="p-2 border border-slate-600 text-center text-emerald-400">{getTeamSum(players, 'receptionPerfect')}</td>
                    <td className="p-2 border border-slate-600 text-center text-teal-400">{getTeamSum(players, 'receptionGood')}</td>
                    <td className="p-2 border border-slate-600 text-center text-amber-400">{getTeamSum(players, 'receptionInaccurate')}</td>
                    <td className="p-2 border border-slate-600 text-center text-rose-400">{getTeamSum(players, 'receptionError')}</td>

                    <td className="p-2 border border-slate-600 text-center text-emerald-500 bg-emerald-950/20">{rcStats.perfPct}</td>
                    <td className="p-2 border border-slate-600 text-center text-teal-500 bg-teal-950/20">{rcStats.goodPct}</td>
                    <td className="p-2 border border-slate-600 text-center text-yellow-500 bg-yellow-950/20">{rcStats.posPct}</td>
                    <td className="p-2 border border-slate-600 text-center text-sky-400 bg-sky-950/20">{rcStats.total}</td>

                    <td className="p-2 border border-slate-600 text-center text-emerald-400">{getTeamSum(players, 'attackKill')}</td>
                    <td className="p-2 border border-slate-600 text-center text-rose-400">{getTeamSum(players, 'attackError')}</td>
                    <td className="p-2 border border-slate-600 text-center text-amber-400">{getTeamSum(players, 'attackCont')}</td>

                    <td className="p-2 border border-slate-600 text-center text-orange-500 bg-orange-950/20 min-w-[160px]">
                        <div className="flex flex-col gap-1 items-center justify-center h-full">
                            <div className="flex items-center gap-1.5">
                                <span className="text-slate-400 font-normal">Skuteczność:</span>
                                <span>{atkStats.killPct}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-slate-400 font-normal">Efektywność:</span>
                                <span className="text-amber-400">{atkStats.effPct}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                                Suma ataków: {atkStats.total}
                            </div>
                        </div>
                    </td>

                    <td className="p-2 border border-slate-600 text-center text-purple-400">{getTeamSum(players, 'blockPoint')}</td>
                    <td className="p-2 border border-slate-600 text-center text-emerald-400">{getTeamSum(players, 'digSuccess')}</td>
                </tr>
            </tfoot>
        </table>
    );
}
