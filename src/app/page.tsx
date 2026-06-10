'use client';

import { useState } from 'react';
import { PlayerStats } from './types/types';
import StatsTable from './components/StatsTable';

const initialRows: PlayerStats[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  number: '',
  name: '',
  serveAce: 0,
  serveCont: 0,
  serveError: 0,
  attackKill: 0,
  attackError: 0,
  attackCont: 0,
}));

export default function Home() {
  const [players, setPlayers] = useState<PlayerStats[]>(initialRows);

  const handleInputChange = (id: number, field: 'number' | 'name', value: string) => {
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleStatChange = (
    id: number, 
    field: 'attackKill' | 'attackError' | 'attackCont' | 'serveAce' | 'serveCont' | 'serveError', 
    amount: 1 | -1
  ) => {
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: Math.max(0, p[field] + amount) } : p));
  };

  return (
    <main className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Dashboard Statystyk Siatkarskich</h1>
      <StatsTable
        players={players}
        onInputChange={handleInputChange}
        onStatChange={handleStatChange}
      />
    </main>
  );
}
