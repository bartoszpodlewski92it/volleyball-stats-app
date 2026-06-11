'use client';

import { useState, useEffect } from 'react';
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
  blockPoint: 0,
}));

export default function Home() {
  const [players, setPlayers] = useState<PlayerStats[]>(initialRows);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('volleyball-stats');
    if (savedData) {
      try {
        setPlayers(JSON.parse(savedData));
      } catch (e) {
        console.error('Error reading data from LocalStorage', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('volleyball-stats', JSON.stringify(players));
    }
  }, [players, isLoaded]);

  const handleInputChange = (id: number, field: 'number' | 'name', value: string) => {
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleStatChange = (
    id: number, 
    field: 'attackKill' | 'attackError' | 'attackCont' | 'serveAce' | 'serveCont' | 'serveError' | 'blockPoint', 
    amount: 1 | -1
  ) => {
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: Math.max(0, p[field] + amount) } : p));
  };

  const handleReset = () => {
    if (confirm('Czy na pewno chcesz wyczyścić wszystkie statystyki i rozpocząć nowy mecz?')) {
      setPlayers(initialRows);
    }
  };

  if (!isLoaded) {
    return <main className="p-6 bg-slate-900 min-h-screen text-white">Loading dashboard...</main>;
  }

  return (
    <main className="p-6 bg-slate-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Volleyball Statistics Dashboard</h1>
        <button 
          onClick={handleReset}
          className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded transition cursor-pointer text-sm"
        >
          Reset Match
        </button>
      </div>
      
      <StatsTable
        players={players}
        onInputChange={handleInputChange}
        onStatChange={handleStatChange}
      />
    </main>
  );
}
