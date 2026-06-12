'use client';

import { useState, useEffect } from 'react';
import { PlayerStats } from './types/types';
import StatsTable from './components/StatsTable';
import ConfirmModal from './components/ConfirmModal';

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
  digSuccess: 0,
  receptionPerfect: 0,
  receptionGood: 0,
  receptionInaccurate: 0,
  receptionError: 0,
}));

export default function Home() {
  const [players, setPlayers] = useState<PlayerStats[]>(initialRows);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('volleyball-stats');
    if (savedData) {
      try {
        setPlayers(JSON.parse(savedData));
      } catch (e) {
        console.error('Błąd odczytu danych z LocalStorage', e);
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
    field: 'attackKill' | 'attackError' | 'attackCont' | 'serveAce' | 'serveCont' | 'serveError' | 'blockPoint' | 'digSuccess' | 'receptionPerfect' | 'receptionGood' | 'receptionInaccurate' | 'receptionError', 
    amount: 1 | -1
  ) => {
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: Math.max(0, p[field] + amount) } : p));
  };

  const confirmReset = () => {
    setPlayers(initialRows);
    setIsModalOpen(false);
  };

  if (!isLoaded) {
    return <main className="p-6 bg-amber-950 min-h-screen text-white">Ładowanie dashboardu...</main>;
  }

  return (
    <main className="p-6 bg-amber-950 min-h-screen text-white relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Statystyk Siatkarskich</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded transition cursor-pointer text-sm"
        >
          Resetuj Mecz
        </button>
      </div>
      
      <StatsTable
        players={players}
        onInputChange={handleInputChange}
        onStatChange={handleStatChange}
      />

      <ConfirmModal 
        isOpen={isModalOpen}
        title="Ostrzeżenie"
        message="Czy na pewno chcesz wyczyścić wszystkie bieżące statystyki i rozpocząć nowy mecz? Tej operacji nie da się cofnąć."
        onConfirm={confirmReset}
        onCancel={() => setIsModalOpen(false)}
      />
    </main>
  );
}