'use client';

import { useState } from 'react';
import { PlayerStats } from '../app/types/types';

const initialRows: PlayerStats[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  number: '',
  name: '',
  attackKill: 0,
  attackError: 0,
  attackCont: 0,
}));

export default function Home() {
  const [players, setPlayers] = useState<PlayerStats[]>(initialRows);

  const handleInputChange = (id: number, field: 'number' | 'name', value: string) => {
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handlePlusClick = (id: number, field: 'attackKill' | 'attackError' | 'attackCont') => {
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: p[field] + 1 } : p));
  };

  return (
    <main className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Dashboard Statystyk Siatkarskich</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-slate-700 bg-slate-800 text-left">
          <thead>
            <tr className="bg-slate-700/60 text-sm border-b border-slate-600">
              <th colSpan={2} className="p-2 border border-slate-600 text-center font-extrabold tracking-wider bg-slate-800 text-slate-300 text-xs uppercase">
                ZAWODNIK
              </th>
              <th colSpan={4} className="p-2 border border-slate-600 text-center font-extrabold tracking-wider bg-orange-600/30 text-orange-400 text-xs uppercase">
                ATAK
              </th>
            </tr>
            <tr className="bg-slate-700 text-sm">
              <th className="p-3 border border-slate-600 w-16 text-center">Nr</th>
              <th className="p-3 border border-slate-600 w-64">Imię i Nazwisko zawodnika</th>
              <th className="p-3 border border-slate-600 text-center bg-emerald-950/30 text-emerald-400">Skończone (+)</th>
              <th className="p-3 border border-slate-600 text-center bg-rose-950/30 text-rose-400">Błędy (-)</th>
              <th className="p-3 border border-slate-600 text-center bg-amber-950/30 text-amber-400">Nieskończone (/)</th>
              <th className="p-3 border border-slate-600 text-center font-bold">Skuteczność</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => {
              const total = player.attackKill + player.attackError + player.attackCont;
              const pct = total > 0 ? ((player.attackKill / total) * 100).toFixed(2) : '0.00';

              return (
                <tr key={player.id} className="border-b border-slate-700 hover:bg-slate-750">
                  <td className="p-2 border border-slate-600">
                    <input
                      type="text"
                      placeholder="N"
                      value={player.number}
                      onChange={(e) => handleInputChange(player.id, 'number', e.target.value)}
                      className="w-full bg-transparent text-center focus:bg-slate-700 outline-none p-1"
                    />
                  </td>
                  
                  <td className="p-2 border border-slate-600">
                    <input
                      type="text"
                      placeholder="Wpisz zawodnika..."
                      value={player.name}
                      onChange={(e) => handleInputChange(player.id, 'name', e.target.value)}
                      className="w-full bg-transparent focus:bg-slate-700 outline-none p-1"
                    />
                  </td>

                  <td className="p-2 border border-slate-600 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <span className="w-6 text-emerald-400 font-bold">{player.attackKill}</span>
                      <button 
                        onClick={() => handlePlusClick(player.id, 'attackKill')}
                        className="bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded font-bold"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="p-2 border border-slate-600 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <span className="w-6 text-rose-400 font-bold">{player.attackError}</span>
                      <button 
                        onClick={() => handlePlusClick(player.id, 'attackError')}
                        className="bg-rose-600 hover:bg-rose-500 px-3 py-1 rounded font-bold"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="p-2 border border-slate-600 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <span className="w-6 text-amber-400 font-bold">{player.attackCont}</span>
                      <button 
                        onClick={() => handlePlusClick(player.id, 'attackCont')}
                        className="bg-amber-600 hover:bg-amber-500 px-3 py-1 rounded font-bold"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="p-2 border border-slate-600 text-center font-bold text-lg text-amber-500">
                    {pct}%
                    <span className="block text-xs text-slate-400 font-normal">Suma ataków: {total}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
